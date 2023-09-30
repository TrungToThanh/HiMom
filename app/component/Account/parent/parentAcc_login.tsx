import React, { useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";
import { FbAccParentLogin } from "../../../../api/firebase/parrent/account";

const ParentAccLogin = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    FbAccParentLogin(name, password).then((isHasAcc) => {
      if (isHasAcc) {
        console.log("OK");
      } else {
        Alert.alert("Đăng nhập", "Tên tài khoản hoặc mã đăng nhập không đúng!");
      }
    });
  };
  return (
    <View>
      <TextInput
        style={styles.input}
        clearButtonMode="always"
        placeholder="Tên tài khoản"
        onChangeText={(value) => setName(value?.trim())}
      />
      <TextInput
        style={styles.input}
        placeholder="Mật khẩu"
        secureTextEntry={true}
        onChangeText={(value) => setPassword(value?.trim())}
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
