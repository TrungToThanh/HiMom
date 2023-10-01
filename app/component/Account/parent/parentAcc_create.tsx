import React, { useState } from "react";
import { StyleSheet, TextInput } from "react-native";
import { Button, Toast, View } from "@ant-design/react-native";
import { FbAccParentCreate } from "../../../../api/firebase/account/parrent/create";

type Props = {
  setIsLogin: () => void;
};
const ParentAccCreate = ({ setIsLogin }: Props) => {
  const [nameParentUser, setNameParentUser] = useState("");
  const [passwordParentUser, setPasswordParentUser] = useState("");

  const handleCreateAcc = () => {
    if (!nameParentUser || !passwordParentUser) {
      Toast.fail("Vui lòng kiểm tra và nhập đầy đủ thông tin!");
      return;
    }

    FbAccParentCreate(nameParentUser, passwordParentUser).then((isSuccess) => {
      if (isSuccess) setIsLogin();
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
