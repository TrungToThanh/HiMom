import React from "react";
import { useState, useEffect } from "react";
import * as SQLite from "expo-sqlite";
import dayjs from "dayjs";
import { nameDB } from "../database";

const preNameTable = "tableEventProcessUserId";

export const createProcessEventTable = (isUserId, date) => {
  const nameTable = `${preNameTable}${isUserId}`;
  console.log("nameTable", nameTable);
  const db = SQLite.openDatabase(nameDB);

  db.transaction((tx) => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS ${nameTable} (id INTEGER PRIMARY KEY AUTOINCREMENT, event TEXT, date TEXT , description TEXT, note TEXT, image TEXT, linkvideo TEXT )`
    );
    tx.executeSql(
      `SELECT * FROM ${nameTable}`,
      null,
      (txObj, resultSet) => {
        const value = resultSet.rows;
        if (value.length === 0) {
          tx.executeSql(
            `INSERT INTO ${nameTable} (event, date, description, note, image, linkvideo) values (?, ?, ?, ?, ?, ?)`,
            ["Nhịp đập đầu tiên!", String(date), "", "", "", ""]
          );
        } else {
          tx.executeSql(`UPDATE ${nameTable} SET date = ? WHERE id = ?`, [String(date), 1]);
        }
      },
      (txObj, error) => false
    );
  });
};

export const insertANewEvent = (isUserId, event, date, description, note, image, linkvideo) => {
  const nameTable = `${preNameTable}${isUserId}`;
  const listImage = image && image?.length > 0 ? JSON.stringify(image) : "";
  const db = SQLite.openDatabase(nameDB);
  return new Promise(function (resolve) {
    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO ${nameTable} (event, date, description, note, image, linkvideo) values (?, ?, ?, ?, ?, ?)`,
        [event, date, description, note, listImage, String(linkvideo)],
        (txObj, resultSet) => resolve(true),
        (txObj, error) => false
      );
    });
  });
};

interface Props {
  isLoading: boolean;
  nameRouteUserId: number;
}
export const getAllEvent = ({ nameRouteUserId, isLoading }: Props) => {
  const nameTable = `${preNameTable}${nameRouteUserId}`;
  const [db, setDb] = useState(SQLite.openDatabase(nameDB));
  const [listEvent, setListEvent] = useState<any>();
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
    listEvent,
  };
};

export const deleteAEvent = (isUserId, id) => {
  const nameTable = `${preNameTable}${isUserId}`;
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
