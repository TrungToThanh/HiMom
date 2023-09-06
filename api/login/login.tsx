import React from "react";
import { useState, useEffect } from "react";
import * as SQLite from "expo-sqlite";
import dayjs from "dayjs";
import { nameDB } from "../database";

const nameTable = "tableAccountBaby1";

export const createABabyTable = () => {
  const db = SQLite.openDatabase(nameDB);
  return new Promise(function (resolve) {
    db.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS ${nameTable} (id INTEGER PRIMARY KEY AUTOINCREMENT, nameBaby TEXT , expectedBirthday TEXT , birthday TEXT, password TEXT,  isBorn boolean )`
      );
    });
  });
};

export const insertValueBabyToBabyList = (
  nameBaby,
  expectedBirthday,
  birthday,
  password,
  isBorn
) => {
  const db = SQLite.openDatabase(nameDB);
  return new Promise(function (resolve) {
    db.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS ${nameTable} (id INTEGER PRIMARY KEY AUTOINCREMENT, nameBaby TEXT , expectedBirthday TEXT , birthday TEXT, password TEXT,  isBorn BOOLEAN )`
      );
      tx.executeSql(
        `INSERT INTO ${nameTable} (nameBaby, expectedBirthday, birthday, password, isBorn) values (?, ?, ?, ?, ?)`,
        [String(nameBaby), String(expectedBirthday), String(birthday), String(password), isBorn],
        (txObj, resultSet) => resolve(true),
        (txObj, error) => false
      );
    });
  });
};

export const getAllBabyInBabyList = (isReload) => {
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
          var len = resultSet.rows.length;
          for (var i = 0; i < len; i++) {
            items.push(resultSet.rows.item(i));
          }
          items && items.length > 0 && setListBaby(items);
        },
        (txObj, error) => false
      );
    });
  }, [db, isReload]);
  return {
    listAccountBaby,
  };
};

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

export const updateValueOfABabyInBabyList = (
  nameBaby,
  expectedBirthday,
  birthday,
  password,
  isBorn,
  id
) => {
  const db = SQLite.openDatabase(nameDB);
  return new Promise(function (resolve) {
    db.transaction((tx) => {
      tx.executeSql(
        `UPDATE ${nameTable} SET nameBaby = ?, expectedBirthday = ?, birthday = ?, password = ?, isBorn = ? WHERE id = ?`,
        [
          nameBaby,
          expectedBirthday,
          Boolean(isBorn) ? birthday : expectedBirthday,
          password,
          isBorn,
          Number(id),
        ],
        (txObj, resultSet) => resolve(true),
        (txObj, error) => false
      );
    });
  });
};
