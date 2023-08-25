import React, { useEffect, useMemo, useState } from "react";
import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
import {
  Button,
  Card,
  WhiteSpace,
  Accordion,
  Radio,
  Modal,
  SwipeAction,
  List,
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
  faCheck,
  faSquare,
  faCircleCheck,
  faCircle,
  faCircleStop,
  faCircleXmark,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";

import CardHeader from "@ant-design/react-native/lib/card/CardHeader";
import { useNavigation } from "@react-navigation/native";
import CardBody from "@ant-design/react-native/lib/card/CardBody";

import { FlatList, GestureHandlerRootView, ScrollView } from "react-native-gesture-handler";
import "react-native-gesture-handler";
import SwipeActionComponent from "../../const/swipe_action_component";
import { useRoute } from "@react-navigation/native";
import DetailShopModal from "./detail_shop_modal";
import {
  deleteAItemsOfShoppingDetail,
  getAllItemShoppingDetail,
} from "../../../api/shopping/shopping_detail";
import EmptyData from "../../const/no_data";
import { updateGoodOfAItemsOfShoppingMain } from "../../../api/shopping/shopping_main";

interface Props {
  isInfo?: boolean;
  nameRouteTypeTable?: number;
  nameRouteUserId?: number;
  nameRouteItemId?: number;
  setShowDetailModal: () => void;
  setReload: () => void;
  setItemIdCurrent: (value) => void;
  setShowInfo: () => void;
}

const DetailListModal = ({
  nameRouteTypeTable,
  nameRouteUserId,
  nameRouteItemId,
  setShowDetailModal,
  setReload,
  setItemIdCurrent,
  setShowInfo,
}: Props) => {
  library.add(faCircleCheck, faCoffee, faTrash, faUser, faCalendar, faEdit, faAdd, faSquare);
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const RadioItem = Radio.RadioItem;
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
                  <FontAwesomeIcon size={14} icon={faAdd} />
                  <Text style={{ fontSize: 12, fontWeight: "400" }}>Thêm hàng hóa</Text>
                </Button>
              </View>
            }
          ></CardHeader>
          <CardBody>
            <View style={{ width: windowWidth - 10 }}>
              <FlatList
                data={listAllItems && listAllItems?.length > 0 ? listAllItems : []}
                renderItem={({ item }) => (
                  <SwipeAction
                    left={handleLeftAction}
                    onSwipeableOpen={() => setItemId(item.id)}
                    containerStyle={{ backgroundColor: "red", paddingLeft: 5 }}
                    childrenContainerStyle={{
                      backgroundColor: "#f0f1f3",
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
                        backgroundColor: "#f0f1f3",
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
          </CardBody>
        </Card>
      </View>
    </GestureHandlerRootView>
  );
};

export default DetailListModal;
