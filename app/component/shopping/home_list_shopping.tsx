import React, { useCallback, useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, Dimensions, ImageBackground } from "react-native";
import { WhiteSpace } from "@ant-design/react-native";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

import { FlatList, GestureHandlerRootView, ScrollView } from "react-native-gesture-handler";
import "react-native-gesture-handler";
import getDimensions from "../../hook/get_dimension";
import MainListPrepare from "./sub-component/main_list_prepare";

interface Props {
  listAccountBaby?: any;
  nameRouteUserId?: number;
}
const HomeListShopping = ({ listAccountBaby, nameRouteUserId }: Props) => {
  const image = require("../../../assets/background.jpg");

  const { windowWidth, windowHeight } = getDimensions();

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
            nameRouteUserId={nameRouteUserId}
          />
          <WhiteSpace />
          <MainListPrepare
            namePrepare="Chuẩn bị cho bé:"
            isGoodBuy={300}
            isGoods={400}
            isMoneyGoods={"900.000.000"}
            isMoneyGoodsBuy={"- 400.000.000"}
            nameRouteUserId={nameRouteUserId}
          />
          <WhiteSpace />
          <MainListPrepare
            namePrepare="Chuẩn bị khác:"
            isGoodBuy={300}
            isGoods={400}
            isMoneyGoods={"900.000.000"}
            isMoneyGoodsBuy={"- 400.000.000 $"}
            nameRouteUserId={nameRouteUserId}
          />
        </View>
      </ImageBackground>
    </GestureHandlerRootView>
  );
};

export default HomeListShopping;
