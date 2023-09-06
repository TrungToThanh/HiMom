import React, { useEffect, useState } from "react";
import dayjs from "dayjs";

import { StyleSheet, useWindowDimensions, KeyboardAvoidingView, Keyboard } from "react-native";

import {
  Modal,
  View,
  Text,
  DatePicker,
  WhiteSpace,
  Toast,
  Checkbox,
} from "@ant-design/react-native";
import Input from "@ant-design/react-native/lib/input-item/Input";
import { updateEventProcessLine } from "../../../../api/eventProcess/process line";

interface Props {
  isDisplayModalAddEventProcessLine?: boolean;
  setDisplayModalAddEventProcessLine?: () => void;
  setLoadingAgain: (value) => void;
  nameRouteUserId: number;
  isFirstDate: any;
  isExpectedBirthDay: any;
  isBirthDay: any;
  isBorn: boolean;
  listEventProcessLine: any;
}
const ModalAddProcessLine = ({
  isDisplayModalAddEventProcessLine = false,
  setDisplayModalAddEventProcessLine,
  setLoadingAgain,
  nameRouteUserId,
  isFirstDate,
  isExpectedBirthDay,
  isBirthDay,
  isBorn = false,
  listEventProcessLine,
}: Props) => {
  const { width, height } = useWindowDimensions();

  const [isShowDatePicker1, setIsShowDatePicker1] = useState(false);

  const [nameEvent1, setNameEvent1] = useState("");
  const [dateEvent1, setDateEvent1] = useState("");

  const [nameEvent2, setNameEvent2] = useState("");

  const [isShowDatePicker3, setIsShowDatePicker3] = useState(false);
  const [nameEvent3, setNameEvent3] = useState("");
  const [dateEvent3, setDateEvent3] = useState("");

  useEffect(() => {
    if (listEventProcessLine?.length > 0) {
      setNameEvent1(listEventProcessLine?.at(0).eventFirst);
      setNameEvent2(listEventProcessLine?.at(0).eventSecond);
      setNameEvent3(listEventProcessLine?.at(0).eventThree);

      setDateEvent1(listEventProcessLine?.at(0).dateFirst);
      setDateEvent3(listEventProcessLine?.at(0).dateThree);

      setIsShowDatePicker1(false);
      setIsShowDatePicker3(false);
    }
  }, [listEventProcessLine]);

  const handleUpdateEventProcessLine = () => {
    const stop =
      nameEvent1?.trim() === "" ||
      nameEvent2?.trim() === "" ||
      nameEvent2?.trim() === "" ||
      dateEvent1?.trim() === "" ||
      dateEvent3?.trim() === "";

    if (stop) return;

    updateEventProcessLine(
      nameRouteUserId,
      nameEvent1,
      dateEvent1,
      nameEvent2,
      "",
      nameEvent3,
      dateEvent3
    ).then((isRes) => {
      setLoadingAgain(true);
      setTimeout(() => {
        setLoadingAgain(false);
      }, 500);
      if (isRes) {
        Toast.success("Cập nhập thành công!");
        setDisplayModalAddEventProcessLine();
      } else {
        Toast.fail("Cập nhập thất bại!");
      }
    });
  };
  const styles = StyleSheet.create({
    input: {
      flexDirection: "row",
      padding: 5,
      borderWidth: 1,
      borderColor: "#1870bc",
      borderRadius: 10,
      width: width - 30,
      marginTop: 10,
    },
    inputError: {
      flexDirection: "row",
      padding: 5,
      borderWidth: 2,
      borderColor: "red",
      borderRadius: 10,
      width: width - 30,
      marginTop: 10,
    },
    inputItem: {
      width: width - 35,
      fontSize: 14,
      fontWeight: "600",
    },
    inputItemError: {
      width: width - 35,
      fontSize: 14,
      fontWeight: "600",
      color: "red",
      borderBottomWidth: 1,
      borderColor: "red",
    },
  });

  return (
    <View>
      <Modal
        style={{
          width: width - 10,
        }}
        visible={isDisplayModalAddEventProcessLine}
        transparent
        animationType="fade"
        title={
          <View
            style={{
              width: width - 10,
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
              alignItems: "center",
              alignSelf: "center",
              textAlign: "center",
            }}
          >
            <Text style={{ color: "#1870bc", fontSize: 16, fontWeight: "bold" }}>Thêm sự kiện</Text>
          </View>
        }
        footer={[
          {
            text: "Thoát",
            onPress: () => setDisplayModalAddEventProcessLine(),
            style: "cancel",
          },
          {
            text: "Thêm",
            onPress: () => {
              handleUpdateEventProcessLine();
            },
          },
        ]}
      >
        <View style={{ width: width - 30, paddingTop: 10 }}>
          <View>
            <View
              style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text>Nhịp đập đầu tiên:</Text>
              <Text>{dayjs(new Date(isFirstDate)).format("DD-MM-YYYY")}</Text>
            </View>
            <View
              style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text>Ngày dự sinh:</Text>
              <Text>{isExpectedBirthDay}</Text>
            </View>
            <View
              style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text>Ngày sinh nhật:</Text>
              <Text>{isBirthDay ? isBirthDay : isExpectedBirthDay}</Text>
            </View>
            <View
              style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text>Đã sinh:</Text>
              <Checkbox checked={isBorn} />
            </View>

            <KeyboardAvoidingView>
              <DatePicker
                visible={isShowDatePicker1}
                mode="date"
                value={dateEvent1?.trim() === "" ? new Date() : new Date(dateEvent1)}
                minDate={new Date(isFirstDate)}
                maxDate={new Date()}
                format="YYYY-MM-DD"
                okText="Chọn"
                dismissText="Thoát"
                onOk={() => setIsShowDatePicker1(false)}
                onDismiss={() => setIsShowDatePicker1(false)}
                onChange={(value) => {
                  setDateEvent1(dayjs(value).format("DD-MM-YYYY"));
                  Keyboard.dismiss();
                }}
              ></DatePicker>
              <WhiteSpace size="xl" />
              <Text style={{ fontSize: 14, fontWeight: "800" }}>Sự kiện 1: </Text>
              <View style={styles.input}>
                <Input
                  style={styles.inputItem}
                  maxLength={20}
                  placeholder="Tên sự kiện 1"
                  value={nameEvent1}
                  onChangeText={(value) => setNameEvent1(value)}
                />
              </View>
              <View style={styles.input}>
                <Input
                  style={styles.inputItem}
                  maxLength={11}
                  placeholder="Ngày sự kiện 1"
                  value={dateEvent1}
                  onTouchStart={() => {
                    setIsShowDatePicker1(true);
                    Keyboard.dismiss();
                  }}
                  showSoftInputOnFocus={false}
                />
              </View>
              <WhiteSpace size="xl" />
              <Text style={{ fontSize: 14, fontWeight: "800" }}>Sự kiện 2: </Text>
              <View style={styles.input}>
                <Input
                  style={styles.inputItem}
                  maxLength={20}
                  placeholder="Tên sự kiện 2"
                  value={nameEvent2}
                  onChangeText={(value) => setNameEvent2(value)}
                />
              </View>
              <View style={styles.input}>
                <Input
                  style={styles.inputItem}
                  maxLength={20}
                  placeholder="Tên sự kiện 2"
                  value={dayjs(new Date()).format("DD-MM-YYYY")}
                />
              </View>
              <DatePicker
                visible={isShowDatePicker3}
                mode="date"
                value={dateEvent3?.trim() === "" ? new Date() : new Date(dateEvent1)}
                minDate={new Date(isFirstDate)}
                format="YYYY-MM-DD"
                okText="Chọn"
                dismissText="Thoát"
                onOk={() => setIsShowDatePicker3(false)}
                onDismiss={() => setIsShowDatePicker3(false)}
                onChange={(value) => {
                  setDateEvent3(dayjs(value).format("DD-MM-YYYY"));
                  Keyboard.dismiss();
                }}
              ></DatePicker>
              <WhiteSpace size="xl" />
              <Text style={{ fontSize: 14, fontWeight: "800" }}>Sự kiện 3: </Text>
              <View style={styles.input}>
                <Input
                  style={styles.inputItem}
                  maxLength={20}
                  placeholder="Tên sự kiện 3"
                  value={nameEvent3}
                  onChangeText={(value) => setNameEvent3(value)}
                />
              </View>
              <View style={styles.input}>
                <Input
                  style={styles.inputItem}
                  maxLength={11}
                  placeholder="Ngày sự kiện 3"
                  value={dateEvent3}
                  onTouchStart={() => {
                    setIsShowDatePicker3(true);
                    Keyboard.dismiss();
                  }}
                  showSoftInputOnFocus={false}
                />
              </View>
            </KeyboardAvoidingView>
            <WhiteSpace />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ModalAddProcessLine;
