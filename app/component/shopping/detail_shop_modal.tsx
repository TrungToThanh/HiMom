import React, { useEffect, useMemo, useState } from "react";
import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
import {
  Button,
  Card,
  WhiteSpace,
  Accordion,
  Radio,
  InputItem,
  ImagePicker,
  Toast,
} from "@ant-design/react-native";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faCheckSquare,
  faCoffee,
  faTrash,
  faUser,
  faCalendar,
  faEdit,
  faAdd,
  faClose,
} from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";

import CardHeader from "@ant-design/react-native/lib/card/CardHeader";
import CardBody from "@ant-design/react-native/lib/card/CardBody";

import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-gesture-handler";
import {
  getAItemShoppingDetail,
  insertANewItemToShoppingDetail,
  updateAItemsOfShoppingDetail,
} from "../../../api/shopping/shopping_detail";

interface Props {
  setShowDetailModal: () => void;
  isInfo?: boolean;
  nameRouteTypeTable?: number;
  nameRouteUserId?: number;
  nameRouteItemId?: number;
  itemIdCurrent?: number;
  setReload: () => void;
}
const DetailShopModal = ({
  setShowDetailModal,
  isInfo = false,
  itemIdCurrent,
  nameRouteTypeTable,
  nameRouteUserId,
  nameRouteItemId,
  setReload,
}: Props) => {
  library.add(faCheckSquare, faCoffee, faTrash, faUser, faCalendar, faEdit, faAdd, faClose);
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const RadioItem = Radio.RadioItem;

  const [isNameItem, setNameItem] = useState("");
  const [isDescriptionItem, setDescriptionItem] = useState("");
  const [isBuy, setBuyItem] = useState("");
  const [isMoney, setMoneyItem] = useState("0");
  const [isNote, setNote] = useState("");

  const { listAItems } =
    isInfo &&
    getAItemShoppingDetail(nameRouteTypeTable, nameRouteUserId, nameRouteItemId, itemIdCurrent);

  useEffect(() => {
    if (isInfo && listAItems && listAItems?.length > 0) {
      setNameItem(listAItems?.at(0)?.nameItem);
      setDescriptionItem(listAItems?.at(0)?.description);
      setBuyItem(listAItems?.at(0)?.buy);
      setMoneyItem(listAItems?.at(0)?.money);
      setNote(listAItems?.at(0)?.note);
    }
    if (!isInfo) {
      setNameItem("");
      setDescriptionItem("");
      setBuyItem("");
      setMoneyItem("0");
      setNote("");
    }
  }, [isInfo, listAItems, itemIdCurrent]);

  const handleSave = () => {
    if (
      String(isNameItem) !== "" &&
      String(isDescriptionItem) !== "" &&
      String(isBuy) !== "" &&
      String(isMoney) !== ""
    ) {
      isInfo
        ? updateAItemsOfShoppingDetail(
            nameRouteTypeTable,
            nameRouteUserId,
            nameRouteItemId,
            isNameItem,
            isDescriptionItem,
            isBuy,
            isMoney,
            isNote,
            itemIdCurrent
          ).then((isRes) => {
            setReload();

            if (isRes) {
              Toast.success("Cập nhập thành công!");
            } else {
              Toast.fail("Thất bại!");
            }
          })
        : insertANewItemToShoppingDetail(
            nameRouteTypeTable,
            nameRouteUserId,
            nameRouteItemId,
            isNameItem,
            isDescriptionItem,
            isBuy,
            isMoney,
            isNote
          ).then((isRes) => {
            setReload();
            if (isRes) {
              Toast.success("Đã tạo mới thành công!");
            } else {
              Toast.fail("Thất bại!");
            }
          });
    }
  };

  return (
    <GestureHandlerRootView>
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <WhiteSpace />
        <Card
          style={{
            width: windowWidth - 10,
            height: windowHeight - 60,
          }}
        >
          <CardHeader
            title={
              <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Text style={{ color: "#1870bc", fontSize: 16, fontWeight: "bold" }}>
                  Danh mục chi tiết:
                </Text>
                <Button size="small" type="ghost" onPress={() => setShowDetailModal()}>
                  <FontAwesomeIcon size={14} icon={faClose} />
                  <Text>Đóng</Text>
                </Button>
              </View>
            }
          ></CardHeader>
          <CardBody>
            <View style={{ width: windowWidth - 20 }}>
              <Text style={styles.titleText}>Tên hàng hóa:</Text>
              <InputItem
                defaultValue={isNameItem}
                clear
                maxLength={50}
                placeholder="Tên hàng hóa"
                style={styles.input}
                onChangeText={(value) => setNameItem(value)}
              ></InputItem>
              <Text style={styles.titleText}>Mô tả hàng hóa:</Text>
              <InputItem
                defaultValue={isDescriptionItem}
                clear
                maxLength={100}
                placeholder="Mô tả hàng hóa"
                multiline
                style={styles.input}
                onChangeText={(value) => setDescriptionItem(value)}
              ></InputItem>
              <Text style={styles.titleText}>Trạng thái:</Text>
              <Radio.Group
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                  paddingVertical: 6,
                }}
                onChange={(value) => setBuyItem(String(value?.target?.value))}
                value={isBuy !== "" ? isBuy : "2"}
              >
                <Radio value={"1"}>
                  <Text style={{ fontSize: 16 }}>Đã mua</Text>
                </Radio>
                <Radio value={"2"}>
                  <Text style={{ fontSize: 16 }}>Đang xem xét</Text>
                </Radio>
              </Radio.Group>
              <Text style={styles.titleText}>Đơn giá (dự kiến):</Text>
              <InputItem
                defaultValue={isMoney}
                type="number"
                clear
                maxLength={11}
                placeholder="Đơn giá (dự kiến)"
                style={styles.input}
                onChangeText={(value) => {
                  const re = /^[0-9\b]+$/;
                  if (value === "") setMoneyItem("0");
                  if (re.test(value) && value?.length <= 9) {
                    setMoneyItem(value);
                  } else {
                    setMoneyItem("0");
                  }
                }}
                value={isMoney}
                onBlur={() =>
                  +isMoney > 0
                    ? setMoneyItem(Intl.NumberFormat("en-US").format(Number(isMoney)))
                    : "0"
                }
              ></InputItem>
              <Text style={styles.titleText}>Ghi chú:</Text>
              <InputItem
                defaultValue={isNote}
                clear
                maxLength={200}
                multiline
                placeholder="Ghi chú"
                style={styles.input}
                onChangeText={(value) => setNote(value)}
              ></InputItem>
              <Text style={styles.titleText}>Hình ảnh đính kèm (nếu có):</Text>
              {/* <ImagePicker/> */}
              <View
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 20,
                }}
              >
                <Button type="ghost" onPress={() => handleSave()} style={{ width: 100 }}>
                  <FontAwesomeIcon size={14} icon={faAdd} />
                  <Text style={{ fontSize: 14, fontWeight: "600" }}>Lưu</Text>
                </Button>
              </View>
            </View>
          </CardBody>
        </Card>
      </View>
    </GestureHandlerRootView>
  );
};

export default DetailShopModal;

const styles = StyleSheet.create({
  titleText: {
    color: "#1870bc",
    fontSize: 16,
    fontWeight: "bold",
    paddingLeft: 20,
    paddingTop: 20,
  },
  input: {
    marginLeft: 20,
    marginRight: 30,
  },
});
