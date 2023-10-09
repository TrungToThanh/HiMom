import _ from "lodash";
import { Alert } from "react-native";

import { fbConfig } from "../../firebase";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, push, onValue, update, remove } from "firebase/database";
import { ProfileAccountBaby } from "../../../../app/const/default-type";

export const FbAccBabyLogin = async (uniqueIdBaby, nameBaby, passwordBaby) => {
  let firebase = initializeApp(fbConfig);
  const db = getDatabase(firebase);
  const postListRef = ref(db, "babyId/" + `${uniqueIdBaby}/profile`);

  let arrayListBabyAcc: ProfileAccountBaby | any;

  return new Promise(function (resolveAll) {
    const stepOne = new Promise(function (resolve) {
      onValue(postListRef, async (snapshot) => {
        if (snapshot.exists && snapshot?.val() !== null && snapshot.toJSON()) {
          arrayListBabyAcc = snapshot.toJSON();
          resolve(true);
        } else {
          resolve(false);
          Alert.alert("Đăng nhập", "Không tồn tại tài khoản");
        }
      });
    });

    stepOne.finally(() => {
      if (arrayListBabyAcc && String(arrayListBabyAcc?.nameBaby) === String(nameBaby)) {
        resolveAll(true);
      } else {
        Alert.alert("Đăng nhập", "Vui lòng kiểm tra lại tài khoản và mã đăng nhập");
        resolveAll(undefined);
      }
    });
  });
};
