import _ from "lodash";
import { Alert } from "react-native";

import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, push, onValue, update, remove, child } from "firebase/database";
import { fbConfig } from "../firebase";

type Props = {
  accountBabyId: string;
  newComment: string;
  nameEvent: string;
  time: string;
  whoComment: string;
};
export const FbProcessUpdateComment = async ({
  accountBabyId,
  newComment,
  nameEvent,
  time,
  whoComment,
}: Props) => {
  let firebase = initializeApp(fbConfig);
  const db = getDatabase(firebase);
  const postListRef = ref(
    db,
    `babyId/${accountBabyId}/processLife/details/${nameEvent}/commentList`
  );
  const newPostRef = push(postListRef);
  const data = {
    whoComment: whoComment,
    time: time,
    comment: newComment,
  };
  set(newPostRef, data);
};
