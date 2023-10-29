import _ from "lodash";
import { Alert } from "react-native";

import { fbConfig } from "../../firebase";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, push, onValue } from "firebase/database";
import { FbAccParentUpdateWhenCreateBaby } from "../parrent/update";

type Props = {
  isBorn: boolean;
  nameBaby: string;
  passwordBaby: string;
  isParentCreate: string;
  expectBirthdayBaby: string;
  relationShip: string;
};
export const FbAccBabyCreate = async ({
  isBorn = false,
  nameBaby,
  passwordBaby,
  isParentCreate,
  expectBirthdayBaby,
  relationShip,
}: Props) => {
  let firebase = initializeApp(fbConfig);
  const db = getDatabase(firebase);
  const postListRef = ref(db, "babyId");
  const newPostRef = push(postListRef);

  const uniqueIdBaby = newPostRef?.key?.toString();

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
        uniqueId: uniqueIdBaby,
        profile: {
          nameBaby: nameBaby,
          passwordBaby: passwordBaby,
          expectBirthdayBaby: expectBirthdayBaby,
          birthdayBaby: expectBirthdayBaby,
          isBorn: isBorn,
          isParentCreate: isParentCreate,
          avatar: "",
        },
        processLife: {
          details: [
            {
              nameEvent: isParentCreate,
              contentEvent: "Nhịp đập đầu tiên! 💓",
              dateEvent: expectBirthdayBaby,
              attachmentList: [
                {
                  type: "image",
                  uri: "https://firebasestorage.googleapis.com/v0/b/himom-4abb5.appspot.com/o/HiMom%2Fasset%2FfirstBeat.png?alt=media&token=ebbf635d-398c-4983-a1f9-1ebe33261952&_gl=1*17fefpr*_ga*MTM4NzYwMzI3LjE2OTQwOTExMTM.*_ga_CW55HF8NVT*MTY5Njk0ODIxNy4zNi4xLjE2OTY5NDg2NjUuMzAuMC4w",
                },
              ],
              noteEvent: "",
              dateCreateEvent: new Date().toISOString(),
              isShowEvent: true,
              dateDeleteEvent: "",
              status: "bất ngờ",
              relationShip: "Cả nhà",
            },
          ],
        },
        prepare: [],
        reminder: [],
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
        FbAccParentUpdateWhenCreateBaby(isParentCreate, uniqueIdBaby, nameBaby, relationShip);
        Alert.alert("Đăng ký tài khoản", "Tạo thành công!");
        resolveAll(true);
      }
    });
  });
};
