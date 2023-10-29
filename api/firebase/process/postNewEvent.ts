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
  status: string;
  relationShip: string;
};
export const FbProcessPostNewEvent = async ({
  accountParentId,
  accountBabyId,
  content,
  listAttachmentAddNew,
  enableComment,
  status,
  relationShip,
}: Props) => {
  let firebaseRealtimeData = initializeApp(fbConfig);
  const db = getDatabase(firebaseRealtimeData);
  const postListRef = ref(db, "babyId/" + `${accountBabyId}/processLife/details`);
  const newPostRef = push(postListRef);
  const listAttachment = String(newPostRef).substring(
    String(newPostRef).indexOf("babyId/"),
    String(newPostRef).length
  );

  //Upload to storage
  var storage = firebase.firebase.storage();
  var storageRef = storage.ref();

  const stepOne = new Promise(function (resolveStepOne) {
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
          ?.child(`HiMom/${listAttachment}/${filename}`);
        await isRes?.put(blob);
        if (index === listAttachmentAddNew.length - 1) resolveStepOne(true);
      });
    } else {
      const data = {
        nameEvent: accountParentId,
        contentEvent: content,
        dateEvent: dayjs(new Date()).format("DD-MM-YYYY HH:ss"),
        attachmentList: "",
        noteEvent: "",
        dateCreateEvent: dayjs(new Date()).format("DD-MM-YYYY HH:ss"),
        isShowEvent: true,
        dateDeleteEvent: "",
        isEnableComment: enableComment ?? false,
        react: "",
        status: status,
        relationShip: relationShip,
      };
      set(newPostRef, data);
    }
  });

  //Get link of firebase and upload realtime database
  stepOne
    .then(async (isSuccess) => {
      if (isSuccess) {
        const getLinkUrl = async () => {
          let listAttachmentAddNewCook: any = [];

          await listAttachmentAddNew?.map(async (item, index) => {
            const fileNameCook = await item?.uri?.substring(
              item?.uri?.lastIndexOf("/"),
              item?.uri?.length
            );

            if (fileNameCook) {
              const get = await storageRef
                .child(`HiMom/${listAttachment}${String(fileNameCook) ?? ""}`)
                .getDownloadURL();

              await listAttachmentAddNewCook.push({
                height: item?.height || 300,
                width: item?.width || 400,
                uri: get.toString() || item?.uri,
                type: item.type,
              });

              if (index === listAttachmentAddNew?.length - 1) {
                const data = {
                  nameEvent: accountParentId,
                  contentEvent: content,
                  dateEvent: dayjs(new Date()).format("DD-MM-YYYY HH:ss"),
                  attachmentList: listAttachmentAddNewCook || listAttachmentAddNew,
                  noteEvent: "",
                  dateCreateEvent: dayjs(new Date()).format("DD-MM-YYYY HH:ss"),
                  isShowEvent: true,
                  dateDeleteEvent: "",
                  isEnableComment: enableComment ?? false,
                  react: "",
                  status: status,
                  relationShip: relationShip,
                };
                set(newPostRef, data);
              }
            }
          });
        };
        await getLinkUrl();
      }
    })
    .catch((error) => console.log(error));
};
