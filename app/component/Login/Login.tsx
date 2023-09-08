import React, { useEffect, useMemo, useState } from "react";
import { View, Text, Dimensions, KeyboardAvoidingView } from "react-native";
import { Radio, Button, WhiteSpace, Toast, WingBlank } from "@ant-design/react-native";

import { useNavigation } from "@react-navigation/native";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faEye, faEyeSlash, faUser } from "@fortawesome/free-solid-svg-icons";

import { stylesInput } from "../../const/styleInput";
import Input from "@ant-design/react-native/lib/input-item/Input";
import { createProcessEventTable } from "../../../api/eventProcess/event";
import dayjs from "dayjs";
import { Asset } from "expo-asset";
import { createProcessLineTable } from "../../../api/eventProcess/process line";
import { imageBase64Default } from "../../const/type";

interface Props {
  listAccountBaby: any;
}
const Login = ({ listAccountBaby }: Props) => {
  const RadioItem = Radio.RadioItem;
  const navigation = useNavigation();
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  const [userId, setUserId] = useState(0);
  const [passwordInput, setPasswordInput] = useState("");

  const [typeInput, setTypeInput] = useState(true);

  const handleLogin = async () => {
    if (listAccountBaby && listAccountBaby?.length > 0) {
      const isHasAccount = listAccountBaby.some(
        (item) => +item.id === +userId && String(item.password) === String(passwordInput)
      );
      const isAccount = listAccountBaby.find(
        (item) => +item.id === +userId && String(item.password) === String(passwordInput)
      );

      if (isHasAccount) {
        var datePartsExpectedBirthday = isAccount?.expectedBirthday?.split("-");

        // month is 0-based, that's why we need dataParts[1] - 1
        const dateObjectExpectedBirthday = dayjs(
          new Date(
            +datePartsExpectedBirthday[2],
            datePartsExpectedBirthday[1] - 1,
            +datePartsExpectedBirthday[0]
          )
        ).format("DD-MM-YYYY");

        const dateObjectFirstDay = dayjs(
          new Date(
            +datePartsExpectedBirthday[2],
            datePartsExpectedBirthday[1] - 1,
            +datePartsExpectedBirthday[0]
          )
        )
          .subtract(280, "days")
          .format("DD-MM-YYYY");

        const imageDefault = [
          {
            assetId: null,
            base64: String(imageBase64Default),
            type: "image",
            duration: null,
            exif: null,
            height: 512,
            rotation: null,
            uri: `data:image/png;base64,${imageBase64Default}`,
            width: 512,
          },
        ];

        createProcessEventTable(isAccount.id, String(dateObjectFirstDay), imageDefault);
        createProcessLineTable(
          isAccount.id,
          String(dateObjectFirstDay),
          String(dateObjectExpectedBirthday)
        );
        setTimeout(() => {
          // @ts-ignore
          userId && navigation.navigate("Home", { userId: Number(userId) });
        }, 200);
      } else {
        Toast.fail("Sai mã đăng nhập!");
      }
    }
  };

  useEffect(() => {
    setUserId(0);
    setPasswordInput("");
    setTypeInput(true);
  }, []);

  return (
    <View
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f2f2f2",
        width: windowWidth,
      }}
    >
      <WingBlank>
        <Text
          style={{
            color: "#1870bc",
            fontSize: 16,
            fontWeight: "bold",
          }}
        >
          Tài khoản:
        </Text>
        <Radio.Group
          style={{
            width: windowWidth - 50,
            borderRadius: 20,
            backgroundColor: "#f2f2f2",
          }}
          onChange={(e) => setUserId(Number(e?.target?.value))}
        >
          {listAccountBaby &&
            listAccountBaby?.map((item, index) => (
              <RadioItem
                key={item.id}
                value={item.id}
                style={{
                  backgroundColor: "#f2f2f2",
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: "#dadada",
                  marginTop: 5,
                }}
              >
                <FontAwesomeIcon icon={faUser} color="#4294ff" />
                <Text
                  style={{
                    height: "100%",
                    textAlignVertical: "center",
                    fontSize: 14,
                    fontWeight: "600",
                  }}
                >
                  {item?.nameBaby}
                </Text>
              </RadioItem>
            ))}
        </Radio.Group>
      </WingBlank>
      <WhiteSpace />
      <WingBlank>
        <Text
          style={{
            color: "#1870bc",
            fontSize: 16,
            fontWeight: "bold",
          }}
        >
          Mã đăng nhập:
        </Text>
        <View style={stylesInput.input}>
          <Input
            style={{ width: "90%", height: "110%" }}
            maxLength={6}
            placeholder="Mã đăng nhập"
            onChangeText={(value) => setPasswordInput(value)}
            keyboardType="number-pad"
            secureTextEntry
          />
          <View onTouchStart={() => setTypeInput(!typeInput)} style={{ marginTop: 5 }}>
            <FontAwesomeIcon icon={typeInput ? faEye : faEyeSlash} />
          </View>
        </View>
      </WingBlank>
      <WhiteSpace />
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
          <FontAwesomeIcon icon={faUser} style={{ color: "white" }} size={20} />
          <Text style={{ color: "white", paddingLeft: 10 }}>Đăng nhập</Text>
        </Button>
      </View>
    </View>
  );
};

export default Login;
