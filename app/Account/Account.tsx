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
  Modal,
} from "@ant-design/react-native";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faCheckSquare,
  faCoffee,
  faTrash,
  faUser,
  faCalendar,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";

import enUS from "@ant-design/react-native/lib/locale-provider/en_US";
import dayjs from "dayjs";

interface Props {
  isShowDeleteButton?: boolean;
}
const Account = ({ isShowDeleteButton = false }: Props) => {
  library.add(faCheckSquare, faCoffee, faTrash, faUser, faCalendar, faEdit);

  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const [isShowDatePicker, setIsShowDatePicker] = useState(false);
  const [valueDatePicker, setValueDatepicker] = useState<any>(
    dayjs(new Date()).format("DD/MM/YYYY")
  );

  return (
    <View
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {isShowDatePicker && (
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
          onChange={(value) =>
            setValueDatepicker(dayjs(value).format("DD/MM/YYYY"))
          }
        ></DatePicker>
      )}

      <WhiteSpace />
      <Card
        style={{
          width: windowWidth - 15,
        }}
      >
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
              <Button
                onPress={() => setIsShowDatePicker(true)}
                style={{ borderColor: "white" }}
              >
                <FontAwesomeIcon icon={["fas", "calendar"]} />
              </Button>
            }
            value={String(valueDatePicker)}
          ></InputItem>
          <InputItem
            clear
            type={"text"}
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
            justifyContent: isShowDeleteButton ? "space-between" : "center",
            paddingHorizontal: 30,
          }}
        >
          {isShowDeleteButton && (
            <Button type="warning">
              <FontAwesomeIcon
                icon={["fas", "trash"]}
                style={{ color: "white" }}
              />
              <Text
                style={{ color: "white", paddingLeft: 10, fontWeight: "600" }}
              >
                Xóa tài khoản
              </Text>
            </Button>
          )}

          <Button type="primary">
            <FontAwesomeIcon
              icon={["fas", "edit"]}
              style={{ color: "white" }}
            />
            <Text
              style={{ color: "white", paddingLeft: 10, fontWeight: "600" }}
            >
              Tạo tài khoản
            </Text>
          </Button>
        </View>
      </Card>
    </View>
  );
};

export default Account;

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
