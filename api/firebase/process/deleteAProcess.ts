import _ from "lodash";

import { initializeApp } from "firebase/app";
import { getDatabase, ref, update, remove } from "firebase/database";
import { fbConfig } from "../firebase";
import { Alert } from "react-native";

type Props = {
  accountBabyId: string;
  nameEvent: string;
};
export const FbProcessDeleteAPost = async ({ accountBabyId, nameEvent }: Props) => {
  let firebase = initializeApp(fbConfig);
  const db = getDatabase(firebase);
  const postListRef = ref(db, "babyId/" + `${accountBabyId}/processLife/details/${nameEvent}`);

  remove(postListRef).then((isRes) => {
    Alert.alert("Xóa bài viết", "Đã xóa thành công!");
  });
};
