import { Text, View, WingBlank } from "@ant-design/react-native";
import { faHeart, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React from "react";
import { useWindowDimensions } from "react-native";

export const ContentReact = () => {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        paddingLeft: 10,
      }}
    >
      <FontAwesomeIcon icon={faHeart} color="red" size={20} />
      <Text> 999</Text>
    </View>
  );
};
