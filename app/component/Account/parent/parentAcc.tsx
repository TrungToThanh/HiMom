import { SegmentedControl } from "@ant-design/react-native";
import React, { useState } from "react";
import { Button, Text, TextInput, View, useWindowDimensions } from "react-native";
import ParentAccCreate from "./parentAcc_create";
import ParentAccLogin from "./parentAcc_login";

const ParentAcc = () => {
  const { width, height } = useWindowDimensions();
  const [isLogin, setIsLogin] = useState(true);
  return (
    <View style={{ width: width, height: 400 }}>
      <View style={{ padding: 10 }}>
        <SegmentedControl
          selectedIndex={isLogin ? 0 : 1}
          values={["Đăng nhập", "Đăng ký"]}
          onValueChange={(value) => setIsLogin(value === "Đăng nhập" ? true : false)}
        />
      </View>
      <View style={{ padding: 10 }}>{isLogin ? <ParentAccLogin /> : <ParentAccCreate />}</View>
    </View>
  );
};

export default ParentAcc;
