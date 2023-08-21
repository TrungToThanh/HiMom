import React, { useState } from "react";
import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
import {
  Radio,
  Icon,
  Button,
  InputItem,
  Card,
  WhiteSpace,
  Checkbox,
} from "@ant-design/react-native";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

export default function Login() {
  const RadioItem = Radio.RadioItem;
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const [typeInput, setTypeInput] = useState(true);

  const options = [
    {
      label: (
        <View>
          <Text>
            <FontAwesomeIcon icon="male" />
            Account 1
          </Text>
        </View>
      ),
      value: "1",
    },
    {
      label: (
        <View>
          <Text>
            <FontAwesomeIcon icon="male" />
            Account 1
          </Text>
        </View>
      ),
      value: "2",
    },
  ];

  return (
    <View style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <View
        style={{
          height: windowHeight / 4,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Image
          style={styles.tinyLogo}
          source={{
            uri: "https://reactnative.dev/img/tiny_logo.png",
          }}
        />
      </View>

      <WhiteSpace />
      <Card
        style={{
          width: windowWidth - 15,
        }}
      >
        <Card.Header
          title={
            <Text style={{ color: "#1870bc", fontSize: 18, fontWeight: "bold" }}>
              Thông tin đăng nhập
            </Text>
          }
          thumbStyle={{ width: 30, height: 30 }}
          thumb="https://gw.alipayobjects.com/zos/rmsportal/MRhHctKOineMbKAZslML.jpg"
          style={{}}
        />
        <Card.Body>
          <Text
            style={{
              color: "#1870bc",
              fontSize: 16,
              fontWeight: "bold",
              paddingLeft: 20,
            }}
          >
            Tài khoản:
          </Text>
          <Radio.Group
            style={{
              marginLeft: 30,
              marginRight: 20,
            }}
            options={options}
          ></Radio.Group>

          <Text
            style={{
              color: "#1870bc",
              fontSize: 16,
              fontWeight: "bold",
              paddingLeft: 20,
              paddingTop: 20,
            }}
          >
            Mã đăng nhập:
          </Text>
          <InputItem
            clear
            type={typeInput ? "password" : "text"}
            maxLength={8}
            placeholder="Mã đăng nhập"
            style={{ marginLeft: 20, marginRight: 30, borderBottomWidth: 1 }}
            extra={
              <Button onPress={() => setTypeInput(!typeInput)} type="ghost" size="small">
                <FontAwesomeIcon icon={typeInput ? "eye" : "eye-slash"} />
              </Button>
            }
          ></InputItem>
        </Card.Body>
        <View
          style={{
            width: "50%",
            backgroundColor: "primary",
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
            alignSelf: "center",
          }}
        >
          <Button type="primary">
            <FontAwesomeIcon icon="check-circle" color="white" />
            <Text style={{ color: "white", paddingLeft: 10 }}>Đăng nhập</Text>
          </Button>
        </View>
      </Card>
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
