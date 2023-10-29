import _ from "lodash";
import dayjs from "dayjs";
import React, { useState } from "react";
import { Button, Checkbox, DatePicker, Toast, View } from "@ant-design/react-native";
import { Alert, Keyboard, StyleSheet, Text, TextInput } from "react-native";

import { FbAccBabyCreate } from "../../../../api/firebase/account/baby/create";
import moment from "moment";

type Props = {
  setIsLogin: () => void;
  accountParentId: any;
};

const BabyAccCreate = ({ accountParentId, setIsLogin }: Props) => {
  const [isBorn, setIsBorn] = useState(false);
  const [nameBabyUser, setNameBabyUser] = useState("");
  const [passwordBabyUser, setPasswordBabyUser] = useState("");
  const [relationShip, setRelationShip] = useState("");
  const [expectBirthdayBaby, setExpectBirthdayBaby] = useState(
    dayjs(new Date()).format("DD-MM-YYYY")
  );

  const [isShowDatePicker, setIsShowDatePicker] = useState(false);

  const handleCreateAcc = () => {
    const isError = !nameBabyUser || !passwordBabyUser || !expectBirthdayBaby;
    if (isError) {
      Toast.fail("Vui lòng kiểm tra và nhập đầy đủ thông tin!");
      return;
    }

    FbAccBabyCreate({
      isBorn: isBorn,
      nameBaby: nameBabyUser,
      passwordBaby: passwordBabyUser,
      isParentCreate: _.isObject(accountParentId)
        ? accountParentId.accountParentId
        : accountParentId,
      expectBirthdayBaby: expectBirthdayBaby,
      relationShip: relationShip,
    }).then((isSuccess) => {
      if (isSuccess) setIsLogin();
    });
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
      <TextInput
        style={styles.input}
        clearButtonMode="always"
        placeholder="Mối quan hệ"
        onChangeText={(value) => setRelationShip(value?.trim())}
      />
      <Checkbox style={styles.checkbox} onChange={(value) => setIsBorn(value.target.checked)}>
        Đã sinh
      </Checkbox>
      <TextInput
        style={styles.input}
        placeholder={isBorn ? "Ngày sinh nhật" : "Ngày dự sinh"}
        onTouchStart={() => {
          setIsShowDatePicker(true);
          Keyboard.dismiss();
        }}
        showSoftInputOnFocus={false}
        value={expectBirthdayBaby}
      />

      <DatePicker
        title={isBorn ? "Ngày sinh nhật" : "Ngày dự sinh"}
        visible={isShowDatePicker}
        mode="date"
        value={new Date(expectBirthdayBaby)}
        minDate={new Date()}
        maxDate={new Date(moment().add(300, "day").format())}
        format="YYYY-MM-DD"
        okText="Chọn"
        dismissText="Thoát"
        onOk={() => setIsShowDatePicker(false)}
        onDismiss={() => setIsShowDatePicker(false)}
        onChange={(value) => {
          setExpectBirthdayBaby;
          setExpectBirthdayBaby(dayjs(value).format("DD-MM-YYYY"));
        }}
      ></DatePicker>
      <View style={{ padding: 20 }}>
        <Button onPress={() => handleCreateAcc()}> Tạo tài khoản</Button>
      </View>
    </View>
  );
};

export default BabyAccCreate;
const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
  checkbox: {
    height: 40,
    padding: 10,
  },
});
