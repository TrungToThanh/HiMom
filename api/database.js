import * as SQLite from "expo-sqlite";
import * as FileSystem from "expo-file-system";
import moment from "moment";
import { Toast } from "@ant-design/react-native";
import * as DocumentPicker from "expo-document-picker";
import { useState } from "react";
import { DevSettings } from "react-native";

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
