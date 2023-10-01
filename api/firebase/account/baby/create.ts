import _ from "lodash";
import { Alert } from "react-native";

import { fbConfig } from "../../firebase";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, push, onValue } from "firebase/database";

type Props = {
  isBorn: boolean;
  nameBaby: string;
  passwordBaby: string;
  isParentCreate: string;
  expectBirthdayBaby: string;
};
export const FbAccBabyCreate = async ({
  isBorn = false,
  nameBaby,
  passwordBaby,
  isParentCreate,
  expectBirthdayBaby,
}: Props) => {
  console.log(isBorn, nameBaby, passwordBaby, isParentCreate, expectBirthdayBaby);
  let firebase = initializeApp(fbConfig);
  const db = getDatabase(firebase);
  const postListRef = ref(db, "babyId");
  const newPostRef = push(postListRef);

  let arrayListBabyAcc;

  return new Promise(function (resolveAll) {
    const stepOne = new Promise(function (resolve) {
      onValue(postListRef, async (snapshot) => {
        if (snapshot.exists && snapshot?.val() !== null && snapshot?.toJSON()) {
          arrayListBabyAcc = Object?.values(snapshot?.toJSON());
          resolve(true);
        } else {
          Alert.alert("Đăng nhập", "Không tồn tại tài khoản");
          resolve(false);
        }
      });
    });

    stepOne.finally(() => {
      const data = {
        uniqueId: newPostRef?.key?.toString(),
        nameBaby: nameBaby,
        passwordBaby: passwordBaby,
        expectBirthdayBaby: expectBirthdayBaby,
        birthdayBaby: expectBirthdayBaby,
        isBorn: isBorn,
        isParentCreate: isParentCreate,
      };

      const isHasAcc = arrayListBabyAcc?.find(
        (item) =>
          String(item.nameBaby) === String(nameBaby) &&
          String(item.isParentCreate) === String(isParentCreate)
      );

      if (isHasAcc) {
        Alert.alert("Đăng ký tài khoản", "Tài khoản này đã tồn tại, vui lòng tạo tài khoản khác!");
        resolveAll(undefined);
      } else {
        set(newPostRef, data);
        Alert.alert("Đăng ký tài khoản", "Tạo thành công!");
        resolveAll(true);
      }
    });
  });
};
