import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
import { Button, InputItem, Card, WhiteSpace, DatePicker, Toast } from "@ant-design/react-native";

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

import dayjs from "dayjs";
import {
  deleteAItemBabyFromBabyList,
  insertValueBabyToBabyList,
  updateValueOfABabyInBabyList,
} from "../../../api/login/login";
import CardHeader from "@ant-design/react-native/lib/card/CardHeader";
import { useNavigation } from "@react-navigation/native";

interface Props {
  isShowDeleteButton?: boolean;
  setIsLoading: () => void;
  listAccountBaby?: any;
  nameRouteUserId?: number;
}
const Account = ({
  isShowDeleteButton = false,
  setIsLoading,
  listAccountBaby,
  nameRouteUserId,
}: Props) => {
  library.add(faCheckSquare, faCoffee, faTrash, faUser, faCalendar, faEdit);

  const [isNameBaby, setIsNameBaby] = useState("");
  const [isPassword, setIsPassword] = useState("");
  const navigation = useNavigation();

  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  const [isShowDatePicker, setIsShowDatePicker] = useState(false);
  const [valueDatePicker, setValueDatePicker] = useState<any>(
    dayjs(new Date()).format("DD-MM-YYYY")
  );
  useEffect(() => {
    if (isShowDeleteButton && nameRouteUserId && listAccountBaby?.length > 0) {
      const idCurrent = listAccountBaby?.find(
        (item) => Number(item.id) === Number(nameRouteUserId)
      );
      console.log("idCurrent", idCurrent);
      if (idCurrent) {
        setIsNameBaby(idCurrent?.nameBaby);
        setIsPassword(idCurrent?.password);
        setValueDatePicker(idCurrent?.birthday);
      }
    }
  }, [isShowDeleteButton, nameRouteUserId, listAccountBaby]);
  console.log("nameRouteUserId", nameRouteUserId, listAccountBaby);
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
          onChange={(value) => setValueDatePicker(dayjs(value).format("DD-MM-YYYY"))}
        ></DatePicker>
      )}

      <WhiteSpace />

      <Card
        style={{
          width: windowWidth - 15,
        }}
      >
        <CardHeader
          title={
            <Text style={{ color: "#1870bc", fontSize: 16, fontWeight: "bold" }}>
              Thông tin tài khoản:
            </Text>
          }
        ></CardHeader>
        <Card.Body>
          <InputItem
            clear
            maxLength={50}
            placeholder="Tên em bé"
            style={{ marginLeft: 20, marginRight: 50, borderBottomWidth: 1 }}
            onChangeText={(value) => setIsNameBaby(value)}
            value={isNameBaby}
          ></InputItem>
          <InputItem
            editable={false}
            placeholder="Ngày sinh dự kiến"
            style={{ marginLeft: 20, borderBottomWidth: 1 }}
            extra={
              <Button onPress={() => setIsShowDatePicker(true)} style={{ borderColor: "white" }}>
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
            onChangeText={(value) => setIsPassword(value)}
            value={isPassword}
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
            <Button
              type="warning"
              onPress={() =>
                deleteAItemBabyFromBabyList(nameRouteUserId).then((isRes) => {
                  if (isRes) {
                    Toast.success("Đã xóa thành công!");
                    setIsLoading();
                    // @ts-ignore
                    navigation.navigate("Main");
                  } else {
                    Toast.fail("Thất bại!");
                  }
                })
              }
            >
              <FontAwesomeIcon icon={["fas", "trash"]} style={{ color: "white" }} />
              <Text style={{ color: "white", paddingLeft: 10, fontWeight: "600" }}>
                Xóa tài khoản
              </Text>
            </Button>
          )}

          <Button
            type="primary"
            onPress={() => {
              if (isShowDeleteButton) {
                updateValueOfABabyInBabyList(
                  isNameBaby,
                  valueDatePicker,
                  isPassword,
                  nameRouteUserId
                ).then((isRes) => {
                  if (isRes) {
                    Toast.success("Đã lưu thành công!");
                    setIsLoading();
                    // @ts-ignore
                    navigation.navigate("Main");
                    navigation.reset;
                  } else {
                    Toast.fail("Thất bại!");
                  }
                });
              } else {
                insertValueBabyToBabyList(isNameBaby, valueDatePicker, isPassword).then((isRes) => {
                  if (isRes) {
                    Toast.success("Đã tạo mới thành công!");
                    setIsLoading();
                    // @ts-ignore
                    navigation.navigate("Main");
                    navigation.reset;
                  } else {
                    Toast.fail("Thất bại!");
                  }
                });
              }
            }}
          >
            <FontAwesomeIcon icon={["fas", "edit"]} style={{ color: "white" }} />
            <Text style={{ color: "white", paddingLeft: 10, fontWeight: "600" }}>
              {isShowDeleteButton ? "Lưu thông tin" : "Tạo tài khoản"}
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
