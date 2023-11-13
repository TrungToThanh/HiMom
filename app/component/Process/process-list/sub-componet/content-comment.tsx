import { InputItem, Text, View, WhiteSpace, WingBlank } from "@ant-design/react-native";
import Input from "@ant-design/react-native/lib/input-item/Input";
import { faCircleArrowRight, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { StyleSheet, useWindowDimensions } from "react-native";
import { GestureHandlerRootView, TextInput } from "react-native-gesture-handler";
import { FbProcessUpdateComment } from "../../../../../api/firebase/process/updateComment";
import dayjs, { Dayjs } from "dayjs";

type Props = {
  item: any;
  accountBabyId: string;
};

export const ContentComment = ({ item, accountBabyId }: Props) => {
  const [isShowSendComment, setShowSendComment] = useState(false);
  const [currentValueComment, setCurrentValueComment] = useState<string>();

  const handleUpdateComment = useCallback(async () => {
    if (!accountBabyId || !currentValueComment || !item.nameEvent || !item.relationShip) return;

    await FbProcessUpdateComment({
      accountBabyId: accountBabyId,
      newComment: currentValueComment,
      nameEvent: item.nameEvent,
      time: new Date().toISOString(),
      whoComment: item.relationShip,
    });
  }, [currentValueComment]);

  const listComment = useMemo(() => {
    console.log(Object.values(item.commentList));
    if (item.commentList) {
      return Object.values(item.commentList);
    } else {
      return [];
    }
  }, []);
  return (
    <GestureHandlerRootView>
      <View style={{ borderTopWidth: 1, borderColor: "#E5E8EB", marginTop: 10 }}>
        <WingBlank>
          <WhiteSpace />
          {listComment &&
            listComment?.map(
              (
                itemComment: { whoComment: string; time: string; comment: string },
                indexComment
              ) => {
                return (
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      paddingBottom: 10,
                    }}
                    key={indexComment}
                  >
                    <View style={styles.textButton}>
                      <FontAwesomeIcon icon={faUser} />
                    </View>
                    <View style={{ paddingLeft: 5, paddingRight: 5 }}>
                      <View
                        style={{
                          width: "80%",
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <Text style={{ fontWeight: "bold", fontSize: 12 }}>
                          {itemComment?.whoComment}
                        </Text>
                        <Text style={{ fontWeight: "normal", fontSize: 11 }}>
                          {dayjs(new Date(itemComment?.time)).format("H:mm DD/MM/YYYY")}
                        </Text>
                      </View>
                      <Text style={{ fontWeight: "normal", fontSize: 12 }}>
                        {itemComment?.comment}
                      </Text>
                    </View>
                  </View>
                );
              }
            )}

          <View
            style={{
              borderColor: "#F8F9FA",
              borderWidth: 1,
              borderRadius: 16,
              marginTop: 5,
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View style={styles.textButton}>
                <FontAwesomeIcon icon={faUser} />
              </View>
              <Input
                placeholder="Nhập bình luận ..."
                style={{ paddingLeft: 4 }}
                value={currentValueComment}
                onChange={() => setShowSendComment(true)}
                onChangeText={(value) => {
                  console.log(value);
                  setCurrentValueComment(value);
                }}
              />
            </View>

            {isShowSendComment && (
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 5,
                  borderWidth: 1,
                  borderRadius: 10,
                  borderColor: "#CFD7ED",
                  paddingHorizontal: 8,
                }}
                onTouchStart={() => {
                  setShowSendComment(false);
                  setCurrentValueComment("");
                  handleUpdateComment();
                }}
              >
                <View>
                  <FontAwesomeIcon icon={faCircleArrowRight} color="#1977F3" />
                </View>
                <Text>Gửi</Text>
              </View>
            )}
          </View>
        </WingBlank>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  textButton: {
    backgroundColor: "white",
    width: 16,
    height: 16,
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
    borderRadius: 50,
    borderColor: "#CFD7ED",
    borderWidth: 1,
  },
});
