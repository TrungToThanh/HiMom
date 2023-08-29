import React, { useCallback, useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, Dimensions, ImageBackground } from "react-native";
import {
  Button,
  InputItem,
  Card,
  WhiteSpace,
  DatePicker,
  Toast,
  Accordion,
  Modal,
  Radio,
  SwipeAction,
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
  faBasketShopping,
  faCheckCircle,
  faCartPlus,
} from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";

import CardHeader from "@ant-design/react-native/lib/card/CardHeader";
import { useNavigation } from "@react-navigation/native";
import CardBody from "@ant-design/react-native/lib/card/CardBody";
import EmptyData from "../../const/no_data";
import {
  deleteAItemsOfShoppingMain,
  getAllItemShoppingMain,
  insertANewItemToShoppingMain,
  updateNameOfAItemsOfShoppingMain,
} from "../../../api/shopping/shopping_main";
import { FlatList, GestureHandlerRootView, ScrollView } from "react-native-gesture-handler";
import "react-native-gesture-handler";
import SwipeActionComponent from "../../const/swipe_action_component";
import { TableItemList } from "../../const/type";
import CardHeaderComponent from "./sub-component/cardHeader";
import getDimensions from "../../hook/get_dimension";
import MainListPrepare from "./sub-component/main_list_prepare";

