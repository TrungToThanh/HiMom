import { Radio, List, Button, InputItem, Card, WhiteSpace } from "@ant-design/react-native";
import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

export default function Login() {
  const RadioItem = Radio.RadioItem;
  return (
    <View style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Image
        style={styles.tinyLogo}
        source={{
          uri: "https://reactnative.dev/img/tiny_logo.png",
        }}
      />
      <WhiteSpace />
      <View
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          width: "100%",
        }}
      >
        <Card style={{ width: "100%" }}>
          <Card.Header
            title="Thông tin đăng nhập"
            thumbStyle={{ width: 30, height: 30 }}
            thumb="https://gw.alipayobjects.com/zos/rmsportal/MRhHctKOineMbKAZslML.jpg"
          />
          <List renderHeader={"Tài khoản:"} style={{ width: "100%" }}>
            <Radio.Group
              style={{
                width: "100%",
                //   flexDirection: "row",
                //   justifyContent: "space-around",
                paddingVertical: 6,
              }}
            >
              <Radio value={1}>A</Radio>
              <Radio value={2}>B</Radio>
              <Radio value={3}>C</Radio>
              <Radio value={4}>D</Radio>
            </Radio.Group>
          </List>
          <List renderHeader={"Mã đăng nhập"} style={{ width: "100%" }}>
            <InputItem clear error placeholder="Mã đăng nhập"></InputItem>
          </List>
        </Card>
      </View>
      <Button style={{ width: "50%", backgroundColor: "primary" }}> Đăng nhập </Button>
    </View>
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
