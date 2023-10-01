import _ from "lodash";
import { Alert } from "react-native";

import { fbConfig } from "../../firebase";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, push, onValue } from "firebase/database";

export const FbAccParentCreate = async (name, password) => {
  let firebase = initializeApp(fbConfig);
  const db = getDatabase(firebase);
  const postListRef = ref(db, "parentId");
  const newPostRef = push(postListRef);

  let arrayListParentAcc;

  return new Promise(function (resolveAll) {
    const stepOne = new Promise(function (resolve) {
      onValue(postListRef, async (snapshot) => {
        if (snapshot.exists && snapshot?.val() !== null && snapshot.toJSON()) {
          arrayListParentAcc = Object.values(snapshot.toJSON());
          resolve(true);
        } else {
          resolve(false);
          Alert.alert("Đăng nhập", "Không tồn tại tài khoản");
        }
      });
    });

    stepOne.finally(() => {
      const isHasAcc = arrayListParentAcc?.find((item) => String(item.name) === String(name));
      if (isHasAcc) {
        Alert.alert("Đăng ký tài khoản", "Tài khoản này đã tồn tại, vui lòng tạo tài khoản khác!");
        resolveAll(undefined);
      } else {
        set(newPostRef, {
          uniqueId: newPostRef.key.toString(),
          name: name,
          password: password,
          avatar: "",
          account: "",
        });
        Alert.alert("Đăng ký tài khoản", "Tạo thành công!");
        resolveAll(true);
      }
    });
  });
};
