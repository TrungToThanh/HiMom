import React, { useState } from "react";
import { Alert, StyleSheet, Text, TextInput } from "react-native";
import { Button, View } from "@ant-design/react-native";
import { FbAccParentCreate } from "../../../../api/firebase/parrent/account";

const ParentAccCreate = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleCreateAcc = () => {
    FbAccParentCreate(name, password).then((isHasAcc) => {
      console.log("OK");
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
        <Button onPress={() => handleCreateAcc()}> Tạo tài khoản</Button>
      </View>
    </View>
  );
};

export default ParentAccCreate;
const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
});
