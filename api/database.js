import * as SQLite from "expo-sqlite";

export const nameDB = "test111.db";

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
        })
        .catch((e) => console.log(e));
    } else {
      console.log("Permission not granted");
    }
  } else {
    await Sharing.shareAsync(FileSystem.documentDirectory + `SQLite/${nameDB}`);
  }
};

export const importDb = async () => {
  let result = await DocumentPicker.getDocumentAsync({
    copyToCacheDirectory: true,
  });

  if (result.type === "success") {
    if (!(await FileSystem.getInfoAsync(FileSystem.documentDirectory + "SQLite")).exists) {
      await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + "SQLite");
    }

    const base64 = await FileSystem.readAsStringAsync(result.uri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    await FileSystem.writeAsStringAsync(FileSystem.documentDirectory + `SQLite/${nameDB}`, base64, {
      encoding: FileSystem.EncodingType.Base64,
    });
    await db.closeAsync();
    setDb(SQLite.openDatabase(`${nameDB}`));
  }
};

export const ResetDB = () => {
  const db = SQLite.openDatabase(nameDB);
  db.closeAsync();
  db.deleteAsync();
  return new Promise(function (resolve) {
    resolve(true);
  });
};
