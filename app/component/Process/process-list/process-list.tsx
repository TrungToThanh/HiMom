import React, { useCallback, useEffect, useMemo, useState } from "react";
import { View, ScrollView, ImageBackground, useWindowDimensions } from "react-native";
import { Button, WhiteSpace } from "@ant-design/react-native";
import { FbAccBabyGetProcess } from "../../../../api/firebase/process/getProcess";
import { TitleProcess } from "./sub-componet/title";
import { ContentText } from "./sub-componet/content-text";
import { ContentAttachment } from "./sub-componet/context-attachment";
import { ContentReact } from "./sub-componet/content-react";
import { ContentComment } from "./sub-componet/content-comment";

interface Props {
  accountParentId: any;
  accountBabyId: any;
}
const ProcessBabyList = ({ accountParentId, accountBabyId }: Props) => {
  const { width, height } = useWindowDimensions();
  const [listEventCook, setListEvent] = useState<any>();

  useEffect(() => {
    FbAccBabyGetProcess(accountBabyId).then((value) => {
      setListEvent(value);
    });
  }, []);

  return (
    <View>
      <ScrollView>
        <View>
          {listEventCook &&
            listEventCook?.length > 0 &&
            listEventCook?.map((item, indexItem) => {
              const listImage: string[] = Object.values(item?.imageEvent);
              const listVideo: string[] = Object.values(item?.videoEvent);
              return (
                <View key={indexItem}>
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
                    <TitleProcess item={item} />
                    <WhiteSpace />
                    <ContentText item={item} />
                    <ContentAttachment listImage={listImage} listVideo={listVideo} />
                    <WhiteSpace />
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <ContentReact />
                      <Button size="small">Bình luận</Button>
                    </View>
                    <ContentComment />
                  </View>
                </View>
              );
            })}
        </View>
      </ScrollView>
    </View>
  );
};

export default ProcessBabyList;
