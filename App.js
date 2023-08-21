import { AppLoading, Font } from "expo";
import React, { useEffect, useState } from "react";
import { View, StatusBar, StyleSheet } from "react-native";
import Login from "./app/Login/Login";

export default function App() {
  // const [isLoading, setIsLoading] = useState(true);
  // useEffect(() => {
  //   const loading = async () => {
  //     await Font.loadAsync(
  //       "antoutline",
  //       require("@ant-design/icons-react-native/fonts/antoutline.ttf")
  //     );
  //     await Font.loadAsync("antfill", require("@ant-design/icons-react-native/fonts/antfill.ttf"));
  //     setIsLoading(false);
  //   };
  //   loading();
  // }, []);

  // if (isLoading) return <AppLoading />;
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
