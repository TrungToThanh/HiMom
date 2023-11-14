import _ from "lodash";
import { Alert } from "react-native";

import { fbConfig } from "../../firebase";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, push, onValue, update, remove } from "firebase/database";

type Props = {
  accountId: string;
};
export const FbAccParentGetInfoBasic = async ({ accountId }: Props) => {
  let firebase = initializeApp(fbConfig);
  const db = getDatabase(firebase);
  const postListRef = ref(db, `parentId/${accountId}`);
  let basicInfo: any;
  return new Promise(function (resolveAll) {
    onValue(postListRef, async (snapshot) => {
      if (snapshot.exists && snapshot?.val() !== null) {
        basicInfo = snapshot.val();
        resolveAll(basicInfo);
      }
    });
  });
};
