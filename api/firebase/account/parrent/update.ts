import _ from "lodash";
import { Alert } from "react-native";

import { fbConfig } from "../../firebase";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, remove, onValue, update, push } from "firebase/database";

export const FbAccParentUpdateWhenCreateBaby = async (
  uniqueId,
  uniqueIdBaby,
  nameAccountBaby,
  relationShip
) => {
  let firebase = initializeApp(fbConfig);
  const db = getDatabase(firebase);
  const postListRef = ref(db, "parentId");
  // remove(postListRef);
  let arrayListParentAcc;

  return new Promise(function (resolveAll) {
    const stepOne = new Promise(function (resolve) {
      onValue(postListRef, async (snapshot) => {
        if (snapshot.exists && snapshot?.val() !== null && snapshot.toJSON()) {
          arrayListParentAcc = Object.values(snapshot.toJSON());
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });

    stepOne.finally(() => {
      const isHasAcc = arrayListParentAcc?.find(
        (item) => String(item.uniqueId) === String(uniqueId)
      );

      const acc = {
        uniqueIdBaby: uniqueIdBaby,
        nameAccount: nameAccountBaby,
        relationShip: relationShip,
        permission: {
          account: {
            view: true,
            edit: true,
            delete: true,
          },
          processLife: {
            view: true,
            edit: true,
            delete: true,
            comment: true,
            react: true,
            add: true,
          },
          prepare: {
            view: true,
            modify: true,
          },
          reminder: {
            view: true,
            add: true,
          },
        },
      };

      const postAccRef = ref(db, "parentId/" + `${uniqueId}/` + "account");
      const pushAccRef = push(postAccRef);

      set(pushAccRef, acc);
    });
  });
};
