import React, { useEffect, useMemo, useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import {
  Button,
  Card,
  WhiteSpace,
  Radio,
  InputItem,
  Toast,
  Modal,
  Grid,
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

import { GestureHandlerRootView, ScrollView } from "react-native-gesture-handler";

import {
  getAItemShoppingDetail,
  insertANewItemToShoppingDetail,
  updateAItemsOfShoppingDetail,
} from "../../../api/shopping/shopping_detail";
import * as ImagePicker from "expo-image-picker";

import getDimensions from "../../hook/get_dimension";
import CardHeaderComponent from "./sub-component/cardHeader";
import CardFooterComponent from "./sub-component/cardFooter";

interface Props {
  setShowDetailModal: () => void;
  isInfo?: boolean;
  nameRouteTypeTable?: number;
  nameRouteUserId?: number;
  nameRouteItemId?: number;
  itemIdCurrent?: number;
  setReload: () => void;
  isCreate?: boolean;
}
const DetailShopModal = ({
  setShowDetailModal,
  isInfo = false,
  itemIdCurrent,
  nameRouteTypeTable,
  nameRouteUserId,
  nameRouteItemId,
  setReload,
  isCreate,
}: Props) => {
  library.add(faCheckSquare, faCoffee, faTrash, faUser, faCalendar, faEdit, faAdd, faClose);
  const { windowWidth, windowHeight, cardHeight, headerCardHeight, bodyCardHeight } =
    getDimensions();

  const [isError, setIsError] = useState(false);
  const [isNameItem, setNameItem] = useState("");
  const [isDescriptionItem, setDescriptionItem] = useState("");
  const [isBuy, setBuyItem] = useState("");
  const [isMoney, setMoneyItem] = useState("0");
  const [isNote, setNote] = useState("");
  const [image, setImage] = useState<any>(null);

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
      const listImage = listAItems?.at(0)?.picture;
      setImage(JSON?.parse(listImage));
    }
    if (isCreate) {
      setNameItem("");
      setDescriptionItem("");
      setBuyItem("");
      setMoneyItem("0");
      setNote("");
    }
  }, [isInfo, listAItems, itemIdCurrent, isCreate]);

  const handleSave = () => {
    if (isError) {
      Toast.fail("Phải nhập thông tin hàng hóa!");
      return;
    } else {
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
              image,
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
              isNote,
              image
            ).then((isRes) => {
              setReload();
              if (isRes) {
                Toast.success("Đã tạo mới thành công!");
              } else {
                Toast.fail("Thất bại!");
              }
            });
      }
    }
  };

  const handleSelectPic = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
      base64: false,
      selectionLimit: 6,
      allowsMultipleSelection: true,
    });

    if (!result.canceled) {
      setImage(result.assets);
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
        <Card
          style={{
            width: windowWidth - 10,
            height: cardHeight,
          }}
        >
          <CardHeader
            title={
              <CardHeaderComponent
                iconName={faClose}
                textButton="Đóng"
                nameHeader=" Danh mục chi tiết:"
                setShowDetailModal={() => setShowDetailModal()}
              />
            }
          ></CardHeader>
          <CardBody>
            <View style={{ width: windowWidth - 10 }}>
              <ScrollView
                style={{
                  marginTop: -10,
                  height: bodyCardHeight,
                }}
              >
                <Text style={styles.titleText}>Tên hàng hóa:</Text>
                <InputItem
                  defaultValue={isNameItem}
                  clear
                  error={isError}
                  maxLength={50}
                  placeholder="Tên hàng hóa"
                  style={styles.input}
                  onChangeText={(value) => {
                    const inValid = new RegExp("^\\s+$");
                    if (inValid.test(value)) console.log("1212 ");
                    if (inValid.test(value) || String(value) === "") {
                      setNameItem("");
                      setIsError(true);
                    } else {
                      setIsError(false);
                      setNameItem(value);
                    }
                  }}
                  onErrorClick={() => Toast.info("Phải nhập tên hàng hóa!")}
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
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingRight: 20,
                  }}
                >
                  <Text style={styles.titleText}>Hình ảnh đính kèm (nếu có):</Text>
                  <Button
                    size="small"
                    onPress={() => handleSelectPic()}
                    style={{ width: 100, marginTop: 20 }}
                  >
                    Chọn ảnh
                  </Button>
                </View>
                <WhiteSpace />
                <Grid
                  data={image}
                  columnNum={3}
                  isCarousel
                  carouselProps={{
                    style: {
                      width: "100%",
                      height: 300,
                    },
                  }}
                  renderItem={(item) => (
                    <Button
                      style={{ width: "100%", height: "100%" }}
                      type="ghost"
                      onPress={() => {
                        Modal.alert(
                          "Trình hiển thị hình ảnh",
                          <View
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              height: 300,
                              width: 300,
                            }}
                          >
                            <Image
                              // @ts-ignore
                              source={item}
                              style={{
                                height: 300,
                                width: 300,
                              }}
                              resizeMethod="auto"
                              resizeMode="cover"
                            />
                          </View>,
                          [
                            {
                              text: "Xóa",
                              style: "cancel",
                            },
                            {
                              text: "Thoát",
                            },
                          ]
                        );
                      }}
                    >
                      <Image
                        // @ts-ignore
                        source={item}
                        style={{
                          height: 100,
                          width: 100,
                        }}
                        resizeMethod="auto"
                        resizeMode="cover"
                      />
                    </Button>
                  )}
                />
              </ScrollView>
            </View>
          </CardBody>
          <Card.Footer
            content={
              <CardFooterComponent
                iconName={faAdd}
                textButton="Lưu"
                handleSave={() => handleSave()}
              />
            }
          />
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
