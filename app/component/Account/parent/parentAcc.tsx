import React, { useState } from "react";
import { Text, View, useWindowDimensions } from "react-native";
import { SegmentedControl } from "@ant-design/react-native";

import ParentAccLogin from "./parentAcc_login";
import ParentAccCreate from "./parentAcc_create";

const ParentAcc = () => {
  const { width, height } = useWindowDimensions();
  const [isLogin, setIsLogin] = useState(true);
  return (
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
          Đăng nhập tài khoản phụ huynh
        </Text>
        <SegmentedControl
          selectedIndex={isLogin ? 0 : 1}
          values={["Đăng nhập", "Đăng ký"]}
          onValueChange={(value) => setIsLogin(value === "Đăng nhập" ? true : false)}
        />
      </View>
      <View style={{ padding: 10 }}>
        {isLogin ? <ParentAccLogin /> : <ParentAccCreate setIsLogin={() => setIsLogin(true)} />}
      </View>
    </View>
  );
};

export default ParentAcc;
