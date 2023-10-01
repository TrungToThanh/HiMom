import React, { useMemo, useState } from "react";
import { Text, View, useWindowDimensions } from "react-native";

import { useRoute } from "@react-navigation/native";
import { Result, SegmentedControl } from "@ant-design/react-native";

import BabyAccLogin from "./babyAcc_login";
import BabyAccCreate from "./babyAcc_create";

const BabyAcc = () => {
  const route = useRoute();
  const image = require("../../../../assets/pics/born.png");

  const { width, height } = useWindowDimensions();
  const [isLogin, setIsLogin] = useState(true);

  const nameParentUserId = useMemo(() => {
    if (route) {
      /* @ts-ignore */
      return route?.params?.nameParentUserId;
    }
  }, [route]);

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
        style={{ width: width, marginTop: 50, backgroundColor: "#f2f2f2" }}
      />
      <View style={{ width: width, height: 400 }}>
        <View style={{ padding: 10 }}>
          <Text
            style={{
              fontSize: 14,
              fontWeight: "600",
              padding: 10,
              display: "flex",
              alignSelf: "center",
              flexDirection: "row",
            }}
          >
            Đăng nhập tài khoản baby
          </Text>
          <SegmentedControl
            selectedIndex={isLogin ? 0 : 1}
            values={["Đăng nhập", "Đăng ký"]}
            onValueChange={(value) => setIsLogin(value === "Đăng nhập" ? true : false)}
          />
        </View>
        <View style={{ padding: 10 }}>
          {isLogin ? (
            <BabyAccLogin />
          ) : (
            <BabyAccCreate
              nameParentUserId={nameParentUserId}
              setIsLogin={() => setIsLogin(true)}
            />
          )}
        </View>
      </View>
    </View>
  );
};

export default BabyAcc;
