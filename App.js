import { useEffect } from "react";
import { AppLoading, Font } from "expo";
import { View, Text, StatusBar, SafeAreaView, StyleSheet } from "react-native";
import Login from "./app/Login/Login";

export default function App() {
  return (
    <View>
      <StatusBar animated={true} backgroundColor="white" />
      {/* <SafeAreaView> */}
      <Login />
      {/* </SafeAreaView> */}
    </View>
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
