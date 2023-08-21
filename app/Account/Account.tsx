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
  Provider,
  DatePicker,
  DatePickerView,
} from "@ant-design/react-native";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import enUS from "@ant-design/react-native/lib/locale-provider/en_US";

export default function Account() {
  const RadioItem = Radio.RadioItem;
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const [typeInput, setTypeInput] = useState(true);
  const [isShowDatePicker, setIsShowDatePicker] = useState(false);
  const [valueDatePicker, setValueDatepicker] = useState<any>();

  const options = [
    {
      label: (
        <View>
          <Text>
            <FontAwesomeIcon icon="male" />
            Account 1
          </Text>
        </View>
      ),
      value: "1",
    },
    {
      label: (
        <View>
          <Text>
            <FontAwesomeIcon icon="male" />
            Account 1
          </Text>
        </View>
      ),
      value: "2",
    },
  ];

  return (
    <View style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      {isShowDatePicker && (
        <Provider locale={enUS}>
          <DatePicker
            visible={isShowDatePicker}
            mode="date"
            value={new Date()}
            minDate={new Date(2015, 7, 6)}
            maxDate={new Date(2026, 11, 3)}
            format="YYYY-MM-DD"
            okText="Chọn"
            dismissText="Thoát"
            onOk={() => setIsShowDatePicker(false)}
            onDismiss={() => setIsShowDatePicker(false)}
            onChange={(value) => setValueDatepicker(value)}
          >
            <Text> 22323 </Text>
          </DatePicker>
        </Provider>
      )}
      <View
        style={{
          height: windowHeight / 4,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Image
          style={styles.tinyLogo}
          source={{
            uri: "https://reactnative.dev/img/tiny_logo.png",
          }}
        />
      </View>

      <WhiteSpace />
      <Card
        style={{
          width: windowWidth - 15,
        }}
      >
        <Card.Header
          title={
            <Text style={{ color: "#1870bc", fontSize: 18, fontWeight: "bold" }}>
              Thông tin tài khoản
            </Text>
          }
          thumbStyle={{ width: 30, height: 30 }}
          thumb="https://gw.alipayobjects.com/zos/rmsportal/MRhHctKOineMbKAZslML.jpg"
          style={{}}
        />
        <Card.Body>
          <InputItem
            clear
            maxLength={50}
            placeholder="Tên em bé"
            style={{ marginLeft: 20, marginRight: 50, borderBottomWidth: 1 }}
          ></InputItem>
          <InputItem
            editable={false}
            placeholder="Ngày sinh dự kiến"
            style={{ marginLeft: 20, borderBottomWidth: 1 }}
            extra={
              <Button onPress={() => setIsShowDatePicker(true)} style={{ borderColor: "white" }}>
                <FontAwesomeIcon icon={"calendar"} />
              </Button>
            }
            value={String(valueDatePicker)}
          ></InputItem>
          <InputItem
            clear
            type={typeInput ? "password" : "text"}
            maxLength={8}
            placeholder="Mã đăng nhập"
            style={{ marginLeft: 20, borderBottomWidth: 1, marginRight: 50 }}
          ></InputItem>
        </Card.Body>
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            paddingHorizontal: 30,
          }}
        >
          <Button type="warning">
            <FontAwesomeIcon icon="trash" color="white" />
            <Text style={{ color: "white", paddingLeft: 10, fontWeight: "600" }}>
              Xóa tài khoản
            </Text>
          </Button>
          <Button type="primary">
            <FontAwesomeIcon icon="user-circle" color="white" />
            <Text style={{ color: "white", paddingLeft: 10, fontWeight: "600" }}>
              Tạo tài khoản
            </Text>
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
