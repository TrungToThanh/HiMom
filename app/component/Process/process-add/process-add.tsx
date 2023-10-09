import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Alert, StyleSheet, Text, View, useWindowDimensions } from "react-native";
import { Button, WhiteSpace } from "@ant-design/react-native";
import { ContentTextAdd } from "./sub-component/content-text";
import { TitleProcessAdd } from "./sub-component/title";
import { GestureHandlerRootView, ScrollView } from "react-native-gesture-handler";
import { ContentAttachmentAddImage } from "./sub-component/context-attachment-image";
import { ContentPermissionAdd } from "./sub-component/content-permission";
import { useRoute } from "@react-navigation/native";
import { ContentAttachmentAddVideo } from "./sub-component/context-attachment-video";
import { ImageUpload } from "../../../const/type";
import { FbProcessPostNewEvent } from "../../../../api/firebase/process/postNewEvent";
import { useNavigation } from "@react-navigation/native";
import * as FileSystem from "expo-file-system";

const ProcessBabyPostNewEvent = () => {
  const { width, height } = useWindowDimensions();
  const navigation = useNavigation();
  const route = useRoute();

  const accountParentId = useMemo(() => {
    if (route) {
      /* @ts-ignore */
      return route?.params?.accountParentId;
    }
  }, [route]);

  const accountBabyId = useMemo(() => {
    if (route) {
      /* @ts-ignore */
      return route?.params?.accountBabyId;
    }
  }, [route]);

  const [content, setContent] = useState("");
  const [listAttachmentAddNew, setListAttachmentAddNew] = useState<any>();
  const [enableComment, setEnableComment] = useState(true);

  const handlePostNewEvent = () => {
    if (!content && (!listAttachmentAddNew || listAttachmentAddNew?.length < 1)) {
      return Alert.alert("Thông báo!", "Vui lòng nhập thông tin bài mới!");
    }

    FbProcessPostNewEvent({
      accountParentId,
      accountBabyId,
      content,
      listAttachmentAddNew,
      enableComment,
    }).then(() => {
      navigation.goBack();
    });
  };
  return (
    <GestureHandlerRootView>
      <ScrollView>
        <View
          style={{
            minHeight: 50,
            width: width - 10,
            backgroundColor: "white",
            borderColor: "#dedce2",
            borderWidth: 1,
            borderRadius: 5,
            margin: 5,
            padding: 5,
          }}
        >
          <WhiteSpace size="xl" />
          <TitleProcessAdd
            accountParentId={accountParentId}
            handlePostNewEvent={handlePostNewEvent}
          />
          <ContentTextAdd
            setContent={(value) => setContent(value)}
            listAttachmentAddNew={listAttachmentAddNew}
          />
          <ContentAttachmentAddImage
            setListAttachmentAddNew={(list) => setListAttachmentAddNew(list)}
          />
          <ContentPermissionAdd setEnableComment={(value) => setEnableComment(value)} />
        </View>
      </ScrollView>
    </GestureHandlerRootView>
  );
};

export default ProcessBabyPostNewEvent;

const styles = StyleSheet.create({
  div: {
    borderColor: "blue",
    borderWidth: 1,
    borderRadius: 6,
    margin: 5,
    paddingTop: 5,
  },
});
