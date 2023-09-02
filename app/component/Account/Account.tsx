import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import {
  Button,
  WhiteSpace,
  DatePicker,
  Toast,
  WingBlank,
} from "@ant-design/react-native";
import dayjs from "dayjs";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

import { useNavigation } from "@react-navigation/native";

import {
  deleteAItemBabyFromBabyList,
  insertValueBabyToBabyList,
  updateValueOfABabyInBabyList,
} from "../../../api/login/login";
import { stylesInput } from "../../const/styleInput";
import Input from "@ant-design/react-native/lib/input-item/Input";

interface Props {
  isShowDeleteButton?: boolean;
  setIsLoading?: () => void;
  listAccountBaby?: any;
  nameRouteUserId?: number;
}
const Account = ({
  isShowDeleteButton = false,
  setIsLoading,
  listAccountBaby,
  nameRouteUserId,
}: Props) => {
  const navigation = useNavigation();

  const [isNameBaby, setIsNameBaby] = useState("");
  const [isPassword, setIsPassword] = useState("");
  const [valueDatePicker, setValueDatePicker] = useState<any>(
    dayjs(new Date()).format("DD-MM-YYYY")
  );

  const [isNameBabyError, setIsNameBabyError] = useState(false);
  const [isPasswordError, setIsPasswordError] = useState(false);
  const [valueDatePickerError, setValueDatePickerError] = useState(false);

  const [isShowDatePicker, setIsShowDatePicker] = useState(false);

  useEffect(() => {
    if (isShowDeleteButton && nameRouteUserId && listAccountBaby?.length > 0) {
      const idCurrent = listAccountBaby?.find(
        (item) => Number(item.id) === Number(nameRouteUserId)
      );
      if (idCurrent) {
        setIsNameBaby(idCurrent?.nameBaby);
        setIsPassword(idCurrent?.password);
        setValueDatePicker(idCurrent?.birthday);
      }
    }
  }, [isShowDeleteButton, nameRouteUserId, listAccountBaby]);

  return (
    <View
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
      }}
    >
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
          setValueDatePicker(dayjs(value).format("DD-MM-YYYY"))
        }
      ></DatePicker>
      <WhiteSpace />
      <WingBlank>
        <View
          style={isNameBabyError ? stylesInput.inputError : stylesInput.input}
        >
          <Input
            style={stylesInput.inputItem}
            maxLength={50}
            placeholder="Tên em bé"
            onChangeText={(value) => setIsNameBaby(value)}
            value={isNameBaby}
          />
        </View>
        <View
          style={
            valueDatePickerError ? stylesInput.inputError : stylesInput.input
          }
        >
          <Input
            style={stylesInput.inputItem}
            maxLength={11}
            placeholder="Ngày sinh dự kiến"
            value={String(valueDatePicker)}
            onTouchStart={() => setIsShowDatePicker(true)}
            showSoftInputOnFocus={false}
          />
        </View>
        <View
          style={isPasswordError ? stylesInput.inputError : stylesInput.input}
        >
          <Input
            style={stylesInput.inputItem}
            maxLength={6}
            placeholder="Mã đăng nhập"
            onChangeText={(value) => setIsPassword(value)}
            value={isPassword}
            keyboardType="number-pad"
            secureTextEntry
          />
        </View>
      </WingBlank>
      <WhiteSpace />
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
            onPress={async () =>
              await deleteAItemBabyFromBabyList(nameRouteUserId).then(
                (isRes) => {
                  if (isRes) {
                    setIsLoading();
                    Toast.success("Đã xóa thành công!");
                    // @ts-ignore
                    navigation.navigate("Main");
                  } else {
                    Toast.fail("Thất bại!");
                  }
                }
              )
            }
          >
            <FontAwesomeIcon icon={faTrash} style={{ color: "white" }} />
            <Text
              style={{ color: "white", paddingLeft: 10, fontWeight: "600" }}
            >
              Xóa tài khoản
            </Text>
          </Button>
        )}
        <Button
          type="primary"
          onPress={async () => {
            if (String(isNameBaby?.trim()) === "") {
              setIsNameBabyError(true);
            } else {
              setIsNameBabyError(false);
            }

            if (String(isPassword?.trim()) === "") {
              setIsPasswordError(true);
            } else {
              setIsPasswordError(false);
            }

            var dateParts = valueDatePicker.split("-");

            // month is 0-based, that's why we need dataParts[1] - 1
            const dateObject = dayjs(
              new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0])
            );

            if (dateObject <= dayjs(new Date())) {
              setValueDatePickerError(true);
            } else {
              setValueDatePickerError(false);
            }

            const stop =
              String(isNameBaby?.trim()) === "" ||
              String(isPassword?.trim()) === "" ||
              dateObject <= dayjs(new Date());

            if (stop) return;

            if (isShowDeleteButton) {
              await updateValueOfABabyInBabyList(
                isNameBaby,
                valueDatePicker,
                isPassword,
                nameRouteUserId
              ).then((isRes) => {
                if (isRes) {
                  setIsLoading();
                  Toast.success("Đã lưu thành công!");
                  // @ts-ignore
                  navigation.navigate("Main");
                } else {
                  Toast.fail("Thất bại!");
                }
              });
            } else {
              await insertValueBabyToBabyList(
                isNameBaby,
                valueDatePicker,
                isPassword
              ).then((isRes) => {
                if (isRes) {
                  Toast.success("Đã tạo mới thành công!");
                  setIsLoading();
                  // @ts-ignore
                  navigation.navigate("Main");
                } else {
                  Toast.fail("Thất bại!");
                }
              });
            }
          }}
        >
          <FontAwesomeIcon icon={faEdit} style={{ color: "white" }} />
          <Text style={{ color: "white", paddingLeft: 10, fontWeight: "600" }}>
            {isShowDeleteButton ? "Lưu thông tin" : "Tạo tài khoản"}
          </Text>
        </Button>
      </View>
    </View>
  );
};

export default Account;
