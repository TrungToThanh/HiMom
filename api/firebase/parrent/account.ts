import * as SQLite from "expo-sqlite";
import * as FileSystem from "expo-file-system";
import moment from "moment";
import { Toast } from "@ant-design/react-native";
import * as DocumentPicker from "expo-document-picker";
import { useState } from "react";
import { Alert, DevSettings } from "react-native";
import { getDatabase, ref, set, push, onValue, update, remove } from "firebase/database";
import { initializeApp } from "firebase/app";

import _ from "lodash";
export const fbConfig = {
  apiKey: "AIzaSyDZRS7NAaqKNYQxuFHAPzl0bjtNF1vjNJs",
  authDomain: "himom-4abb5.firebaseapp.com",
  projectId: "himom-4abb5",
  storageBucket: "himom-4abb5.appspot.com",
  messagingSenderId: "718883397267",
  appId: "1:718883397267:web:eeff2d30ad255e683a7766",
  measurementId: "G-ESX60GJSTE",
  databaseURL: "https://himom-4abb5-default-rtdb.asia-southeast1.firebasedatabase.app",
};

export const FbAccParentCreate = async (name, password) => {
  let firebase = initializeApp(fbConfig);
  const db = getDatabase(firebase);
  const postListRef = ref(db, "parentId");
  const newPostRef = push(postListRef);
  let isHasAcc = false;
  await onValue(postListRef, async (snapshot) => {
    if (isHasAcc) return true;
    if (snapshot.exists || snapshot?.val() !== null) {
      snapshot.forEach((acc: any) => {
        if (isHasAcc) return true;
        if (String(acc.toJSON()?.name) === String(name)) {
          isHasAcc = true;
          Alert.alert(
            "Đăng ký tài khoản",
            "Tài khoản này đã tồn tại, vui lòng tạo tài khoản khác!"
          );
          return true;
        }
      });
    }
  });
  if (!isHasAcc) {
    set(newPostRef, { uniqueId: newPostRef.key.toString(), name: name, password: password });
    Alert.alert("Đăng ký tài khoản", "Tạo thành công!");
  }
  return isHasAcc;
};

export const FbAccParentLogin = async (name, password) => {
  let firebase = initializeApp(fbConfig);
  const db = getDatabase(firebase);
  const postListRef = ref(db, "parentId");
  let isHasAcc = false;
  await onValue(postListRef, async (snapshot) => {
    if (isHasAcc) return true;
    if (snapshot.exists || snapshot?.val() !== null) {
      snapshot.forEach((acc: any) => {
        if (isHasAcc) return true;
        if (String(acc?.toJSON()?.name) === String(name) && acc?.toJSON().password === password) {
          isHasAcc = true;
        }
      });
    }
    // update(newPostRef,{})
    // remove(postListRef)
    // remove(newPostRef)
    // set(newPostRef, {deviceId:'uniqueId', uniqueNumberDatabase: 'uniqueNumberDatabase', process:JSON.stringify(listAccountBaby) })
  });
  return isHasAcc;
};

export const LoginDatabase = async (uniqueId, listAccountBaby) => {
  console.log("1", uniqueId, listAccountBaby);

  let firebase = initializeApp(fbConfig);
  if (uniqueId) {
    const db = getDatabase(firebase);
    const postListRef = ref(db, "userId");
    const newPostRef = push(postListRef);
    //  remove(postListRef)
    // set(newPostRef, {deviceId:'uniqueId', uniqueNumberDatabase: 'uniqueNumberDatabase', process:listAccountBaby })
    update(postListRef, {
      deviceId: "uniqueId4",
      uniqueNumberDatabase: "uniqueNumberDatabase",
      process: {},
    });
    let isHasAcc = false;
    let uniqueNumberDatabase;
    onValue(postListRef, async (snapshot) => {
      console.log("2");
      // update(newPostRef,{})
      // remove(postListRef)
      // remove(newPostRef)
      // set(newPostRef, {deviceId:'uniqueId', uniqueNumberDatabase: 'uniqueNumberDatabase', process:JSON.stringify(listAccountBaby) })
    });
  }
};
