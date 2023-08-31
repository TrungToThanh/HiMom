import { InputItem, Modal, Text, Toast, View } from "@ant-design/react-native";
import React, { useState } from "react";
import { StyleSheet, useWindowDimensions } from "react-native";
import { insertANewItemToShoppingMain } from "../../../../api/shopping/shopping_main";
import { TableItemList } from "../../../const/type";
import Input from "@ant-design/react-native/lib/input-item/Input";

interface Props {
  isPanelActive: TableItemList;
  nameRouteUserId;
  isShowEvent?: boolean;
  setShowEvent: () => void;
}

const AddNewItemToMainList = ({
  isPanelActive,
  nameRouteUserId,
  isShowEvent = false,
  setShowEvent,
}: Props) => {
  const { width, height } = useWindowDimensions();

  const [isNameItem, setNameItem] = useState("");
  const [isError, setError] = useState(false);

  const handleAddItem = () => {
    console.log(isPanelActive, isNameItem);
    if (+isPanelActive >= 0 && isNameItem) {
      insertANewItemToShoppingMain(isPanelActive, nameRouteUserId, isNameItem).then((isRes) => {
        if (isRes) {
          setNameItem("");
          setShowEvent();
          Toast.success("Đã tạo thành công!");
        } else {
          setNameItem("");
          setShowEvent();
          Toast.fail("Tạo thất bại!");
        }
      });
    }
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
      padding: 4,
      fontSize: 14,
      fontWeight: "600",
    },
  });

  return (
    <Modal
      style={{
        width: width - 10,
      }}
      popup={true}
      visible={isShowEvent}
      transparent
      animationType="fade"
      title={
        <View style={{ textAlign: "center" }}>
          <Text style={{ color: "#1870bc", fontSize: 16, fontWeight: "bold" }}>Thêm sự kiện</Text>
          <Text style={{ color: "#1870bc", fontSize: 15, fontWeight: "bold", textAlign: "center" }}>
            {isPanelActive === TableItemList.mom
              ? "Danh mục mẹ"
              : isPanelActive === TableItemList.baby
              ? "Danh mục bé"
              : "Danh mục khác"}
          </Text>
        </View>
      }
      footer={[
        {
          text: "Thoát",
          onPress: () => {
            setError(false);
            setShowEvent();
          },
          style: "cancel",
        },
        {
          text: "Thêm",
          onPress: () => {
            if (isNameItem?.trim() === "") {
              setError(true);
              Toast.fail("Vui lòng nhập thông tin danh mục.");
              return;
            } else {
              handleAddItem();
              setError(false);
            }
          },
        },
      ]}
    >
      <View
        style={{
          width: width,
          display: "flex",
          justifyContent: "flex-start",
          marginTop: 10,
        }}
      >
        <View style={isError ? styles.inputError : styles.input}>
          <Input
            style={styles.inputItem}
            multiline
            maxLength={204}
            placeholder="Tên danh mục"
            onChangeText={(value) => setNameItem(value)}
          />
        </View>
      </View>
    </Modal>
  );
};

export default AddNewItemToMainList;
