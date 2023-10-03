import { Text, View } from "@ant-design/react-native";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React from "react";
import { useWindowDimensions } from "react-native";
import { GestureHandlerRootView, TextInput } from "react-native-gesture-handler";

export const ContentComment = (item) => {
  const { width } = useWindowDimensions();
  return (
    <GestureHandlerRootView>
      <View>
        <TextInput />
      </View>
    </GestureHandlerRootView>
  );
};
