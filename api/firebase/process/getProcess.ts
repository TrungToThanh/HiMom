import _ from "lodash";
import { Alert } from "react-native";

import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, push, onValue, update, remove } from "firebase/database";
import { ProfileAccountBaby } from "../../../app/const/default-type";
import { fbConfig } from "../firebase";

export const FbAccBabyGetProcess = async (uniqueIdBaby) => {
  let firebase = initializeApp(fbConfig);
  const db = getDatabase(firebase);
  const postListRef = ref(db, "babyId/" + `${uniqueIdBaby}/processLife/details`);

  let listProcessBaby;

  return new Promise(function (resolveAll) {
    const stepOne = new Promise(function (resolve) {
      onValue(postListRef, async (snapshot) => {
        if (snapshot.exists && snapshot?.val() !== null && snapshot.toJSON()) {
          listProcessBaby = Object.values(snapshot.toJSON());
          resolve(true);
        } else {
          resolve(false);
          Alert.alert("Đăng nhập", "Không tồn tại tài khoản");
        }
      });
    });

    stepOne.finally(() => {
      if (listProcessBaby && listProcessBaby?.length > 0) {
        resolveAll(listProcessBaby);
      } else {
        resolveAll(undefined);
      }
    });
  });
};
