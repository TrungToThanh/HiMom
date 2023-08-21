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
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCheckSquare,
  faEye,
  faEyeSlash,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

export default function Login() {
  library.add(faCheckSquare, faEye, faEyeSlash, faUser);

  const RadioItem = Radio.RadioItem;
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const [typeInput, setTypeInput] = useState(true);

  const options = [
    {
      label: (
        <View>
          <Text>Account 1</Text>
        </View>
      ),
      value: "1",
    },
    {
      label: (
        <View>
          <Text>Account 1</Text>
        </View>
      ),
      value: "2",
    },
  ];

  return (
    <View
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <WhiteSpace />
      <Card
        style={{
          width: windowWidth - 15,
        }}
      >
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
            textAlign="center"
            type={typeInput ? "password" : "text"}
            maxLength={8}
            placeholder="Mã đăng nhập"
            style={{ marginLeft: 20, marginRight: 30, borderBottomWidth: 1 }}
            extra={
              <Button
                onPress={() => setTypeInput(!typeInput)}
                type="ghost"
                size="small"
              >
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
            <FontAwesomeIcon
              icon={["fas", "user"]}
              style={{ color: "white" }}
              size={20}
            />
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
