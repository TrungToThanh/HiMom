import { Text, View } from "@ant-design/react-native";
import Input from "@ant-design/react-native/lib/input-item/Input";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import dayjs from "dayjs";
import React from "react";
import { useWindowDimensions } from "react-native";
import { TextInput } from "react-native-gesture-handler";

type Props = {
  accountParentName: string;
};
export const TitleNewPost = ({ accountParentName }: Props) => {
  const { width } = useWindowDimensions();
  return (
    <View
      style={{
        width: width,
        display: "flex",
        flexDirection: "row",
        backgroundColor: "white",
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
          height: 25,
          borderRadius: 20,
          paddingLeft: 3,
          borderColor: "#b0aca8",
        }}
      >
        <FontAwesomeIcon icon={faUser} color="#4294ff" />
      </View>
      <View>
        <Text
          style={{
            fontSize: 14,
            fontWeight: "bold",
          }}
        >
          {accountParentName || ""}
        </Text>

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
  );
};
