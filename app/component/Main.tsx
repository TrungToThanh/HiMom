import React, { useEffect, useMemo, useState } from "react";
import { View, Text, Dimensions } from "react-native";
import {
  Button,
  WhiteSpace,
  ActivityIndicator,
  Result,
} from "@ant-design/react-native";

import * as Font from "expo-font";

import { getAllBabyInBabyList } from "../../api/login/login";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Login from "./login/login";
import Account from "./account/account";

export default function Main() {
  const image = require("../../assets/pics/born.png");
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const [isShowLogin, setIsShowLogin] = useState(true);

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const loading = async () => {
      await Font.loadAsync(
        "antoutline",
        require("@ant-design/icons-react-native/fonts/antoutline.ttf")
      );
      await Font.loadAsync(
        "antfill",
        require("@ant-design/icons-react-native/fonts/antfill.ttf")
      );
      setIsLoading(false);
    };
    loading();
  }, []);

  const { listAccountBaby } = getAllBabyInBabyList(isLoading);

  console.log("listAccountBaby", listAccountBaby);
  const isDisableButtonLogin = useMemo(() => {
    return !listAccountBaby ? true : false;
  }, [listAccountBaby]);

  // if (isLoading )
  //   return (
  //     <View
  //       style={{
  //         display: "flex",
  //         justifyContent: "center",
  //         alignItems: "center",
  //       }}
  //     >
  //       <Text>
  //         Loading <ActivityIndicator />
  //       </Text>
  //     </View>
  //   );

  return (
    <GestureHandlerRootView>
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
        }}
      >
        <Result
          imgUrl={image}
          title="Hi Mom!"
          message={"Chúng ta là một gia đình"}
          style={{ width: windowWidth, marginTop: 50 }}
        />
        <View
          style={{
            flexDirection: "row",
            width: windowWidth,
            display: "flex",
            justifyContent: "space-around",
            backgroundColor: "white",
          }}
        >
          <Button
            onPress={() => setIsShowLogin(true)}
            type="ghost"
            style={{
              borderTopWidth: 0,
              borderRightWidth: 0,
              borderLeftWidth: 0,
              borderBottomWidth:
                isShowLogin && listAccountBaby && listAccountBaby?.length > 0
                  ? 1
                  : 0,
            }}
            disabled={isDisableButtonLogin}
          >
            <Text style={{ fontWeight: "600", color: "#1870bc", fontSize: 16 }}>
              Đăng nhập
            </Text>
          </Button>
          <Button
            onPress={() => setIsShowLogin(false)}
            type="ghost"
            style={{
              borderTopWidth: 0,
              borderRightWidth: 0,
              borderLeftWidth: 0,
              borderBottomWidth:
                isShowLogin && listAccountBaby && listAccountBaby?.length > 0
                  ? 0
                  : 1,
            }}
          >
            <Text style={{ fontWeight: "600", color: "#1870bc", fontSize: 16 }}>
              Đăng ký
            </Text>
          </Button>
        </View>
        <WhiteSpace size="xl" />
        <View>
          {isShowLogin && listAccountBaby && listAccountBaby?.length > 0 ? (
            <Login listAccountBaby={listAccountBaby} />
          ) : (
            <Account
              setIsLoading={() => {
                setIsLoading(true);
                setTimeout(() => {
                  setIsLoading(false);
                }, 300);
                setIsShowLogin(true);
              }}
            />
          )}
        </View>
      </View>
    </GestureHandlerRootView>
  );
}
