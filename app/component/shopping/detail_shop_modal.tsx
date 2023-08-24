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
  faA,
} from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";

import CardHeader from "@ant-design/react-native/lib/card/CardHeader";
import { useNavigation } from "@react-navigation/native";
import CardBody from "@ant-design/react-native/lib/card/CardBody";

import { FlatList, GestureHandlerRootView, ScrollView } from "react-native-gesture-handler";
import "react-native-gesture-handler";
import SwipeActionComponent from "../../const/swipe_action_component";
import { useRoute } from "@react-navigation/native";
import CardFooter from "@ant-design/react-native/lib/card/CardFooter";

interface Props {
  setShowDetailModal: () => void;
}
const DetailShopModal = ({ setShowDetailModal }: Props) => {
  library.add(faCheckSquare, faCoffee, faTrash, faUser, faCalendar, faEdit, faAdd, faClose);
  const windowWidth = Dimensions.get("window").width;
  const RadioItem = Radio.RadioItem;

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
                <Button size="small" type="ghost" onPress={() => setShowDetailModal()}>
                  <FontAwesomeIcon size={14} icon={faClose} />
                </Button>
              </View>
            }
          ></CardHeader>
          <CardBody>
            <View style={{ width: windowWidth - 20 }}>
              <Text style={styles.titleText}>Tên hàng hóa:</Text>
              <InputItem
                clear
                textAlign="center"
                maxLength={100}
                placeholder="Tên hàng hóa"
                style={styles.input}
                // onChangeText={(value) => setPasswordInput(value)}
              ></InputItem>
              <Text style={styles.titleText}>Mô tả hàng hóa:</Text>
              <InputItem
                clear
                textAlign="center"
                maxLength={100}
                placeholder="Mô tả hàng hóa"
                style={styles.input}
                // onChangeText={(value) => setPasswordInput(value)}
              ></InputItem>
              <Text style={styles.titleText}>Trạng thái:</Text>
              <Radio.Group
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                  paddingVertical: 6,
                }}
              >
                <Radio value={1}>
                  <Text style={{ fontSize: 16 }}>Đã mua</Text>
                </Radio>
                <Radio value={2}>
                  <Text style={{ fontSize: 16 }}>Đang xem xét</Text>
                </Radio>
              </Radio.Group>
              <Text style={styles.titleText}>Đơn giá (dự kiến):</Text>
              <InputItem
                clear
                textAlign="center"
                maxLength={100}
                placeholder="Đơn giá (dự kiến)"
                style={styles.input}
                // onChangeText={(value) => setPasswordInput(value)}
              ></InputItem>
              <Text style={styles.titleText}>Ghi chú:</Text>
              <InputItem
                clear
                textAlign="center"
                maxLength={100}
                placeholder="Ghi chú"
                style={styles.input}
                // onChangeText={(value) => setPasswordInput(value)}
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
                <Button type="ghost" onPress={() => setShowDetailModal()} style={{ width: 100 }}>
                  <FontAwesomeIcon size={14} icon={faAdd} />
                  <Text style={{ fontSize: 12, fontWeight: "400" }}>Lưu</Text>
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
