import _ from "lodash";
import { Alert } from "react-native";

import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, push, onValue, update, remove, child } from "firebase/database";
import { fbConfig } from "../firebase";

type Props = {
  accountBabyId: string;
  newReact: string | number;
  nameEvent: string;
};
export const FbProcessUpdateReact = async ({ accountBabyId, newReact, nameEvent }: Props) => {
  console.log(accountBabyId, newReact, nameEvent);

  let firebase = initializeApp(fbConfig);
  const db = getDatabase(firebase);
  const postListRef = ref(db, "babyId/" + `${accountBabyId}/processLife/details/${nameEvent}`);

  update(postListRef, { react: newReact });
};
