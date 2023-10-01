import React, { useEffect, useMemo, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { View, Text, Dimensions } from "react-native";
import { Button, WhiteSpace, ActivityIndicator, Result } from "@ant-design/react-native";
import * as Font from "expo-font";

import { getAllBabyInBabyList } from "../../api/login/login";
import Login from "./login/login";
import Account from "./account/account";
import { LoginDatabase, UploadDatabase } from "../../api/database";
import Input from "@ant-design/react-native/lib/input-item/Input";
import ParentAcc from "./account/parent/parentAcc";
import InternetStatus from "./utils/internet-status";
import * as Network from "expo-network";
import BabyAcc from "./account/baby/babyAcc";

export default function Main() {
  const image = require("../../assets/pics/born.png");
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const [isShowLogin, setIsShowLogin] = useState(true);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loading = async () => {
      await Font.loadAsync(
        "antoutline",
        require("@ant-design/icons-react-native/fonts/antoutline.ttf")
      );
      await Font.loadAsync("antfill", require("@ant-design/icons-react-native/fonts/antfill.ttf"));
    };
    loading();
  }, []);

  const { listAccountBaby } = getAllBabyInBabyList(isLoading);

  const isDisableButtonLogin = useMemo(() => {
    return !listAccountBaby ? true : false;
  }, [listAccountBaby]);

  useFocusEffect(
    React.useCallback(() => {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 300);
    }, [])
  );

  const isInternetStatus = useMemo(() => {
    let isConnected = false;
    Network.getNetworkStateAsync().then((item) => {
      isConnected = item.isConnected;
    });
    return isConnected;
  }, []);

  return (
    <View
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f2f2f2",
      }}
    >
      <Result
        imgUrl={image}
        title="Hi Mom!"
        message={"Chúng ta là một gia đình"}
        style={{ width: windowWidth, marginTop: 50, backgroundColor: "#f2f2f2" }}
      />
      {isInternetStatus ? <InternetStatus /> : <ParentAcc />}
      {/* {isInternetStatus ? <InternetStatus /> : <BabyAcc />} */}

      {/* <View
        style={{
          flexDirection: "row",
          width: windowWidth,
          display: "flex",
          justifyContent: "space-around",
          backgroundColor: "#f2f2f2",
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
              isShowLogin && listAccountBaby && listAccountBaby?.length > 0 ? 1 : 0,
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
            borderBottomWidth:
              isShowLogin && listAccountBaby && listAccountBaby?.length > 0 ? 0 : 1,
          }}
        >
          <Text style={{ fontWeight: "600", color: "#1870bc", fontSize: 16 }}>Đăng ký</Text>
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
              }, 100);
              setIsShowLogin(true);
            }}
          />
        )}
      </View> */}
    </View>
  );
}
