import _ from "lodash";
import { Alert } from "react-native";

import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, push, onValue, update } from "firebase/database";
import dayjs from "dayjs";
import firebase, { fbConfig, firebaseConfig } from "../firebase";
import * as FileSystem from "expo-file-system";

type Props = {
  accountParentId: string;
  accountBabyId: string;
  content: string | null;
  listAttachmentAddNew: any;
  enableComment: boolean;
};
export const FbProcessPostNewEvent = async ({
  accountParentId,
  accountBabyId,
  content,
  listAttachmentAddNew,
  enableComment,
}: Props) => {
  let firebaseRealtimeData = initializeApp(fbConfig);
  const db = getDatabase(firebaseRealtimeData);
  const postListRef = ref(db, "babyId/" + `${accountBabyId}/processLife/details`);
  const newPostRef = push(postListRef);
  const linkImage = String(newPostRef).substring(
    String(newPostRef).indexOf("babyId/"),
    String(newPostRef).length
  );
  //Upload to storage

  var storage = firebase.firebase.storage();
  var storageRef = storage.ref();

  const stepOne = new Promise(function (resolveStepOne) {
    const stepUploadAllImages = new Promise((resolveUploadAllImage) => {
      if (listAttachmentAddNew && listAttachmentAddNew.length >= 0) {
        listAttachmentAddNew?.map(async (item, index) => {
          const uriFile = item.uri;
          const { uri } = await FileSystem?.getInfoAsync(uriFile);
          const blob: any = await new Promise((resovle, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = () => {
              resovle(xhr.response);
            };
            xhr.onerror = (e) => {
              // console.log(e);
            };
            xhr.responseType = "blob";
            xhr.open("GET", uri, true);
            xhr.send(null);
          });
          const filename = uriFile?.substring(uriFile?.lastIndexOf("/") + 1, uriFile.length);
          const isRes = firebase.firebase
            ?.storage()
            ?.ref()
            ?.child(`HiMom/${linkImage}/${filename}`);
          await isRes?.put(blob);
          if (index === listAttachmentAddNew.length - 1) resolveUploadAllImage(true);
        });
      }
    });

    Promise.all([stepUploadAllImages]).finally(() => resolveStepOne(true));
  });

  stepOne
    .then(async (isSuccess) => {
      const getLinkUrl = async () => {
        let arrayLink: any = [];

        await listAttachmentAddNew?.map(async (item, index) => {
          const fileNameCook = await item?.uri?.substring(
            item?.uri?.lastIndexOf("/"),
            item?.uri?.length
          );

          if (fileNameCook) {
            const get = await storageRef
              .child(`HiMom/${linkImage}${String(fileNameCook) ?? ""}`)
              .getDownloadURL();

            await arrayLink.push({
              height: item?.height || 300,
              width: item?.width || 400,
              uri: get.toString() || item?.uri,
              type: item.type,
            });

            if (index === listAttachmentAddNew?.length - 1) {
              console.log(arrayLink);

              const data = {
                nameEvent: accountParentId,
                contentEvent: content,
                dateEvent: dayjs(new Date()).format("DD-MM-YYYY HH:ss"),
                imageEvent: arrayLink || listAttachmentAddNew,
                videoEvent: "",
                noteEvent: "",
                dateCreateEvent: dayjs(new Date()).format("DD-MM-YYYY HH:ss"),
                isShowEvent: true,
                dateDeleteEvent: "",
                isEnableComment: enableComment ?? false,
                react: "",
              };
              set(newPostRef, data);
            }
          }
        });
      };
      await getLinkUrl();
    })
    .catch((error) => console.log(error));
};
