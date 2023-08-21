import React, { useEffect, useState } from "react";
import { View, StatusBar, StyleSheet } from "react-native";

import Main from "./app/Main";

import {
  Provider
} from "@ant-design/react-native";

import enUS from "@ant-design/react-native/lib/locale-provider/en_US";

export default function App() {

  return (
    <Provider locale={enUS}> 
    <View>
      <StatusBar animated={true} backgroundColor="white" />
      <Main />
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
