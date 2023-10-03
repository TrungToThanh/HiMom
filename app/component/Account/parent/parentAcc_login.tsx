import React, { useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";

import { Toast } from "@ant-design/react-native";
import { useNavigation } from "@react-navigation/native";
import { FbAccParentLogin } from "../../../../api/firebase/account/parrent/login";
import { isParentType } from "../../../const/default-type";

const ParentAccLogin = () => {
  const navigation = useNavigation();

  const [nameParentUser, setNameParentUser] = useState("");
  const [passwordParentUser, setPasswordParentUser] = useState("");

  const handleLogin = () => {
    if (!nameParentUser || !passwordParentUser) {
      Toast.fail("Vui lòng kiểm tra và nhập đầy đủ thông tin!");
      return;
    }

    FbAccParentLogin(nameParentUser, passwordParentUser).then((acc?: isParentType) => {
      if (acc) {
        //@ts-ignore
        navigation.navigate("BabyAcc", {
          accountParentId: acc.uniqueId,
          accountBabyOfParent: acc.account,
        });
      }
    });
  };
  return (
    <View>
      <TextInput
        style={styles.input}
        clearButtonMode="always"
        placeholder="Tên tài khoản"
        onChangeText={(value) => setNameParentUser(value?.trim())}
      />
      <TextInput
        style={styles.input}
        placeholder="Mật khẩu"
        secureTextEntry={true}
        onChangeText={(value) => setPasswordParentUser(value?.trim())}
      />
      <View style={{ padding: 20 }}>
        <Button onPress={() => handleLogin()} title="Đăng nhập" />
      </View>
    </View>
  );
};

export default ParentAccLogin;

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
});
