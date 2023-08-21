import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import {
  Button,
  Card,
  Checkbox,
  InputItem,
  List,
  Radio,
  WhiteSpace,
  WingBlank,
} from "antd-mobile-rn";

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
      <Text> Thông tin đăng nhập </Text>
      <View
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          width: "100%",
        }}
      >
        <List
          renderHeader={"Thông tin đăng nhập"}
          renderFooter={
            <Button style={{ width: "50%", backgroundColor: "primary" }}> Đăng nhập </Button>
          }
          style={{ width: "100%" }}
        >
          <InputItem clear error placeholder="Mã đăng nhập">
            Mã đăng nhập
          </InputItem>
        </List>
      </View>
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
