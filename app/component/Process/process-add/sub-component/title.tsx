import { Button, List, Modal, Radio, Text, View } from "@ant-design/react-native";
import Input from "@ant-design/react-native/lib/input-item/Input";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import dayjs from "dayjs";
import React, { useCallback, useState } from "react";
import { Alert, useWindowDimensions } from "react-native";
import { TextInput } from "react-native-gesture-handler";

type Props = {
  relationShip: any;
  handlePostNewEvent: () => void;
  status: string;
  setStatus: (value: string) => void;
  relationShipCook: string;
  setRelationShipCook: (value: string) => void;
  nameBabyUser: string;
};
export const TitleProcessAdd = ({
  relationShip,
  handlePostNewEvent,
  status,
  setStatus,
  relationShipCook,
  setRelationShipCook,
  nameBabyUser,
}: Props) => {
  const RadioItem = Radio.RadioItem;
  const { width } = useWindowDimensions();

  const handleChooseStatus = useCallback(() => {
    Modal.prompt(
      "Trạng thái",
      <View>
        <Text> Hãy nhập trạng thái như: </Text>
        <Text> "Nhắn gửi", "Yêu thương", "Mong đợi" ....</Text>
      </View>,
      (value: any) => setStatus(value),
      "",
      "",
      ["Hãy nhập trạng thái!"]
    );
  }, []);
  const handleRelationShipCook = useCallback(() => {
    Modal.prompt(
      "Mối quan hệ",
      <View>
        <Text> Hãy nhập mối quan hệ như: </Text>
        <Text> "Bố", "Mẹ", "Bố và Mẹ" ....</Text>
      </View>,
      (value: any) => setRelationShipCook(value),
      "",
      "",
      ["Hãy nhập mối quan hệ!"]
    );
  }, []);
  return (
    <View
      style={{
        width: width - 20,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            margin: 10,
            borderWidth: 1,
            width: 25,
            borderRadius: 20,
            paddingLeft: 3,
            borderColor: "#b0aca8",
          }}
        >
          <FontAwesomeIcon icon={faUser} color="#4294ff" />
        </View>
        <View>
          <View style={{ display: "flex", flexDirection: "row" }}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: "bold",
              }}
            >
              <Text onPress={() => handleRelationShipCook()}> {relationShipCook ?? ""} </Text>
              <Text style={{ color: "red" }} onPress={() => handleChooseStatus()}>
                {`  ${status}  `}
              </Text>
              <Text>{nameBabyUser}</Text>
            </Text>
          </View>

          <Text
            style={{
              fontSize: 12,
              fontWeight: "bold",
              color: "#b0aca8",
            }}
          >
            {dayjs(new Date()).format("DD-MM-YYYY HH:mm")}
          </Text>
        </View>
      </View>
      <View>
        <Button
          type="ghost"
          size="small"
          style={{ height: 30, marginRight: 10 }}
          onPress={handlePostNewEvent}
        >
          Đăng bài viết
        </Button>
      </View>
    </View>
  );
};
