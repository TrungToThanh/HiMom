import { useState, useEffect } from "react";
import * as SQLite from "expo-sqlite";
import { nameDB } from "../database";

const preNameTable = "tableEventProcessLineUserId";

export const createProcessLineTable = (isUserId, firstDate, birthday) => {
  const nameTable = `${preNameTable}${isUserId}`;

  const db = SQLite.openDatabase(nameDB);

  db.transaction((tx) => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS ${nameTable} (id INTEGER PRIMARY KEY AUTOINCREMENT, eventFirst TEXT, dateFirst TEXT , eventSecond TEXT, dateSecond TEXT, eventThree TEXT, dateThree TEXT )`
    );
    tx.executeSql(
      `SELECT * FROM ${nameTable}`,
      null,
      (txObj, resultSet) => {
        const value = resultSet.rows;
        if (value.length === 0) {
          tx.executeSql(
            `INSERT INTO ${nameTable} (eventFirst, dateFirst, eventSecond, dateSecond, eventThree, dateThree) values (?, ?, ?, ?, ?, ?)`,
            ["Khởi đầu", firstDate, "Cùng nhau", "", "Dự kiến sinh", birthday]
          );
        }
      },
      (txObj, error) => false
    );
  });
};

export const updateEventProcessLine = (
  isUserId,
  eventFirst,
  dateFirst,
  eventSecond,
  dateSecond,
  eventThree,
  dateThree
) => {
  const nameTable = `${preNameTable}${isUserId}`;
  const db = SQLite.openDatabase(nameDB);
  return new Promise(function (resolve) {
    db.transaction((tx) => {
      tx.executeSql(
        `UPDATE ${nameTable} SET eventFirst = ?, dateFirst = ?, eventSecond = ?, dateSecond = ?, eventThree = ?, dateThree = ?  WHERE id = ?`,
        [eventFirst, String(dateFirst), eventSecond, dateSecond, eventThree, String(dateThree), 1],
        (txObj, resultSet) => resolve(true),
        (txObj, error) => false
      );
    });
  });
};

export const getAllEventProcessLine = (nameRouteUserId, isLoading) => {
  const nameTable = `${preNameTable}${nameRouteUserId}`;
  const [db, setDb] = useState(SQLite.openDatabase(nameDB));
  const [listEventProcessLine, setListEvent] = useState<any>();
  var items = new Array();

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM ${nameTable}`,
        null,
        (txObj, resultSet) => {
          const value = resultSet.rows;
          var len = resultSet.rows.length;
          for (var i = 0; i < len; i++) {
            items.push(resultSet.rows.item(i));
          }
          items && items.length > 0 && setListEvent(items);
        },
        (txObj, error) => false
      );
    });
  }, [db, isLoading]);

  return {
    listEventProcessLine,
  };
};
