import React, { useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";
import { Toast } from "@ant-design/react-native";
import { FbAccBabyLogin } from "../../../../api/firebase/account/baby/login";

const BabyAccLogin = () => {
  const [nameBabyUser, setNameBabyUser] = useState("");
  const [passwordBabyUser, setPasswordBabyUser] = useState("");

  const handleLogin = () => {
    const isError = !nameBabyUser || !passwordBabyUser;
    if (isError) {
      Toast.fail("Vui lòng kiểm tra và nhập đầy đủ thông tin!");
      return;
    }
    FbAccBabyLogin(nameBabyUser, passwordBabyUser);
  };
  return (
    <View>
      <TextInput
        style={styles.input}
        clearButtonMode="always"
        placeholder="Tên tài khoản"
        onChangeText={(value) => setNameBabyUser(value?.trim())}
      />
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
