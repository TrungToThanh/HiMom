import React from "react";
import { useState, useEffect } from "react";
import * as SQLite from "expo-sqlite";
import dayjs from "dayjs";
import { nameDB } from "../database";

export const createShoppingMainTable = (preName) => {
  const nameTable = `${preName}tableShoppingMain`;
  const db = SQLite.openDatabase(nameDB);
  return new Promise(function (resolve) {
    db.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS ${nameTable} (id INTEGER PRIMARY KEY AUTOINCREMENT, nameItem TEXT , numberGoods TEXT, numberIsBuyGoods TEXT, note TEXT, type TEXT, money TEXT )`
      );
    });
  });
};

export const insertANewItemToShoppingMain = (preName, nameRouteUserId, nameItem) => {
  const nameTable = `${preName}tableShoppingMainUserId${nameRouteUserId}`;
  const db = SQLite.openDatabase(nameDB);
  return new Promise(function (resolve) {
    db.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS ${nameTable} (id INTEGER PRIMARY KEY AUTOINCREMENT, nameItem TEXT , numberGoods TEXT, numberIsBuyGoods TEXT, note TEXT, type TEXT, money TEXT )`
      );
      tx.executeSql(
        `INSERT INTO ${nameTable} (nameItem, numberGoods, numberIsBuyGoods, note, type, money) values (?, ?, ?, ?, ?, ?)`,
        [nameItem, "", "", "", preName, ""],
        (txObj, resultSet) => resolve(true),
        (txObj, error) => false
      );
    });
  });
};

export const getAllItemShoppingMain = (nameRouteUserId) => {
  const [db, setDb] = useState(SQLite.openDatabase(nameDB));

  const nameTable = [
    `momtableShoppingMainUserId${nameRouteUserId}`,
    `babytableShoppingMainUserId${nameRouteUserId}`,
    `othertableShoppingMainUserId${nameRouteUserId}`,
  ];

  const [listAllItemsMom, setListAllItemsMom] = useState<any>();
  const [listAllItemsBaby, setListAllItemsBaby] = useState<any>();
  const [listAllItemsOther, setListAllItemsOther] = useState<any>();

  useEffect(() => {
    db.transaction((tx) => {
      nameTable.map((table, indexTable) => {
        var items = new Array();
        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS ${table} (id INTEGER PRIMARY KEY AUTOINCREMENT, nameItem TEXT , numberGoods TEXT, numberIsBuyGoods TEXT, note TEXT, type TEXT, money TEXT )`
        );
        tx.executeSql(
          `SELECT * FROM ${table}`,
          null,
          (txObj, resultSet) => {
            const value = resultSet.rows;
            console.log("resultSet", resultSet);
            var len = resultSet.rows.length;
            for (var i = 0; i < len; i++) {
              items.push(resultSet.rows.item(i));
            }
            if (items && items.length > 0) {
              if (indexTable === 0) setListAllItemsMom(items);
              if (indexTable === 1) setListAllItemsBaby(items);
              if (indexTable === 2) setListAllItemsOther(items);
            }
          },
          (txObj, error) => false
        );
      });
    });
  }, [db]);
  return {
    listAllItemsMom,
    listAllItemsBaby,
    listAllItemsOther,
  };
};

export const deleteAItemsOfShoppingMain = (preName, id) => {
  const nameTable = `${preName}tableShoppingMain`;
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
