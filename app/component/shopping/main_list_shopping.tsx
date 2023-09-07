import React, { useCallback, useEffect, useMemo, useState } from "react";
import { View, Text, Image, StyleSheet, Dimensions, ImageBackground } from "react-native";
import {
  Button,
  InputItem,
  WhiteSpace,
  Toast,
  Modal,
  SegmentedControl,
} from "@ant-design/react-native";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faTrash, faEdit, faAdd, faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";

import { useNavigation } from "@react-navigation/native";
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
import MainListPrepare from "./sub-component/main_list_prepare";
import getDimensions from "../../hook/get_dimension";
import AddNewItemToMainList from "./sub-component/modal-add-item";
import { useRoute } from "@react-navigation/native";
import { useFocusEffect } from "@react-navigation/native";

interface Props {}
const MainShop = ({}: Props) => {
  const route = useRoute();

  const image = require("../../../assets/background.jpg");
  const { windowWidth, windowHeight } = getDimensions();
  const navigation = useNavigation();

  const [isShowEvent, setShowEvent] = useState<boolean>(false);
  const [isPanelActive, setPanelActive] = useState<TableItemList>();
  const [isItemIdCurrent, setItemIdCurrent] = useState<number>();
  const [isReload, setReload] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [isNameItem, setNameItem] = useState("");

  const onRefresh = useCallback(() => {
    setReload(false);
    setTimeout(() => {
      setReload(true);
    }, 500);
  }, []);

  useEffect(() => {
    if (route) {
      /* @ts-ignore */
      setPanelActive(route?.params?.itemActive);
    }
  }, []);

  const nameRouteUserId = useMemo(() => {
    if (route) {
      /* @ts-ignore */
      return route?.params?.userId;
    }
  }, []);

  const { listAllItemsMom, listAllItemsBaby, listAllItemsOther } = getAllItemShoppingMain(
    nameRouteUserId,
    isLoading
  );

  useFocusEffect(
    React.useCallback(() => {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 300);
    }, [isReload])
  );

  const handleLeftAction = [
    {
      text: <FontAwesomeIcon icon={faEdit} color="white" />,
      onPress: () => {
        if (isItemIdCurrent) {
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
                    +isPanelActive === TableItemList.mom
                      ? "mom"
                      : +isPanelActive === TableItemList.baby
                      ? "baby"
                      : "other";
                  updateNameOfAItemsOfShoppingMain(
                    nameTable,
                    isItemIdCurrent,
                    nameRouteUserId,
                    newName
                  ).then((isRes) => {
                    setNameItem("");
                    onRefresh();
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
        if (isItemIdCurrent) {
          const nameTable =
            +isPanelActive === TableItemList.mom
              ? "mom"
              : +isPanelActive === TableItemList.baby
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
        <AddNewItemToMainList
          isPanelActive={isPanelActive}
          isShowEvent={isShowEvent}
          nameRouteUserId={nameRouteUserId}
          setShowEvent={() => setShowEvent(false)}
          onRefresh={() => onRefresh()}
        />
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
              Danh mục chính
            </Text>
            <Text style={{ color: "#1870bc", fontSize: 16, fontWeight: "bold" }}></Text>
          </View>
          <WhiteSpace size="lg" />
          <SegmentedControl
            selectedIndex={isPanelActive}
            values={["Mẹ", "Bé", "Khác"]}
            style={{ width: 200 }}
            onChange={(e) => setPanelActive(e.nativeEvent.selectedSegmentIndex)}
          />
          <WhiteSpace size="lg" />
          <View
            style={{
              width: windowWidth - 10,
              borderWidth: 2,
              borderColor: "#e5eaee",
              borderRadius: 10,
              height: windowHeight - 100,
              backgroundColor: "transparent",
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
                backgroundColor: "transparent",
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  color: "#1870bc",
                  width: 80,
                }}
              >
                Chi tiết:
              </Text>
              <Button
                type="ghost"
                size="small"
                style={{ width: 110, backgroundColor: "transparent" }}
                onPress={() => setShowEvent(true)}
              >
                <FontAwesomeIcon icon={faAdd} />
                <Text style={{ fontSize: 12, fontWeight: "400" }}>Thêm danh mục</Text>
              </Button>
            </View>
            <View
              style={{
                marginTop: 10,
                height: windowHeight - 160,
                width: windowWidth - 20,
                backgroundColor: "transparent",
              }}
            >
              <SwipeActionComponent
                tableItemList={isPanelActive}
                handleLeftAction={handleLeftAction}
                handleOnClick={(itemId, itemName) =>
                  // @ts-ignore
                  navigation.navigate("DetailShopList", {
                    userId: Number(nameRouteUserId),
                    typeTable: isPanelActive,
                    itemId: itemId,
                    nameItemId: itemName,
                  })
                }
                setItemId={(itemId, itemName) => {
                  setItemIdCurrent(itemId);
                  setNameItem(itemName);
                }}
                listAllItemsMom={listAllItemsMom}
                listAllItemsBaby={listAllItemsBaby}
                listAllItemsOther={listAllItemsOther}
              />
            </View>
          </View>
        </View>
      </ImageBackground>
    </GestureHandlerRootView>
  );
};

export default MainShop;
