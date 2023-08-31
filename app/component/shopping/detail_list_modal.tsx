import React, { useEffect, useMemo, useState } from "react";
import { View, Text, Image, StyleSheet, Dimensions, ImageBackground } from "react-native";
import { Button, WhiteSpace, Modal, SwipeAction, List, Toast } from "@ant-design/react-native";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faTrash,
  faAdd,
  faCircleCheck,
  faSpinner,
  faArrowCircleLeft,
} from "@fortawesome/free-solid-svg-icons";

import { useNavigation } from "@react-navigation/native";

import { FlatList, GestureHandlerRootView, ScrollView } from "react-native-gesture-handler";
import "react-native-gesture-handler";

import {
  deleteAItemsOfShoppingDetail,
  getAllItemShoppingDetail,
} from "../../../api/shopping/shopping_detail";
import EmptyData from "../../const/no_data";
import { updateGoodOfAItemsOfShoppingMain } from "../../../api/shopping/shopping_main";
import { TableItemList } from "../../const/type";

interface Props {
  isInfo?: boolean;
  nameRouteTypeTable?: number;
  nameRouteUserId?: number;
  nameRouteItemId?: number;
  nameMainItemId: string;
  setShowDetailModal: () => void;
  setReload: () => void;
  setItemIdCurrent: (value) => void;
  setShowInfo: () => void;
  setShowDetailModalToCreate: () => void;
}

