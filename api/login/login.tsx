import React from "react";
import { useState, useEffect } from "react";
import * as SQLite from "expo-sqlite";
import dayjs from "dayjs";
import { nameDB } from "../database";

const nameTable = "tableAccountBaby";

export const createABabyTable = () => {
  const db = SQLite.openDatabase(nameDB);
  return new Promise(function (resolve) {
    db.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS ${nameTable} (id INTEGER PRIMARY KEY AUTOINCREMENT, nameBaby TEXT , birthday TEXT, password TEXT )`
      );
    });
  });
};

export const insertValueBabyToBabyList = (nameBaby, birthday, password) => {
  console.log(nameBaby, birthday, password);
  const db = SQLite.openDatabase(nameDB);
  return new Promise(function (resolve) {
    db.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS ${nameTable} (id INTEGER PRIMARY KEY AUTOINCREMENT, nameBaby TEXT , birthday TEXT, password TEXT )`
      );
      tx.executeSql(
        `INSERT INTO ${nameTable} (nameBaby, birthday, password) values (?, ?, ?)`,
        [nameBaby, birthday, password],
        (txObj, resultSet) => resolve(true),
        (txObj, error) => false
      );
    });
  });
};

export const getAllBabyInBabyList = () => {
  const [db, setDb] = useState(SQLite.openDatabase(nameDB));
  const [listAccountBaby, setListBaby] = useState<any>();
  var items = new Array();
  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM ${nameTable}`,
        null,
        (txObj, resultSet) => {
          const value = resultSet.rows;
          console.log("resultSet", resultSet);
          var len = resultSet.rows.length;
          for (var i = 0; i < len; i++) {
            items.push(resultSet.rows.item(i));
          }
          items && items.length > 0 && setListBaby(items);
        },
        (txObj, error) => false
      );
    });
  }, [db]);
  return {
    listAccountBaby,
  };
};

// export const getProfileAllowItemId = (itemId) => {
//   const now = new Date();
//   const [db, setDb] = useState(SQLite.openDatabase(nameDB));
//   const [isLoading, setIsLoading] = useState(true);
//   const [isShowInfo, setIsShowInfo] = useState(true);
//   const [infoBaby, setInfoBaby] = useState();
//   const [percent, setPercent] = useState(0);
//   const [diffDay, setDiffDay] = useState(0);
//   const [expectBirthday, setExpectBirthday] = useState();
//   const [nameBaby, setNameBaby] = useState();
//   const [expectBirthdayNoFormat, setExpectBirthdayNoFormat] = useState();
//   const [password, setPassword] = useState();

//   useEffect(() => {
//     db.transaction((tx) => {
//       tx.executeSql(
//         `SELECT * FROM  ${nameTable}`,
//         null,
//         (txObj, resultSet) => {
//           if (resultSet.rows.length > 0) {
//             const listBaby = Array.from(resultSet.rows);
//             const babyNeedToGet = listBaby?.find((item) => Number(item.id) === Number(itemId));
//             if (babyNeedToGet) {
//               setIsShowInfo(false);
//               const expectDay = dayjs(babyNeedToGet?.birthday).format("MM/DD/YYYY");
//               setExpectBirthday(dayjs(babyNeedToGet?.birthday).format("DD-MM-YYYY"));
//               setExpectBirthdayNoFormat(babyNeedToGet?.birthday);
//               setNameBaby(babyNeedToGet?.nameBaby);
//               setPassword(babyNeedToGet?.password);
//               const dateNow = dayjs(now)?.format("MM/DD/YYYY");
//               const diffDay = dayjs(expectDay)?.diff(dayjs(dateNow), "days");
//               const infoBabyDetails = [
//                 {
//                   label: "Tên của bé:",
//                   value: babyNeedToGet?.nameBaby || "",
//                   bold: true,
//                 },
//                 {
//                   label: "Ngày sinh (dự kiến):",
//                   value: dayjs(babyNeedToGet?.birthday).format("DD-MM-YYYY") || "",
//                 },
//               ];
//               setInfoBaby(infoBabyDetails);
//               setPercent(
//                 Math.round(((280 - diffDay) * 100) / 280) < 100
//                   ? Math.round(((280 - diffDay) * 100) / 280)
//                   : 100
//               );
//               setDiffDay(diffDay);
//             }
//           }
//         },
//         (txObj, error) => {}
//       );
//     });
//     setIsLoading(false);
//   }, [db]);
//   return {
//     isLoading,
//     isShowInfo,
//     infoBaby,
//     percent,
//     diffDay,
//     expectBirthday,
//     nameBaby,
//     expectBirthdayNoFormat,
//     password,
//   };
// };

export const deleteAItemBabyFromBabyList = (id) => {
  const db = SQLite.openDatabase(nameDB);
  return new Promise(function (resolve) {
    db.transaction((tx) => {
      tx.executeSql(
        `DELETE FROM ${nameTable} WHERE id = ?`,
        [Number(id)],
        (txObj, resultSet) => resolve(true),
        (txObj, error) => false
      );
    });
  });
};

export const updateValueOfABabyInBabyList = (nameBaby, birthday, password, id) => {
  const db = SQLite.openDatabase(nameDB);
  return new Promise(function (resolve) {
    db.transaction((tx) => {
      tx.executeSql(
        `UPDATE ${nameTable} SET nameBaby = ?, birthday = ?, password = ? WHERE id = ?`,
        [nameBaby, birthday, password, Number(id)],
        (txObj, resultSet) => resolve(true),
        (txObj, error) => false
      );
    });
  });
};
