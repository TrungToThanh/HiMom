import { useState, useEffect } from "react";
import * as SQLite from "expo-sqlite";
import { nameDB } from "../database";

const preNameTable = "tableReminderToDoUserId";

export const createReminderTable = (isUserId) => {
  const nameTable = `${preNameTable}${isUserId}`;

  const db = SQLite.openDatabase(nameDB);

  db.transaction((tx) => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS ${nameTable} (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, type TEXT , done BOOLEAN)`
    );
  });
};

export const insertANewReminder = (isUserId, name, type, done) => {
  const nameTable = `${preNameTable}${isUserId}`;
  const db = SQLite.openDatabase(nameDB);
  return new Promise(function (resolve) {
    db.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS ${nameTable} (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, type TEXT , done BOOLEAN)`
      );
      tx.executeSql(
        `INSERT INTO ${nameTable} (name, type, done) values (?, ?, ?)`,
        [name, type, done],
        (txObj, resultSet) => resolve(true),
        (txObj, error) => false
      );
    });
  });
};

export const updateEventReminder = (isUserId, done, id) => {
  const nameTable = `${preNameTable}${isUserId}`;
  const db = SQLite.openDatabase(nameDB);
  return new Promise(function (resolve) {
    db.transaction((tx) => {
      tx.executeSql(
        `UPDATE ${nameTable} SET done = ? WHERE id = ?`,
        [Boolean(done), id],
        (txObj, resultSet) => resolve(true),
        (txObj, error) => false
      );
    });
  });
};

export const getAllEventReminder = (nameRouteUserId, isLoading) => {
  const nameTable = `${preNameTable}${nameRouteUserId}`;
  const [db, setDb] = useState(SQLite.openDatabase(nameDB));
  const [listReminderTodo, setListEvent] = useState<any>();

  useEffect(() => {
    var items = new Array();
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
          setListEvent(items);
        },
        (txObj, error) => false
      );
    });
  }, [db, isLoading]);

  return {
    listReminderTodo,
  };
};

export const deleteAReminder = (isUserId, id) => {
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