const DetailListModal = ({
  nameRouteTypeTable,
  nameRouteUserId,
  nameRouteItemId,
  nameMainItemId,
  setShowDetailModal,
  setReload,
  setItemIdCurrent,
  setShowInfo,
  setShowDetailModalToCreate,
}: Props) => {
  const image = require("../../../assets/background.jpg");
  const navigation = useNavigation();
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const Item = List.Item;

  const [itemIdCurrent, setItemId] = useState();

  const { listAllItems } = getAllItemShoppingDetail(
    nameRouteTypeTable,
    nameRouteUserId,
    nameRouteItemId
  );

  useEffect(() => {
    console.log("listAllItems", listAllItems);
    if (listAllItems && listAllItems?.length > 0) {
      const numberOfGoods = listAllItems?.length;

      let countTotalGoodIsBuy = 0;
      listAllItems?.map((item) =>
        Number(item?.buy) === 1 ? countTotalGoodIsBuy++ : countTotalGoodIsBuy
      );

      if (numberOfGoods && countTotalGoodIsBuy) {
        updateGoodOfAItemsOfShoppingMain(
          nameRouteTypeTable,
          nameRouteItemId,
          nameRouteUserId,
          numberOfGoods,
          countTotalGoodIsBuy
        );
      }
    }
  }, [listAllItems]);

  const handleLeftAction = [
    {
      text: <FontAwesomeIcon icon={faTrash} color="white" />,
      backgroundColor: "red",
      color: "white",
      onPress: () => {
        Modal.alert("Danh mục", "Bạn muốn xóa danh mục?", [
          {
            text: "Thoát",
          },
          {
            text: "Đồng ý",
            onPress: () => {
              deleteAItemsOfShoppingDetail(
                nameRouteTypeTable,
                nameRouteUserId,
                nameRouteItemId,
                itemIdCurrent
              ).then((isRes) => {
                setReload();
                if (isRes) {
                  Toast.success("Đã xóa thành công");
                } else {
                  Toast.fail("Xóa thất bại");
                }
              });
            },
          },
        ]);
      },
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
          <View
            style={{
              width: windowWidth - 20,
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              alignContent: "center",
              alignSelf: "center",
              backgroundColor: "transparent",
              marginTop: 20,
              marginLeft: 4,
            }}
          >
            <View onTouchStart={() => navigation.goBack()}>
              <FontAwesomeIcon icon={faArrowCircleLeft} color={"green"} />
            </View>
            <Text style={{ color: "#1870bc", fontSize: 16, fontWeight: "bold" }}>
              Danh mục chi tiết
            </Text>
            <Text style={{ color: "#1870bc", fontSize: 16, fontWeight: "bold" }}></Text>
          </View>
          <WhiteSpace size="lg" />
          <View
            style={{
              width: windowWidth - 20,
              display: "flex",
              flexDirection: "row",
              height: 50,
              backgroundColor: "transparent",
            }}
          >
            <Text
              style={{
                width: 60,
                borderRightWidth: 1,
                borderColor: "#1870bc",
                height: 30,
                textAlign: "center",
                textAlignVertical: "center",
                color: "#e1783f",
                fontWeight: "500",
              }}
            >
              {+nameRouteTypeTable === TableItemList.mom
                ? "Mẹ"
                : +nameRouteTypeTable === TableItemList.baby
                ? "Bé"
                : "Khác"}
            </Text>
            <Text
              style={{
                paddingLeft: 10,
                backgroundColor: "transparent",
                fontSize: 16,
                fontWeight: "500",
                color: "#1870bc",
                textAlign: "center",
                textAlignVertical: "center",
                height: 30,
              }}
            >
              {nameMainItemId}
            </Text>
          </View>
          <View
            style={{
              width: windowWidth - 10,
              borderWidth: 2,
              borderColor: "#e5eaee",
              borderRadius: 10,
              height: windowHeight - 100,
            }}
          >
            <View
              style={{
                width: windowWidth - 20,
                marginTop: 10,
                display: "flex",
                alignSelf: "center",
                justifyContent: "space-between",
                flexDirection: "row",
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: "bold", color: "#1870bc", width: 80 }}>
                Chi tiết:
              </Text>
              <Button
                type="ghost"
                size="small"
                style={{ width: 110, backgroundColor: "transparent" }}
                onPress={() => setShowDetailModalToCreate()}
              >
                <FontAwesomeIcon icon={faAdd} />
                <Text style={{ fontSize: 12, fontWeight: "400" }}>Thêm danh mục</Text>
              </Button>
            </View>
            <FlatList
              ListHeaderComponent={
                <List.Item
                  extra={
                    <Text
                      style={{ fontSize: 14, fontWeight: "500", backgroundColor: "transparent" }}
                    >
                      Đã mua
                    </Text>
                  }
                  style={{ backgroundColor: "transparent" }}
                >
                  <Text style={{ fontSize: 14, fontWeight: "500", backgroundColor: "transparent" }}>
                    Danh mục hàng hóa
                  </Text>
                </List.Item>
              }
              style={{ backgroundColor: "transparent" }}
              ListFooterComponentStyle={{ backgroundColor: "transparent" }}
              contentContainerStyle={{ backgroundColor: "transparent" }}
              data={listAllItems && listAllItems?.length > 0 ? listAllItems : []}
              renderItem={({ item }) => (
                <SwipeAction
                  left={handleLeftAction}
                  onSwipeableOpen={() => setItemId(item.id)}
                  containerStyle={{
                    backgroundColor: "transparent",
                    paddingLeft: 5,
                  }}
                  childrenContainerStyle={{
                    backgroundColor: "transparent",
                    borderBottomColor: "#dddddd",
                    borderBottomWidth: 1,
                    paddingRight: 0,
                  }}
                >
                  <Item
                    arrow="horizontal"
                    onPress={() => {
                      setItemIdCurrent(item.id), setShowInfo(), setShowDetailModal();
                    }}
                    style={{
                      height: 40,
                      display: "flex",
                      backgroundColor: "#transparent",
                    }}
                    extra={
                      <FontAwesomeIcon
                        icon={+item.buy === 1 ? faCircleCheck : faSpinner}
                        color={+item.buy === 1 ? "green" : "#f0f1f3"}
                      />
                    }
                  >
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: "500",
                        display: "flex",
                      }}
                    >
                      {item.nameItem}
                    </Text>
                  </Item>
                </SwipeAction>
              )}
              keyExtractor={(item) => item.id}
              ListEmptyComponent={<EmptyData />}
            />
          </View>
        </View>
      </ImageBackground>
    </GestureHandlerRootView>
  );
};

export default DetailListModal;
