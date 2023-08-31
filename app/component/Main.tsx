import React, { useEffect, useMemo, useState } from "react";
import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
import { Radio, Button, WhiteSpace, ActivityIndicator, Result } from "@ant-design/react-native";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

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
      await Font.loadAsync("antfill", require("@ant-design/icons-react-native/fonts/antfill.ttf"));
      setIsLoading(false);
    };
    loading();
  }, []);

  const { listAccountBaby } = getAllBabyInBabyList();

  const isDisableButtonLogin = useMemo(() => {
    return !listAccountBaby ? true : false;
  }, [listAccountBaby]);

  if (isLoading)
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
          style={{ width: windowWidth, marginTop: 100 }}
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
              borderBottomWidth: isShowLogin ? 1 : 0,
            }}
            disabled={isDisableButtonLogin}
          >
            <Text style={{ fontWeight: "600", color: "#1870bc", fontSize: 16 }}>Đăng nhập</Text>
          </Button>
          <Button
            onPress={() => setIsShowLogin(false)}
            type="ghost"
            style={{
              borderTopWidth: 0,
              borderRightWidth: 0,
              borderLeftWidth: 0,
              borderBottomWidth: isShowLogin ? 0 : 1,
            }}
          >
            <Text style={{ fontWeight: "600", color: "#1870bc", fontSize: 16 }}>Đăng ký</Text>
          </Button>
        </View>
        <WhiteSpace size="xl" />
        <View>
          {isShowLogin ? (
            <Login listAccountBaby={listAccountBaby} />
          ) : (
            <View>
              <Account
                setIsLoading={() => {
                  setIsLoading(true);
                  setTimeout(() => {
                    setIsLoading(false);
                  }, 300);
                }}
              />
            </View>
          )}
        </View>
        <WhiteSpace size="xl" />
        <WhiteSpace size="xl" />
        <WhiteSpace size="xl" />
        <WhiteSpace size="xl" />
        <WhiteSpace size="xl" />
        <WhiteSpace size="xl" />
        <WhiteSpace size="xl" />
        <WhiteSpace size="xl" />
        <WhiteSpace size="xl" />
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  logo: {
    width: 66,
    height: 58,
  },
});
