import React, { useEffect, useMemo, useState } from "react";
import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
import { Button, Card, WhiteSpace, Accordion, Radio, Modal } from "@ant-design/react-native";

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

import CardHeader from "@ant-design/react-native/lib/card/CardHeader";
import { useNavigation } from "@react-navigation/native";
import CardBody from "@ant-design/react-native/lib/card/CardBody";

import { FlatList, GestureHandlerRootView, ScrollView } from "react-native-gesture-handler";
import "react-native-gesture-handler";
import SwipeActionComponent from "../../const/swipe_action_component";
import { useRoute } from "@react-navigation/native";
import DetailShopModal from "./detail_shop_modal";

const DetailShopList = () => {
  library.add(faCheckSquare, faCoffee, faTrash, faUser, faCalendar, faEdit, faAdd);
  const windowWidth = Dimensions.get("window").width;
  const RadioItem = Radio.RadioItem;

  const route = useRoute();
  const [isLoading, setIsLoading] = useState(false);

  const nameRouteUserId = useMemo(() => {
    if (route) {
      /* @ts-ignore */
      return route?.params?.userId;
    }
  }, []);

  const nameRouteTypeTable = useMemo(() => {
    if (route) {
      /* @ts-ignore */
      return route?.params?.typeTable;
    }
  }, []);

  const nameRouteItemId = useMemo(() => {
    if (route) {
      /* @ts-ignore */
      return route?.params?.itemId;
    }
  }, []);

  console.log(
    "nameRouteUserId",
    nameRouteUserId,
    "nameRouteTypeTable",
    nameRouteTypeTable,
    "nameRouteItemId",
    nameRouteItemId
  );

  const [isShowDetailModal, setShowDetailModal] = useState<boolean>(false);
  const [isPanelActive, setPanelActive] = useState([0]);

  const [isNameTableSelected, setNameTableSelected] = useState<any>();
  const [isNameItem, setNameItem] = useState("");

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
              <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Text style={{ color: "#1870bc", fontSize: 16, fontWeight: "bold" }}>
                  Danh mục chi tiết:
                </Text>
                <Button size="small" type="ghost" onPress={() => setShowDetailModal(true)}>
                  <FontAwesomeIcon size={14} icon={faAdd} />
                  <Text style={{ fontSize: 12, fontWeight: "400" }}>Thêm hàng hóa</Text>
                </Button>
              </View>
            }
          ></CardHeader>
          <CardBody>
            <View style={{ width: windowWidth - 20 }}>
              <Modal
                visible={isShowDetailModal}
                popup
                closable={true}
                maskClosable={true}
                onClose={() => setShowDetailModal(false)}
                style={{ height: "100%" }}
              >
                <DetailShopModal setShowDetailModal={() => setShowDetailModal(false)} />
              </Modal>
            </View>
          </CardBody>
        </Card>
      </View>
    </GestureHandlerRootView>
  );
};

export default DetailShopList;
