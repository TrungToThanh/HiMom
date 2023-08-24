import React, { useEffect, useState } from "react";
import { View, StatusBar, StyleSheet, Text, Dimensions } from "react-native";

import { Provider } from "@ant-design/react-native";

import enUS from "@ant-design/react-native/lib/locale-provider/en_US";

import MyRoutes from "./app/component/router";

export default function App() {
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  return (
    <Provider locale={enUS}>
      <View width={windowWidth} height={windowHeight}>
        <StatusBar animated={true} backgroundColor="blue" />
        <MyRoutes />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 25,
    color: "black",
    fontWeight: "500",
  },
});
