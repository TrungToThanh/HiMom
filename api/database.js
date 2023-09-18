import * as SQLite from "expo-sqlite";
import * as FileSystem from "expo-file-system";
import moment from "moment";
import { Toast } from "@ant-design/react-native";
import * as DocumentPicker from "expo-document-picker";
import { useState } from "react";
import { DevSettings } from "react-native";
import firebase, { firebaseConfig } from "./firebase/firebase";
import { getDatabase, ref, set,push,onValue, update } from "firebase/database";
import { initializeApp } from "firebase/app";

import _ from 'lodash'

export const nameDB = "newDB1.db";

export const exportDb = async () => {
  if (Platform.OS === "android") {
    const permissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
    if (permissions.granted) {
      const base64 = await FileSystem.readAsStringAsync(
        FileSystem.documentDirectory + `SQLite/${nameDB}`,
        {
          encoding: FileSystem.EncodingType.Base64,
        }
      );

      await FileSystem.StorageAccessFramework.createFileAsync(
        permissions.directoryUri,
        `${nameDB}`,
        "application/octet-stream"
      )
        .then(async (uri) => {
          await FileSystem.writeAsStringAsync(uri, base64, {
            encoding: FileSystem.EncodingType.Base64,
          });
          Toast.success("Đã xuất database thành công!");
        })
        .catch((e) => Toast.fail("Lỗi! Không thể xuất database."));
    } else {
      console.log("Permission not granted");
    }
  } else {
    await Sharing.shareAsync(FileSystem.documentDirectory + `SQLite/${nameDB}`);
  }
};

export const importDb = async () => {
  const db = SQLite.openDatabase(nameDB);
  let result = await DocumentPicker.getDocumentAsync({
    copyToCacheDirectory: true,
  });

  if (!(await FileSystem.getInfoAsync(FileSystem.documentDirectory + "SQLite")).exists) {
    await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + "SQLite");
  }

  const base64 = await FileSystem.readAsStringAsync(result.assets?.at(0)?.uri, {
    encoding: FileSystem.EncodingType.Base64,
  });

  await FileSystem.writeAsStringAsync(FileSystem.documentDirectory + `SQLite/${nameDB}`, base64, {
    encoding: FileSystem.EncodingType.Base64,
  });
  await db.closeAsync();
  // setDb(SQLite.openDatabase(`${nameDB}`));
  Toast.success("Thành công!");
  DevSettings.reload();
};

export const ResetDB = () => {
  const db = SQLite.openDatabase(nameDB);
  db.closeAsync();
  db.deleteAsync();
  return new Promise(function (resolve) {
    resolve(true);
  });
};

export const UploadDatabase = async (uniqueId,uniqueNumberDatabase) => {
  if (Platform.OS === "android") {
    const infoDatabase = await FileSystem?.getInfoAsync(
      FileSystem.documentDirectory + `SQLite/${nameDB}`
    );

    if (infoDatabase.exists && !infoDatabase.isDirectory) {
      const { uri } = await FileSystem?.getInfoAsync(
        FileSystem.documentDirectory + `SQLite/${nameDB}`
      );

      const blob = await new Promise((resovle, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = () => {
          resovle(xhr.response);
        };
        xhr.onerror = (e) => {
          console.log(e);
        };
        xhr.responseType = "blob";
        xhr.open("GET", uri, true);
        xhr.send(null);
      });
      const isRes = firebase.firebase?.storage()?.ref()?.child(`HiMom/database/${uniqueId}/${uniqueNumberDatabase}/${nameDB}`);
      isRes?.put(blob);
    } else {
      console.log("Permission not granted");
      // FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync(
      //   FileSystem.documentDirectory + `SQLite/${nameDB}`
      // );
    }
  }
};

export const LoginDatabase = async (uniqueId) => {
  const fbConfig = {
    apiKey: "AIzaSyDZRS7NAaqKNYQxuFHAPzl0bjtNF1vjNJs",
    authDomain: "himom-4abb5.firebaseapp.com",
    projectId: "himom-4abb5",
    storageBucket: "himom-4abb5.appspot.com",
    messagingSenderId: "718883397267",
    appId: "1:718883397267:web:eeff2d30ad255e683a7766",
    measurementId: "G-ESX60GJSTE",
    databaseURL: "https://himom-4abb5-default-rtdb.asia-southeast1.firebasedatabase.app",
  };
  
  let firebase = initializeApp(fbConfig);
  if(uniqueId){
    const db = getDatabase(firebase)
    const postListRef = ref(db, 'userId');
    let isHasAcc = false
    let uniqueNumberDatabase

    onValue(postListRef, async(snapshot) => {
      if(snapshot?.val() !== null){
        snapshot?.forEach((childSnapshot) => {
          if(isHasAcc) return;
          console.log(childSnapshot, childSnapshot.toJSON().deviceId,String( childSnapshot.toJSON()?.deviceId) === String(uniqueId),uniqueId  )
          if(String(childSnapshot?.toJSON()?.deviceId) === String(uniqueId) ){
          isHasAcc = true
          uniqueNumberDatabase = childSnapshot?.toJSON()?.uniqueNumberDatabase
          UploadDatabase(uniqueId,uniqueNumberDatabase)
         }
         });
      }else{
        const newPostRef = push(postListRef);
        uniqueNumberDatabase = _.uniqueId()
        set(newPostRef, {deviceId:uniqueId, uniqueNumberDatabase: uniqueNumberDatabase })
        UploadDatabase(uniqueId,uniqueNumberDatabase)
      }
    }, {
      onlyOnce: true
    });
  }
}
