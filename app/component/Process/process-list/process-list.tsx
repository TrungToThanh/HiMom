import React, { useCallback, useEffect, useLayoutEffect, useMemo, useState } from "react";
import { View, ScrollView, ImageBackground, useWindowDimensions, StyleSheet } from "react-native";
import { Button, WhiteSpace } from "@ant-design/react-native";
import { FbAccBabyGetProcess } from "../../../../api/firebase/process/getProcess";
import { TitleProcess } from "./sub-componet/title";
import { ContentText } from "./sub-componet/content-text";
import { ContentAttachment } from "./sub-componet/context-attachment";
import { ContentReact } from "./sub-componet/content-react";
import { ContentComment } from "./sub-componet/content-comment";
import { useFocusEffect } from "@react-navigation/native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faMessage, faShare, faThumbsUp } from "@fortawesome/free-solid-svg-icons";

interface Props {
  accountParentId: any;
  accountBabyId: any;
  nameBabyUser: string;
}
const ProcessBabyList = ({ accountParentId, accountBabyId, nameBabyUser }: Props) => {
  const { width, height } = useWindowDimensions();
  const [listEventCook, setListEvent] = useState<any>();
  const [isReload, setReload] = useState(false);

  useEffect(() => {
    FbAccBabyGetProcess(accountBabyId).then((value) => {
      setListEvent(value);
    });
  }, [isReload]);

  useFocusEffect(
    React.useCallback(() => {
      setReload(true);
      setTimeout(() => {
        setReload(false);
      }, 100);
    }, [isReload])
  );

  return (
    <View>
      {listEventCook &&
        listEventCook?.length > 0 &&
        listEventCook?.map((item, indexItem) => {
          const listAttachment: any =
            item?.attachmentList && Object.values(item?.attachmentList)
              ? Object.values(item?.attachmentList)
              : undefined;

          return (
            <View key={indexItem}>
              <View style={styles.container}>
                <TitleProcess
                  item={item}
                  nameBabyUser={nameBabyUser}
                  accountParentId={accountParentId}
                  accountBabyId={accountBabyId}
                  setReload={() => {
                    setReload(true),
                      setTimeout(() => {
                        setReload(false);
                      }, 0);
                  }}
                />
                <WhiteSpace />
                <ContentText item={item} />
                <ContentAttachment listAttachment={listAttachment} />
                <WhiteSpace />
                <ContentReact item={item} accountBabyId={accountBabyId} />
                {/* <ContentComment /> */}
              </View>
            </View>
          );
        })}
    </View>
  );
};

export default ProcessBabyList;
const styles = StyleSheet.create({
  container: {
    minHeight: 50,
    width: "98%",
    backgroundColor: "white",
    borderRadius: 14,
    margin: 5,
    padding: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
});
