import _ from "lodash";
import React, { useState } from "react";
import {
  Alert,
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
  useWindowDimensions,
} from "react-native";
import { Radio, Toast } from "@ant-design/react-native";
import { FbAccBabyLogin } from "../../../../api/firebase/account/baby/login";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useNavigation } from "@react-navigation/native";

type Props = {
  listAccBabyOfParent: any;
  accountParentId: any;
};

const BabyAccLogin = ({ listAccBabyOfParent, accountParentId }: Props) => {
  const RadioItem = Radio.RadioItem;
  const navigation = useNavigation();
  const { width } = useWindowDimensions();

  const [nameBabyUser, setNameBabyUser] = useState("");
  const [passwordBabyUser, setPasswordBabyUser] = useState("");
  const [uniqueIdBaby, setUniqueIdBaby] = useState("");

  const handleLogin = () => {
    const isError = !nameBabyUser || !passwordBabyUser;
    if (isError) {
      Toast.fail("Vui lòng kiểm tra và nhập đầy đủ thông tin!");
      return;
    }
    FbAccBabyLogin(uniqueIdBaby, nameBabyUser, passwordBabyUser).then((isSuccess) => {
      if (isSuccess) {
        //@ts-ignore
        navigation.navigate("Home", {
          accountParentId: accountParentId,
          accountBabyId: uniqueIdBaby,
        });
      }
    });
  };

  const listAccountBaby = Object?.values(listAccBabyOfParent) || undefined;

  return (
    <View>
      <Radio.Group
        style={{
          width: width - 20,
          borderRadius: 20,
          paddingHorizontal: 10,
          backgroundColor: "#f2f2f2",
        }}
      >
        {listAccountBaby &&
          listAccountBaby?.map((item: { uniqueIdBaby: string; nameAccount: string }, index) => (
            <RadioItem
              key={index}
              value={item.uniqueIdBaby}
              style={{
                backgroundColor: "#f2f2f2",
                borderRadius: 10,
                borderWidth: 1,
                borderColor: "#dadada",
                marginTop: 5,
              }}
              onChange={() => {
                setUniqueIdBaby(item.uniqueIdBaby), setNameBabyUser(item.nameAccount);
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
                {item.nameAccount}
              </Text>
            </RadioItem>
          ))}
        {!listAccountBaby && <Text>Vui lòng tạo tài khoản</Text>}
      </Radio.Group>
      <TextInput
        style={styles.input}
        placeholder="Mật khẩu"
        secureTextEntry={true}
        onChangeText={(value) => setPasswordBabyUser(value?.trim())}
      />
      <View style={{ padding: 20 }}>
        <Button onPress={() => handleLogin()} title="Đăng nhập" />
      </View>
    </View>
  );
};

export default BabyAccLogin;

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
});
