import React, { useCallback, useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
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
} from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";

import dayjs from "dayjs";
import {
  deleteAItemBabyFromBabyList,
  insertValueBabyToBabyList,
  updateValueOfABabyInBabyList,
} from "../../../api/login/login";
import CardHeader from "@ant-design/react-native/lib/card/CardHeader";
import { useNavigation } from "@react-navigation/native";
import CardBody from "@ant-design/react-native/lib/card/CardBody";
import EmptyData from "../../const/no_data";
import {
  getAllItemShoppingMain,
  insertANewItemToShoppingMain,
} from "../../../api/shopping/shopping_main";
import {
  FlatList,
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
import "react-native-gesture-handler";
import SwipeActionComponent from "../../const/swipe_action_component";
import { TableItemList } from "../../const/type";

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
  library.add(
    faCheckSquare,
    faCoffee,
    faTrash,
    faUser,
    faCalendar,
    faEdit,
    faAdd
  );
  const windowWidth = Dimensions.get("window").width;
  const RadioItem = Radio.RadioItem;
  const navigation = useNavigation();

  const [isShowEvent, setShowEvent] = useState<boolean>(false);
  const [isPanelActive, setPanelActive] = useState([0]);

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
      insertANewItemToShoppingMain(
        isNameTableSelected,
        nameRouteUserId,
        isNameItem
      ).then((isRes) => {
        onRefresh();
        if (isRes) {
          Toast.success("Đã tạo thành công!");
        } else {
          Toast.fail("Tạo thất bại!");
        }
      });
    }
  };
  const handleLeftAction = [
    {
      text: "Chỉnh",
      onPress: () => console.log("more"),
      backgroundColor: "orange",
      color: "white",
    },
    {
      text: "Xóa",
      onPress: () => console.log("delete"),
      backgroundColor: "red",
      color: "white",
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
            width: windowWidth - 15,
          }}
        >
          <CardHeader
            title={
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{ color: "#1870bc", fontSize: 16, fontWeight: "bold" }}
                >
                  Quá trình chuẩn bị:
                </Text>
                <Button
                  size="small"
                  type="ghost"
                  onPress={() => setShowEvent(true)}
                >
                  <FontAwesomeIcon size={14} icon={faAdd} />
                  <Text style={{ fontSize: 12, fontWeight: "400" }}>
                    Thêm danh mục
                  </Text>
                </Button>
              </View>
            }
          ></CardHeader>
          <CardBody>
            <View style={{ width: windowWidth - 20 }}>
              <Accordion
                activeSections={isPanelActive}
                onChange={(value) => setPanelActive(value)}
              >
                <Accordion.Panel header="Chuẩn bị của mẹ" key="0">
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
                    />
                  )}
                </Accordion.Panel>
                <Accordion.Panel header="Chuẩn bị của bé" key="1">
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
                    />
                  )}
                </Accordion.Panel>
                <Accordion.Panel header="Chuẩn bị khác" key="2">
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
                    />
                  )}
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
            <Text
              style={{ color: "#1870bc", fontSize: 16, fontWeight: "bold" }}
            >
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
            <Radio.Group
              onChange={(value) => setNameTableSelected(value?.target?.value)}
            >
              <RadioItem value={"mom"}>Danh mục của mẹ</RadioItem>
              <RadioItem value={"baby"}>Danh mục của bé</RadioItem>
              <RadioItem value={"other"}>Danh mục khác</RadioItem>
            </Radio.Group>
            <Text style={{ fontSize: 14, fontWeight: "bold", paddingTop: 10 }}>
              Tên sự kiện:
            </Text>
            <InputItem
              placeholder="Tên sự kiện"
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
        </Modal>
      </View>
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
