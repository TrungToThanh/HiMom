import _ from "lodash";
import { Alert } from "react-native";

import { fbConfig } from "../../firebase";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, push, onValue, update, remove } from "firebase/database";

export const FbAccBabyLogin = async (nameBaby, passwordBaby) => {
  let firebase = initializeApp(fbConfig);
  const db = getDatabase(firebase);
  const postListRef = ref(db, "babyId");

  let arrayListBabyAcc;

  return new Promise(function (resolveAll) {
    const stepOne = new Promise(function (resolve) {
      onValue(postListRef, async (snapshot) => {
        if (snapshot.exists && snapshot?.val() !== null && snapshot.toJSON()) {
          arrayListBabyAcc = Object.values(snapshot.toJSON());
          resolve(true);
        } else {
          resolve(false);
          Alert.alert("Đăng nhập", "Không tồn tại tài khoản");
        }
      });
    });

    stepOne.finally(() => {
      if (arrayListBabyAcc && arrayListBabyAcc.length > 0) {
        const isHasAcc = arrayListBabyAcc?.find(
          (item) =>
            String(item.name) === String(nameBaby) && String(item.password) === String(passwordBaby)
        );
        if (isHasAcc && isHasAcc.uniqueId) {
          resolveAll(isHasAcc.uniqueId);
        } else {
          Alert.alert("Đăng nhập", "Vui lòng kiểm tra lại tài khoản và mã đăng nhập");
          resolveAll(undefined);
        }
      }
    });
  });
};