interface Props {
  isShowDeleteButton?: boolean;
  setIsLoading: () => void;
  listAccountBaby?: any;
  nameRouteUserId?: number;
}
const MainShop = ({
  isShowDeleteButton = false,
  setIsLoading,
  listAccountBaby,
  nameRouteUserId,
}: Props) => {
  const image = require("../../../assets/background.jpg");
  library.add(
    faCheckSquare,
    faCoffee,
    faTrash,
    faUser,
    faCalendar,
    faEdit,
    faAdd,
    faBasketShopping
  );
  const { windowWidth, windowHeight, cardHeight, headerCardHeight, bodyCardHeight } =
    getDimensions();
  const RadioItem = Radio.RadioItem;
  const navigation = useNavigation();

  const [isShowEvent, setShowEvent] = useState<boolean>(false);
  const [isPanelActive, setPanelActive] = useState([0]);
  const [isItemIdCurrent, setItemIdCurrent] = useState<number>();

  const [isNameTableSelected, setNameTableSelected] = useState<any>();
  const [isNameItem, setNameItem] = useState("");
  const [refreshing, setRefreshing] = useState(true);

  const onRefresh = useCallback(() => {
    setRefreshing(false);
    setTimeout(() => {
      setRefreshing(true);
    }, 500);
  }, []);

  const handleAddItem = () => {
    if (isNameTableSelected && isNameItem) {
      insertANewItemToShoppingMain(isNameTableSelected, nameRouteUserId, isNameItem).then(
        (isRes) => {
          onRefresh();
          setNameItem("");
          if (isRes) {
            Toast.success("Đã tạo thành công!");
          } else {
            Toast.fail("Tạo thất bại!");
          }
        }
      );
    }
  };
  const handleLeftAction = [
    {
      text: <FontAwesomeIcon icon={faEdit} color="white" />,
      onPress: () => {
        if (isItemIdCurrent && isPanelActive) {
          let newName = isNameItem || "";
          Modal.alert(
            "Tên danh mục",
            <View style={{ width: windowWidth }}>
              <InputItem
                defaultValue={newName}
                placeholder="Nhập tên danh mục mới"
                clear={true}
                style={{ marginLeft: 20, borderBottomWidth: 1 }}
                onChangeText={(value) => {
                  newName = value?.trim();
                }}
              />
            </View>,
            [
              {
                text: "Thoát",
                style: "cancel",
              },
              {
                text: "Đồng ý",
                onPress: () => {
                  const nameTable =
                    isPanelActive?.at(0) === TableItemList.mom
                      ? "mom"
                      : isPanelActive?.at(0) === TableItemList.baby
                      ? "baby"
                      : "other";

                  updateNameOfAItemsOfShoppingMain(
                    nameTable,
                    isItemIdCurrent,
                    nameRouteUserId,
                    newName
                  ).then((isRes) => {
                    onRefresh();
                    setNameItem("");
                    if (isRes) {
                      Toast.success("Đã đổi tên thành công");
                    } else {
                      Toast.fail("Đổi tên thất bại");
                    }
                  });
                },
              },
            ]
          );
        }
      },
      backgroundColor: "#1870bc",
      color: "white",
    },
    {
      text: <FontAwesomeIcon icon={faTrash} color="white" />,
      onPress: () => {
        if (isItemIdCurrent && isPanelActive) {
          const nameTable =
            isPanelActive?.at(0) === TableItemList.mom
              ? "mom"
              : isPanelActive?.at(0) === TableItemList.baby
              ? "baby"
              : "other";

          Modal.alert("Danh mục", "Bạn muốn xóa danh mục?", [
            {
              text: "Thoát",
            },
            {
              text: "Đồng ý",
              onPress: () => {
                deleteAItemsOfShoppingMain(nameTable, isItemIdCurrent, nameRouteUserId).then(
                  (isRes) => {
                    onRefresh();
                    if (isRes) {
                      Toast.success("Đã xóa thành công");
                    } else {
                      Toast.fail("Xóa thất bại");
                    }
                  }
                );
              },
            },
          ]);
        }
      },
      backgroundColor: "red",
      color: "white",
    },
  ];

  return (
    <GestureHandlerRootView>
      <ImageBackground
        source={image}
        resizeMode="cover"
        style={{ width: windowWidth, height: windowHeight }}
      >
        <View
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "transparent",
          }}
        >
          <Text style={{ marginTop: 20, color: "#1870bc", fontSize: 16, fontWeight: "bold" }}>
            Chuẩn bị
          </Text>
          <View
            style={{
              marginTop: 20,
              width: windowWidth - 20,
              alignContent: "center",
              borderRadius: 30,
              borderWidth: 1,
              borderColor: "#e1e8fb",
            }}
          >
            <Image
              source={require("../../../assets/masterCard.png")}
              style={{
                width: windowWidth - 20,
                height: 200,
                borderRadius: 30,
              }}
              resizeMode="cover"
            />
            <View style={{ position: "absolute", paddingLeft: 20, paddingTop: 30 }}>
              <View
                style={{
                  width: windowWidth - 60,
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignContent: "space-between",
                  alignItems: "center",
                  alignSelf: "center",
                }}
              >
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <FontAwesomeIcon icon={faCheckCircle} color="green" />
                  <Text>MomBank</Text>
                </View>

                <Text style={{ fontSize: 30, fontWeight: "bold", fontStyle: "italic" }}> VISA</Text>
              </View>
              <WhiteSpace />
              <WhiteSpace />
              <Text
                style={{
                  width: windowWidth - 60,
                  textAlign: "right",
                  fontSize: 14,
                  fontWeight: "600",
                }}
              >
                *** *** *** 6789
              </Text>
              <WhiteSpace />
              <WhiteSpace />
              <Text style={{ fontSize: 30, fontWeight: "bold" }}>$ 120.000.000</Text>
              <WhiteSpace />
            </View>
          </View>
          <WhiteSpace />
          <WhiteSpace />
          <View
            style={{
              width: windowWidth - 20,
              display: "flex",
              alignSelf: "center",
              justifyContent: "space-between",
              flexDirection: "row",
              marginBottom: 10,
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "bold", color: "#1870bc" }}>
              Danh sách chuẩn bị:
            </Text>
          </View>
          <WhiteSpace />
          <MainListPrepare
            namePrepare="Chuẩn bị của mẹ:"
            isGoodBuy={300}
            isGoods={400}
            isMoneyGoods={"900.000.000"}
            isMoneyGoodsBuy={"- 400.000.000"}
          />
          <WhiteSpace />
          <MainListPrepare
            namePrepare="Chuẩn bị cho bé:"
            isGoodBuy={300}
            isGoods={400}
            isMoneyGoods={"900.000.000"}
            isMoneyGoodsBuy={"- 400.000.000"}
          />
          <WhiteSpace />
          <MainListPrepare
            namePrepare="Chuẩn bị khác:"
            isGoodBuy={300}
            isGoods={400}
            isMoneyGoods={"900.000.000"}
            isMoneyGoodsBuy={"- 400.000.000 $"}
          />
          {/* <Card
            style={{
              width: windowWidth - 10,
              height: cardHeight,
              backgroundColor: "transparent",
            }}
          >
            <CardHeader
              title={
                <CardHeaderComponent
                  iconName={faAdd}
                  nameHeader="Quá trình chuẩn bị"
                  textButton="Thêm danh mục"
                  setShowDetailModal={() => setShowEvent(true)}
                />
              }
            ></CardHeader>
            <CardBody>
              <View style={{ width: windowWidth - 10, backgroundColor: "transparent" }}>
                <Accordion
                  activeSections={isPanelActive}
                  onChange={(value) => setPanelActive(value)}
                >
                  <Accordion.Panel header="1. Chuẩn bị của mẹ" key="0">
                    <ScrollView
                      style={{
                        maxHeight: bodyCardHeight - 60,
                        backgroundColor: "transparent",
                      }}
                    >
                      {refreshing && (
                        <SwipeActionComponent
                          nameRouteUserId={nameRouteUserId}
                          tableItemList={TableItemList.mom}
                          handleLeftAction={handleLeftAction}
                          setIsLoading={() => onRefresh()}
                          handleOnClick={(itemId) =>
                            // @ts-ignore
                            navigation.navigate("DetailShopList", {
                              userId: Number(nameRouteUserId),
                              typeTable: TableItemList.mom,
                              itemId: itemId,
                            })
                          }
                          setItemId={(itemId, itemName) => {
                            setItemIdCurrent(itemId);
                            setNameItem(itemName);
                          }}
                        />
                      )}
                    </ScrollView>
                  </Accordion.Panel>
                  <Accordion.Panel header="2. Chuẩn bị của bé" key="1">
                    <ScrollView
                      style={{
                        maxHeight: bodyCardHeight - 60,
                        backgroundColor: "transparent",
                      }}
                    >
                      {refreshing && (
                        <SwipeActionComponent
                          nameRouteUserId={nameRouteUserId}
                          tableItemList={TableItemList.baby}
                          handleLeftAction={handleLeftAction}
                          setIsLoading={() => onRefresh()}
                          handleOnClick={(itemId) =>
                            // @ts-ignore
                            navigation.navigate("DetailShopList", {
                              userId: Number(nameRouteUserId),
                              typeTable: TableItemList.baby,
                              itemId: itemId,
                            })
                          }
                          setItemId={(itemId, itemName) => {
                            setItemIdCurrent(itemId);
                            setNameItem(itemName);
                          }}
                        />
                      )}
                    </ScrollView>
                  </Accordion.Panel>
                  <Accordion.Panel header="3. Chuẩn bị khác" key="2">
                    <ScrollView
                      style={{
                        maxHeight: bodyCardHeight - 60,
                      }}
                    >
                      {refreshing && (
                        <SwipeActionComponent
                          nameRouteUserId={nameRouteUserId}
                          tableItemList={TableItemList.other}
                          handleLeftAction={handleLeftAction}
                          setIsLoading={() => onRefresh()}
                          handleOnClick={(itemId) =>
                            // @ts-ignore
                            navigation.navigate("DetailShopList", {
                              userId: Number(nameRouteUserId),
                              typeTable: TableItemList.other,
                              itemId: itemId,
                            })
                          }
                          setItemId={(itemId, itemName) => {
                            setItemIdCurrent(itemId);
                            setNameItem(itemName);
                          }}
                        />
                      )}
                    </ScrollView>
                  </Accordion.Panel>
                </Accordion>
              </View>
            </CardBody>
          </Card>
          <Modal
            style={{
              width: windowWidth - 10,
            }}
            popup={true}
            visible={isShowEvent}
            transparent
            animationType="fade"
            title={
              <Text style={{ color: "#1870bc", fontSize: 16, fontWeight: "bold" }}>
                Thêm sự kiện
              </Text>
            }
            footer={[
              {
                text: "Thoát",
                onPress: () => setShowEvent(false),
                style: "cancel",
              },
              {
                text: "Thêm",
                onPress: () => {
                  setShowEvent(false);
                  handleAddItem();
                },
              },
            ]}
          >
            <View
              style={{
                width: windowWidth,
                display: "flex",
                justifyContent: "flex-start",
                marginTop: 10,
              }}
            >
              <Text style={{ fontSize: 14, fontWeight: "bold", paddingTop: 10 }}>
                Danh mục cần thêm:
              </Text>
              <Radio.Group onChange={(value) => setNameTableSelected(value?.target?.value)}>
                <RadioItem value={"mom"}>Danh mục của mẹ</RadioItem>
                <RadioItem value={"baby"}>Danh mục của bé</RadioItem>
                <RadioItem value={"other"}>Danh mục khác</RadioItem>
              </Radio.Group>
              <Text style={{ fontSize: 14, fontWeight: "bold", paddingTop: 10 }}>Tên sự kiện:</Text>
              <InputItem
                placeholder="Tên danh mục"
                multiline
                textBreakStrategy="highQuality"
                onChangeText={(value) => setNameItem(value?.trim())}
                style={{
                  borderBottomWidth: 1,
                  borderColor: "#1870bc",
                  marginRight: 50,
                }}
              ></InputItem>
            </View>
          </Modal> */}
        </View>
      </ImageBackground>
    </GestureHandlerRootView>
  );
};

export default MainShop;

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
