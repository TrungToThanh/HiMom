import _ from "lodash";
import { Alert } from "react-native";

import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, push, onValue } from "firebase/database";
import { fbConfig } from "../firebase";
import dayjs from "dayjs";

type Props = {
  accountParentId: string;
  accountBabyId: string;
  content: string | null;
  listImageAddNew: any;
  listVideoAddNew: any;
  enableComment: boolean;
};
export const FbProcessPostNewEvent = async ({
  accountParentId,
  accountBabyId,
  content,
  listImageAddNew,
  listVideoAddNew,
  enableComment,
}: Props) => {
  let firebase = initializeApp(fbConfig);
  const db = getDatabase(firebase);
  const postListRef = ref(db, "babyId/" + `${accountBabyId}/processLife/details`);
  const newPostRef = push(postListRef);
  const data = {
    nameEvent: accountParentId,
    contentEvent: content,
    dateEvent: dayjs(new Date()).format("DD-MM-YYYY HH:ss"),
    imageEvent: listImageAddNew ?? "",
    videoEvent: listVideoAddNew ?? "",
    noteEvent: "",
    dateCreateEvent: dayjs(new Date()).format("DD-MM-YYYY HH:ss"),
    isShowEvent: true,
    dateDeleteEvent: "",
    isEnableComment: enableComment ?? false,
    react: "",
  };
  set(newPostRef, data);
};
