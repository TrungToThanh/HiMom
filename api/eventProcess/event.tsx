import React from "react";
import { useState, useEffect } from "react";
import * as SQLite from "expo-sqlite";
import dayjs from "dayjs";
import { nameDB } from "../database";

const nameTable = "tableEventProcess";

export const createProcessEventTable = () => {
  const db = SQLite.openDatabase(nameDB);
  return new Promise(function (resolve) {
    db.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS ${nameTable} (id INTEGER PRIMARY KEY AUTOINCREMENT, event TEXT , date TEXT, description TEXT, note TEXT )`
      );
    });
  });
};

export const insertANewEvent = (event, date, description, note) => {
  const db = SQLite.openDatabase(nameDB);
  return new Promise(function (resolve) {
    db.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS ${nameTable} (id INTEGER PRIMARY KEY AUTOINCREMENT, event TEXT , date TEXT, description TEXT, note TEXT )`
      );
      tx.executeSql(
        `INSERT INTO ${nameTable} (event, date, description, note) values (?, ?, ?, ?)`,
        [event, date, description, note],
        (txObj, resultSet) => resolve(true),
        (txObj, error) => false
      );
    });
  });
};

export const getAllEvent = () => {
  const [db, setDb] = useState(SQLite.openDatabase(nameDB));
  const [listEvent, setListEvent] = useState<any>();
  var items = new Array();
  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS ${nameTable} (id INTEGER PRIMARY KEY AUTOINCREMENT, event TEXT , date TEXT, description TEXT, note TEXT )`
      );
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
  }, [db]);
  return {
    listEvent,
  };
};

export const deleteAEvent = (id) => {
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
