import _ from "lodash";
import { Alert } from "react-native";

import { fbConfig } from "../../firebase";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, push, onValue, update, remove } from "firebase/database";

type Props = {
  nameBaby: string;
  passwordBaby: string;
  expectBirthdayBaby: string;
  birthdayBaby: string;
  isBorn: boolean;
};
export const FbAccBabyGetInfo = async ({
  nameBaby,
  passwordBaby,
  expectBirthdayBaby,
  birthdayBaby,
  isBorn = false,
}: Props) => {
  let firebase = initializeApp(fbConfig);
  const db = getDatabase(firebase);
  const postListRef = ref(db, "babyId");
  const newPostRef = push(postListRef);
  let isHasAcc = false;
  await onValue(postListRef, async (snapshot) => {
    if (isHasAcc) return true;
    if (snapshot.exists || snapshot?.val() !== null) {
      snapshot.forEach((acc: any) => {
        if (isHasAcc) return true;
        if (String(acc.toJSON()?.nameBaby) === String(nameBaby)) {
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
    set(newPostRef, {
      uniqueId: newPostRef.key.toString(),
      nameBaby: nameBaby,
      passwordBaby: passwordBaby,
      expectBirthdayBaby: expectBirthdayBaby,
      birthdayBaby: birthdayBaby,
      isBorn: isBorn,
    });
    Alert.alert("Đăng ký tài khoản", "Tạo thành công!");
  }
  return isHasAcc;
};
