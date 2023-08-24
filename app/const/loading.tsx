import React from "react";
import { Text } from "react-native";
import { ActivityIndicator, View } from "@ant-design/react-native";

const LoadingData = () => {
  return (
    <View
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>
        Loading <ActivityIndicator />
      </Text>
    </View>
  );
};

export default LoadingData;
