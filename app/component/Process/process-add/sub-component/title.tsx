import { Button, List, Modal, Radio, Text, View } from "@ant-design/react-native";
import Input from "@ant-design/react-native/lib/input-item/Input";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import dayjs from "dayjs";
import React, { useState } from "react";
import { Alert, useWindowDimensions } from "react-native";
import { TextInput } from "react-native-gesture-handler";

type Props = {
  accountParentName: any;
  handlePostNewEvent: () => void;
};
export const TitleProcessAdd = ({ accountParentName, handlePostNewEvent }: Props) => {
  const RadioItem = Radio.RadioItem;
  const { width } = useWindowDimensions();
  const [status, setStatus] = useState("nhắn gửi");

  const handleChooseStatus = () => {
    Modal.prompt(
      "Trạng thái",
      <View>
        <Text> Hãy nhập trạng thái</Text>
        <Radio.Group>
          <RadioItem key={0} value={"Nhắn gửi"} onChange={() => setStatus("Nhắn gửi")}>
            <Text>Nhắn gửi</Text>
          </RadioItem>
          <RadioItem key={1} value={"Mong đợi"} onChange={() => setStatus("Mong đợi")}>
            <Text>Mong đợi</Text>
          </RadioItem>
          <RadioItem key={2} value={"Yêu thương"} onChange={() => setStatus("Yêu thương")}>
            <Text>Yêu thương</Text>
          </RadioItem>
        </Radio.Group>
      </View>,
      (value: any) => setStatus(value),
      "",
      "yêu thương",
      ["Hãy nhập trạng thái!"]
    );
  };
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
              {accountParentName ?? ""} {status} Jennie
            </Text>
            <Button size="small" onPress={() => handleChooseStatus()}>
              Trạng thái
            </Button>
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
