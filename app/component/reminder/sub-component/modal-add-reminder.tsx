import React, { useEffect, useState } from "react";

import { StyleSheet, useWindowDimensions } from "react-native";
import { Modal, View, Text, Button, Toast, Checkbox } from "@ant-design/react-native";

import Input from "@ant-design/react-native/lib/input-item/Input";
import { insertANewReminder } from "../../../../api/reminder/reminder";

interface Props {
  isShowModal: boolean;
  setShowModal: () => void;
  isUserId: number;
  setIsLoading: (value) => void;
  valueTypeReminder: string;
}

const ModalAddReminder = ({
  isUserId,
  isShowModal,
  setShowModal,
  setIsLoading,
  valueTypeReminder,
}: Props) => {
  const { width, height } = useWindowDimensions();

  const [isName, setIsName] = useState("");
  const [isType, setIsType] = useState("");
  const [isBuy, setIsBuy] = useState(false);

  const [isErrorName, setIsErrorName] = useState(false);
  const [isErrorType, setIsErrorType] = useState(false);

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
      padding: 4,
      fontSize: 14,
      fontWeight: "600",
    },
  });

  const handleAddReminderTodo = () => {
    if (isName?.trim() === "") setIsErrorName(true);
    if (isType?.trim() === "") setIsErrorType(true);

    const stop = isName?.trim() === "" || isType?.trim() === "" || isBuy === undefined;
    if (stop) return;
    insertANewReminder(isUserId, isName, isType, isBuy ? true : false).then((isRes) => {
      if (isRes) {
        Toast.success("Thêm nhắc nhở thành công!");
        setShowModal();
        setIsLoading(true);
        setTimeout(() => {
          setIsLoading(false);
        }, 300);
      } else {
        Toast.fail("Thêm nhắc nhở thất bại.");
      }
    });
  };

  useEffect(() => {
    setIsErrorName(false);
    setIsErrorType(false);
    setIsBuy(false);

    setIsName("");
    setIsType(valueTypeReminder);
  }, [isShowModal]);

  return (
    <View>
      <Modal
        style={{
          width: width - 10,
        }}
        popup={true}
        visible={isShowModal}
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
            <Text style={{ color: "#1870bc", fontSize: 16, fontWeight: "bold" }}>
              Thêm nhắc nhở
            </Text>
          </View>
        }
        footer={[
          {
            text: "Thoát",
            onPress: () => setShowModal(),
            style: "cancel",
          },
          {
            text: "Thêm",
            onPress: () => {
              handleAddReminderTodo();
            },
          },
        ]}
      >
        <View style={{ width: width - 30, paddingTop: 10 }}>
          <View style={isErrorName ? styles.inputError : styles.input}>
            <Input
              style={styles.inputItem}
              maxLength={50}
              placeholder={
                isErrorName
                  ? "Không được phép bỏ qua trường thông tin này."
                  : "Nội dung cần nhắc nhở"
              }
              value={isName}
              onChangeText={(value) => {
                setIsErrorName(false);
                setIsName(value);
              }}
            />
          </View>
        </View>
        <View style={{ width: width - 30, paddingTop: 10 }}>
          <View style={isErrorType ? styles.inputError : styles.input}>
            <Input
              style={styles.inputItem}
              maxLength={250}
              placeholder={
                isErrorType
                  ? "Không được phép bỏ qua trường thông tin này."
                  : "Danh mục cần nhắc nhở"
              }
              value={isType}
              onChangeText={(value) => {
                setIsErrorType(false);
                setIsType(value);
              }}
            />
          </View>
        </View>
        <View style={{ width: width - 30, paddingTop: 10 }}>
          <View style={styles.input}>
            <Text>Đã hoàn thành:</Text>
            <Checkbox checked={isBuy} onChange={(value) => setIsBuy(value?.target?.checked)} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ModalAddReminder;
