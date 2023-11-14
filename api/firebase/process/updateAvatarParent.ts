import _ from "lodash";
import { Alert } from "react-native";

import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, push, onValue, update, remove, child } from "firebase/database";
import { fbConfig } from "../firebase";

type Props = {
  accountId: string;
  avatar: string;
};
export const FbProcessUpdateAvatarParent = async ({ accountId, avatar }: Props) => {
  let firebase = initializeApp(fbConfig);
  const db = getDatabase(firebase);
  const postListRef = ref(db, `parentId/${accountId}/avatar`);
  update(postListRef, { base64: avatar });
};
