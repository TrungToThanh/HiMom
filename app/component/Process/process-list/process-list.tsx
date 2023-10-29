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

  useEffect(() => {
    setReload(true);
    setTimeout(() => {
      setReload(false);
    }, 100);
  }, [isReload]);

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
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <ContentReact item={item} accountBabyId={accountBabyId} />
                  <Button size="small">Bình luận</Button>
                </View>
                {/* <ContentComment /> */}
              </View>
            </View>
          );
        })}
    </View>
  );
};

export default ProcessBabyList;
