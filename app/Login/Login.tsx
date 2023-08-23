import React, { useMemo, useState } from "react";
import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
import {
  Radio,
  Button,
  InputItem,
  Card,
  WhiteSpace,
  Toast,
} from "@ant-design/react-native";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCheckSquare, faEye, faEyeSlash, faUser } from "@fortawesome/free-solid-svg-icons";

interface Props {
  listAccountBaby: any;
}
const Login = ({ listAccountBaby }: Props) => {
  const [userId, setUserId] = useState(0);
  const [passwordInput, setPasswordInput] = useState("");

  library.add(faCheckSquare, faEye, faEyeSlash, faUser);

  const RadioItem = Radio.RadioItem;
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const [typeInput, setTypeInput] = useState(true);

  const handleLogin = () => {
    console.log(userId, passwordInput);
    if (listAccountBaby && listAccountBaby?.length > 0) {
      const isHasAccount = listAccountBaby.some(
        (item) => +item.id === +userId && String(item.password) === String(passwordInput)
      );
      if (isHasAccount) {
        console.log("OK");
      } else {
        console.log("NOT OK");
        Toast.fail("Không tìm thấy tài khoản!");
      }
    }
  };
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
            onChange={(e) => setUserId(Number(e?.target?.value))}
          >
            {listAccountBaby &&
              listAccountBaby?.map((item, index) => (
                <RadioItem key={item.id} value={item.id}>
                  <Text>
                    {index + 1}. {item?.nameBaby}
                  </Text>
                </RadioItem>
              ))}
          </Radio.Group>

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
              <Button onPress={() => setTypeInput(!typeInput)} type="ghost" size="small">
                <FontAwesomeIcon icon={typeInput ? "eye" : "eye-slash"} />
              </Button>
            }
            onChangeText={(value) => setPasswordInput(value)}
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
          <Button
            type="primary"
            onPress={() => handleLogin()}
            disabled={!listAccountBaby || listAccountBaby?.length < 1}
          >
            <FontAwesomeIcon icon={["fas", "user"]} style={{ color: "white" }} size={20} />
            <Text style={{ color: "white", paddingLeft: 10 }}>Đăng nhập</Text>
          </Button>
        </View>
      </Card>
    </View>
  );
};

export default Login;

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
