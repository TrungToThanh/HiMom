import React from "react";
import { useState, useEffect } from "react";
import * as SQLite from "expo-sqlite";
import dayjs from "dayjs";
import { nameDB } from "../database";
import { TableItemList } from "../../app/const/type";

export const insertANewItemToShoppingDetail = (
  nameRouteTypeTable,
  nameRouteUserId,
  nameRouteItemId,
  nameItem,
  isDescriptionItem,
  isBuy,
  isMoney,
  isNote
) => {
  const preName =
    nameRouteTypeTable === TableItemList.mom
      ? "mom"
      : nameRouteTypeTable === TableItemList.baby
      ? "baby"
      : "other";
  const nameTable = `${preName}tableShoppingDetailUserId${nameRouteUserId}itemId${nameRouteItemId}`;

  const db = SQLite.openDatabase(nameDB);
  return new Promise(function (resolve) {
    db.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS ${nameTable} (id INTEGER PRIMARY KEY AUTOINCREMENT, nameItem TEXT , description TEXT, buy TEXT, money TEXT, note TEXT, picture TEXT )`
      );
      tx.executeSql(
        `INSERT INTO ${nameTable} (nameItem, description, buy, money, note, picture) values (?, ?, ?, ?, ?, ?)`,
        [nameItem, isDescriptionItem, isBuy, isMoney, isNote, ""],
        (txObj, resultSet) => resolve(true),
        (txObj, error) => false
      );
    });
  });
};

export const getAllItemShoppingDetail = (nameRouteTypeTable, nameRouteUserId, nameRouteItemId) => {
  const [db, setDb] = useState(SQLite.openDatabase(nameDB));

  const preName =
    nameRouteTypeTable === TableItemList.mom
      ? "mom"
      : nameRouteTypeTable === TableItemList.baby
      ? "baby"
      : "other";
  const nameTable = `${preName}tableShoppingDetailUserId${nameRouteUserId}itemId${nameRouteItemId}`;

  const [listAllItems, setListAllItems] = useState<any>();

  useEffect(() => {
    db.transaction((tx) => {
      var items = new Array();
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS ${nameTable} (id INTEGER PRIMARY KEY AUTOINCREMENT, nameItem TEXT , description TEXT, buy TEXT, money TEXT, note TEXT, picture TEXT )`
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
          if (items && items.length > 0) {
            setListAllItems(items);
          }
        },
        (txObj, error) => false
      );
    });
  }, [db]);
  return {
    listAllItems,
  };
};

export const deleteAItemsOfShoppingDetail = (
  nameRouteTypeTable,
  nameRouteUserId,
  nameRouteItemId,
  id
) => {
  const preName =
    nameRouteTypeTable === TableItemList.mom
      ? "mom"
      : nameRouteTypeTable === TableItemList.baby
      ? "baby"
      : "other";
  const nameTable = `${preName}tableShoppingDetailUserId${nameRouteUserId}itemId${nameRouteItemId}`;
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

export const getAItemShoppingDetail = (
  nameRouteTypeTable,
  nameRouteUserId,
  nameRouteItemId,
  id
) => {
  const [db, setDb] = useState(SQLite.openDatabase(nameDB));

  const preName =
    nameRouteTypeTable === TableItemList.mom
      ? "mom"
      : nameRouteTypeTable === TableItemList.baby
      ? "baby"
      : "other";
  const nameTable = `${preName}tableShoppingDetailUserId${nameRouteUserId}itemId${nameRouteItemId}`;

  const [listAItems, setListAllItems] = useState<any>();

  useEffect(() => {
    db.transaction((tx) => {
      var items = new Array();
      tx.executeSql(
        `SELECT * FROM ${nameTable} WHERE id = ?`,
        [Number(id)],
        (txObj, resultSet) => {
          const value = resultSet.rows;
          var len = resultSet.rows.length;
          for (var i = 0; i < len; i++) {
            items.push(resultSet.rows.item(i));
          }
          if (items && items.length > 0) {
            setListAllItems(items);
          }
        },
        (txObj, error) => false
      );
    });
  }, [db]);
  return {
    listAItems,
  };
};

export const updateAItemsOfShoppingDetail = (
  nameRouteTypeTable,
  nameRouteUserId,
  nameRouteItemId,
  nameItem,
  isDescriptionItem,
  isBuy,
  isMoney,
  isNote,
  id
) => {
  const preName =
    nameRouteTypeTable === TableItemList.mom
      ? "mom"
      : nameRouteTypeTable === TableItemList.baby
      ? "baby"
      : "other";
  const nameTable = `${preName}tableShoppingDetailUserId${nameRouteUserId}itemId${nameRouteItemId}`;

  const db = SQLite.openDatabase(nameDB);

  return new Promise(function (resolve) {
    db.transaction((tx) => {
      tx.executeSql(
        `UPDATE ${nameTable} SET nameItem = ?, description = ?, buy = ?, money =?, note = ?, picture = ? WHERE id = ?`,
        [nameItem, isDescriptionItem, isBuy, isMoney, isNote, "", id],
        (txObj, resultSet) => resolve(true),
        (txObj, error) => false
      );
    });
  });
};
