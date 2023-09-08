import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  DevSettings,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import {
  Button,
  WhiteSpace,
  DatePicker,
  Toast,
  WingBlank,
  Checkbox,
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
import moment from "moment";
import { importDb } from "../../../api/database";

interface Props {
  isShowDeleteButton?: boolean;
  setIsLoading?: () => void;
  listAccountBaby?: any;
  nameRouteUserId?: number;
  isSetting?: boolean;
}
const Account = ({
  isShowDeleteButton = false,
  setIsLoading,
  listAccountBaby,
  nameRouteUserId,
  isSetting = false,
}: Props) => {
  const navigation = useNavigation();

  const [isNameBaby, setIsNameBaby] = useState("");
  const [isPassword, setIsPassword] = useState("");
  const [valueExpectBirthDay, setValueExpectBirthDay] = useState<any>(
    dayjs(new Date()).format("DD-MM-YYYY")
  );
  const [valueBirthDay, setValueBirthDay] = useState<any>(dayjs(new Date()).format("DD-MM-YYYY"));
  const [isBorn, setIsBorn] = useState(false);

  const [isNameBabyError, setIsNameBabyError] = useState(false);
  const [isPasswordError, setIsPasswordError] = useState(false);
  const [valueExpectBirthdayPickerError, setValueExpectBirthdayPickerError] = useState(false);
  const [valueBirthdayPickerError, setValueBirthdayPickerError] = useState(false);

  const [isShowDatePickerExpectBirthday, setIsShowDatePickerExpectBirthday] = useState(false);
  const [isShowDatePickerBirthday, setIsShowDatePickerBirthday] = useState(false);

  useEffect(() => {
    if (isShowDeleteButton && nameRouteUserId && listAccountBaby?.length > 0) {
      const idCurrent = listAccountBaby?.find(
        (item) => Number(item.id) === Number(nameRouteUserId)
      );
      if (idCurrent) {
        setIsNameBaby(idCurrent?.nameBaby);
        setIsPassword(idCurrent?.password);
        setValueExpectBirthDay(idCurrent?.expectedBirthday);
        setIsBorn(Boolean(idCurrent?.isBorn));
        setValueBirthDay(
          Boolean(idCurrent?.isBorn) ? idCurrent?.birthday : idCurrent?.expectedBirthday
        );
      }
    }
  }, [isShowDeleteButton, nameRouteUserId, listAccountBaby]);

  return (
    <View
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: isSetting ? "white" : "#f2f2f2",
      }}
    >
      <DatePicker
        title="Ngày dự sinh"
        visible={isShowDatePickerExpectBirthday}
        mode="date"
        value={new Date()}
        minDate={new Date()}
        maxDate={new Date(moment().add(300, "day").format())}
        format="YYYY-MM-DD"
        okText="Chọn"
        dismissText="Thoát"
        onOk={() => setIsShowDatePickerExpectBirthday(false)}
        onDismiss={() => setIsShowDatePickerExpectBirthday(false)}
        onChange={(value) => {
          setValueExpectBirthDay(dayjs(value).format("DD-MM-YYYY"));
          !isBorn && setValueBirthDay(dayjs(value).format("DD-MM-YYYY"));
        }}
      ></DatePicker>
      <WhiteSpace />
      <DatePicker
        title="Ngày sinh nhật"
        visible={isShowDatePickerBirthday}
        mode="date"
        value={new Date()}
        minDate={new Date(moment().subtract(300, "day").format())}
        maxDate={new Date()}
        format="YYYY-MM-DD"
        okText="Chọn"
        dismissText="Thoát"
        onOk={() => setIsShowDatePickerBirthday(false)}
        onDismiss={() => setIsShowDatePickerBirthday(false)}
        onChange={(value) => {
          setValueBirthDay(dayjs(value).format("DD-MM-YYYY"));
        }}
      ></DatePicker>
      <WhiteSpace />
      <WingBlank>
        <View style={isNameBabyError ? stylesInput.inputError : stylesInput.input}>
          <Input
            style={stylesInput.inputItem}
            maxLength={50}
            placeholder="Tên em bé"
            onChangeText={(value) => setIsNameBaby(value)}
            value={isNameBaby}
          />
        </View>
        <KeyboardAvoidingView>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View
              style={valueExpectBirthdayPickerError ? stylesInput.inputError : stylesInput.input}
            >
              <Input
                style={stylesInput.inputItem}
                maxLength={11}
                placeholder="Ngày sinh dự kiến"
                value={String(valueExpectBirthDay)}
                onTouchStart={() => {
                  setIsShowDatePickerExpectBirthday(true);
                  Keyboard.dismiss();
                }}
                showSoftInputOnFocus={false}
              />
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
        <View style={isPasswordError ? stylesInput.inputError : stylesInput.input}>
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
        {isShowDeleteButton && (
          <View>
            <View>
              <KeyboardAvoidingView>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                  <View style={{ display: "flex", flexDirection: "row", marginTop: 10 }}>
                    <Checkbox
                      checked={isBorn}
                      onChange={(value) => {
                        setIsBorn(value?.target?.checked);
                        setValueBirthDay(dayjs(new Date()).format("DD-MM-YYYY"));
                      }}
                    />
                    <Text
                      style={{
                        textAlign: "center",
                        fontSize: 14,
                        fontWeight: "bold",
                        textAlignVertical: "center",
                      }}
                    >
                      Đã sinh:
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              </KeyboardAvoidingView>
            </View>
            {isBorn && (
              <View style={valueBirthdayPickerError ? stylesInput.inputError : stylesInput.input}>
                <Input
                  style={stylesInput.inputItem}
                  maxLength={11}
                  placeholder="Ngày sinh nhật"
                  value={isBorn ? String(valueBirthDay) : String(valueExpectBirthDay)}
                  onTouchStart={() => {
                    setIsShowDatePickerBirthday(true);
                    Keyboard.dismiss();
                  }}
                  showSoftInputOnFocus={false}
                />
              </View>
            )}
          </View>
        )}
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
              await deleteAItemBabyFromBabyList(nameRouteUserId).then((isRes) => {
                if (isRes) {
                  setIsLoading();
                  Toast.success("Đã xóa thành công! \n\r Vui lòng đăng nhập lại.");
                  DevSettings.reload();
                } else {
                  Toast.fail("Thất bại!");
                }
              })
            }
          >
            <FontAwesomeIcon icon={faTrash} style={{ color: "white" }} />
            <Text style={{ color: "white", paddingLeft: 10, fontWeight: "600" }}>
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

            if (isBorn && String(valueBirthDay)?.trim() === "") {
              setValueBirthdayPickerError(true);
            } else {
              setValueBirthdayPickerError(false);
            }

            var dateParts = valueExpectBirthDay.split("-");

            // month is 0-based, that's why we need dataParts[1] - 1
            const dateObjectExpectBirthday = dayjs(
              new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0])
            );

            if (dateObjectExpectBirthday <= dayjs(new Date())) {
              setValueExpectBirthdayPickerError(true);
            } else {
              setValueExpectBirthdayPickerError(false);
            }

            const stop =
              String(isNameBaby?.trim()) === "" ||
              String(isPassword?.trim()) === "" ||
              dateObjectExpectBirthday <= dayjs(new Date()) ||
              (isBorn && String(valueBirthDay)?.trim() === "");

            if (stop) return Toast.fail("Vui lòng nhập đầy đủ và kiểm tra lại thông tin!");

            if (isShowDeleteButton) {
              await updateValueOfABabyInBabyList(
                isNameBaby,
                valueExpectBirthDay,
                valueBirthDay,
                isPassword,
                isBorn,
                nameRouteUserId
              ).then((isRes) => {
                if (isRes) {
                  setIsLoading();
                  Toast.info("Đã lưu thay đổi thành công.\n\rVui lòng đăng nhập lại!", 3);
                  // @ts-ignore
                  navigation.navigate("Main");
                } else {
                  Toast.fail("Thất bại!");
                }
              });
            } else {
              await insertValueBabyToBabyList(
                isNameBaby,
                valueExpectBirthDay,
                valueExpectBirthDay,
                isPassword,
                false
              ).then((isRes) => {
                if (isRes) {
                  Toast.success("Đã tạo mới thành công!", 1);
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
        {isSetting && <WhiteSpace size="xl" />}
        <WhiteSpace />
      </View>
      <WhiteSpace />
      <WhiteSpace />
      {!isSetting && (
        // @ts-ignore
        <View onTouchStart={() => importDb().then(() => navigation.navigate("Main"))}>
          <Text>Sử dụng dữ liệu có sẵn</Text>
        </View>
      )}
    </View>
  );
};

export default Account;
