import _ from "lodash";
import { Alert } from "react-native";
import { getDatabase, ref, onValue } from "firebase/database";
import { initializeApp } from "firebase/app";

import { fbConfig } from "../../firebase";
import { isParentType } from "../../../../app/const/default-type";

export const FbAccParentLogin = async (name, password) => {
  let firebase = initializeApp(fbConfig);
  const db = getDatabase(firebase);
  const postListRef = ref(db, "parentId");

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
      if (arrayListParentAcc && arrayListParentAcc.length > 0) {
        const isHasAcc: isParentType | undefined = arrayListParentAcc?.find(
          (item) => String(item.name) === String(name) && String(item.password) === String(password)
        );
        if (isHasAcc) {
          resolveAll(isHasAcc);
        } else {
          Alert.alert("Đăng nhập", "Vui lòng kiểm tra lại tài khoản và mã đăng nhập");
          resolveAll(undefined);
        }
      }
    });
  });
};

// export const LoginDatabase = async (uniqueId, listAccountBaby) => {
//   console.log("1", uniqueId, listAccountBaby);

//   let firebase = initializeApp(fbConfig);
//   if (uniqueId) {
//     const db = getDatabase(firebase);
//     const postListRef = ref(db, "userId");
//     const newPostRef = push(postListRef);
//     //  remove(postListRef)
//     // set(newPostRef, {deviceId:'uniqueId', uniqueNumberDatabase: 'uniqueNumberDatabase', process:listAccountBaby })
//     update(postListRef, {
//       deviceId: "uniqueId4",
//       uniqueNumberDatabase: "uniqueNumberDatabase",
//       process: {},
//     });
//     let isHasAcc = false;
//     let uniqueNumberDatabase;
//     onValue(postListRef, async (snapshot) => {
//       console.log("2");
//       // update(newPostRef,{})
//       // remove(postListRef)
//       // remove(newPostRef)
//       // set(newPostRef, {deviceId:'uniqueId', uniqueNumberDatabase: 'uniqueNumberDatabase', process:JSON.stringify(listAccountBaby) })
//     });
//   }
// };
