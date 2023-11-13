import _ from "lodash";
import { Alert } from "react-native";

import { fbConfig } from "../../firebase";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, push, onValue, update, remove } from "firebase/database";

type Props = {
  accountBabyId: string;
};
export const FbAccBabyGetInfoBasic = async ({ accountBabyId }: Props) => {
  let firebase = initializeApp(fbConfig);
  const db = getDatabase(firebase);
  const postListRef = ref(db, `babyId/${accountBabyId}/profile`);
  let basicInfo: any;
  onValue(postListRef, async (snapshot) => {
    basicInfo = snapshot.val();
    return snapshot.val();
  });
  return basicInfo;
};
