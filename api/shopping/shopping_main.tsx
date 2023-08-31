import React from "react";
import { useState, useEffect } from "react";
import * as SQLite from "expo-sqlite";
import dayjs from "dayjs";
import { nameDB } from "../database";
import { TableItemList } from "../../app/const/type";

export const createShoppingMainTable = (preName, nameRouteUserId) => {
  const nameTable = `${preName}TableShoppingMainUserId${nameRouteUserId}`;
  const db = SQLite.openDatabase(nameDB);
  return new Promise(function (resolve) {
    db.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS ${nameTable} (id INTEGER PRIMARY KEY AUTOINCREMENT, nameItem TEXT , numberGoods TEXT, numberIsBuyGoods TEXT, note TEXT, type TEXT, moneyGoods TEXT, moneyBuyGoods TEXT )`
      );
    });
  });
};

export const insertANewItemToShoppingMain = (preName, nameRouteUserId, nameItem) => {
  const nameTable = `${preName}TableShoppingMainUserId${nameRouteUserId}`;
  const db = SQLite.openDatabase(nameDB);
  return new Promise(function (resolve) {
    db.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS ${nameTable} (id INTEGER PRIMARY KEY AUTOINCREMENT, nameItem TEXT , numberGoods TEXT, numberIsBuyGoods TEXT, note TEXT, type TEXT, moneyGoods TEXT, moneyBuyGoods TEXT )`
      );
      tx.executeSql(
        `INSERT INTO ${nameTable} (nameItem, numberGoods, numberIsBuyGoods, note, type, moneyGoods, moneyBuyGoods) values (?, ?, ?, ?, ?, ?, ?)`,
        [nameItem, "", "", "", preName, "", ""],
        (txObj, resultSet) => resolve(true),
        (txObj, error) => false
      );
    });
  });
};

export const getAllItemShoppingMain = (nameRouteUserId, isReload) => {
  const [db, setDb] = useState(SQLite.openDatabase(nameDB));

  const nameTable = [
    `momTableShoppingMainUserId${nameRouteUserId}`,
    `babyTableShoppingMainUserId${nameRouteUserId}`,
    `otherTableShoppingMainUserId${nameRouteUserId}`,
  ];

  const [listAllItemsMom, setListAllItemsMom] = useState<any>();
  const [listAllItemsBaby, setListAllItemsBaby] = useState<any>();
  const [listAllItemsOther, setListAllItemsOther] = useState<any>();

  useEffect(() => {
    db.transaction((tx) => {
      nameTable.map((table, indexTable) => {
        var items = new Array();
        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS ${table} (id INTEGER PRIMARY KEY AUTOINCREMENT, nameItem TEXT , numberGoods TEXT, numberIsBuyGoods TEXT, note TEXT, type TEXT, moneyGoods TEXT, moneyBuyGoods TEXT )`
        );
        tx.executeSql(
          `SELECT * FROM ${table}`,
          null,
          (txObj, resultSet) => {
            const value = resultSet.rows;
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
  }, [db, isReload]);
  return {
    listAllItemsMom,
    listAllItemsBaby,
    listAllItemsOther,
  };
};

export const deleteAItemsOfShoppingMain = (preName, id, nameRouteUserId) => {
  const nameTable = `${preName}TableShoppingMainUserId${nameRouteUserId}`;
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

export const updateNameOfAItemsOfShoppingMain = (preName, id, nameRouteUserId, nameItem) => {
  const nameTable = `${preName}TableShoppingMainUserId${nameRouteUserId}`;
  const db = SQLite.openDatabase(nameDB);
  return new Promise(function (resolve) {
    db.transaction((tx) => {
      tx.executeSql(
        `UPDATE ${nameTable} SET nameItem = ? WHERE id = ?`,
        [nameItem, Number(id)],
        (txObj, resultSet) => resolve(true),
        (txObj, error) => false
      );
    });
  });
};

export const updateGoodOfAItemsOfShoppingMain = (
  nameRouteTypeTable,
  id,
  nameRouteUserId,
  numberGoods,
  numberIsBuyGoods,
  moneyGoods,
  moneyBuyGoods
) => {
  const preName =
    nameRouteTypeTable === TableItemList.mom
      ? "mom"
      : nameRouteTypeTable === TableItemList.baby
      ? "baby"
      : "other";

  const nameTable = `${preName}TableShoppingMainUserId${nameRouteUserId}`;
  const db = SQLite.openDatabase(nameDB);
  return new Promise(function (resolve) {
    db.transaction((tx) => {
      tx.executeSql(
        `UPDATE ${nameTable} SET numberGoods = ?, numberIsBuyGoods = ?, moneyGoods = ?, moneyBuyGoods = ?  WHERE id = ?`,
        [numberGoods, numberIsBuyGoods, moneyGoods, moneyBuyGoods, Number(id)],
        (txObj, resultSet) => resolve(true),
        (txObj, error) => false
      );
    });
  });
};
