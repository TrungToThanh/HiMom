import React, { useCallback, useEffect, useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { WhiteSpace } from "@ant-design/react-native";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import getDimensions from "../../../hook/get_dimension";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";

interface Props {
  namePrepare: string;
  isGoodBuy: string | number;
  isGoods: string | number;
  isMoneyGoods: string | number;
  isMoneyGoodsBuy: string | number;
}
const MainListPrepare = ({
  namePrepare,
  isGoodBuy,
  isGoods,
  isMoneyGoods,
  isMoneyGoodsBuy,
}: Props) => {
  const { windowWidth, windowHeight, cardHeight, headerCardHeight, bodyCardHeight } =
    getDimensions();

  return (
    <View style={{ width: windowWidth - 20 }}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          width: windowWidth - 20,
          height: 80,
          backgroundColor: "white",
          borderRadius: 20,
          borderWidth: 2,
          borderColor: "#e5eaee",
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginLeft: 20,
            width: 40,
          }}
        >
          <FontAwesomeIcon
            icon={faCartPlus}
            size={40}
            color={
              namePrepare === "Chuẩn bị của mẹ:"
                ? "#8ed11d"
                : namePrepare === "Chuẩn bị cho bé:"
                ? "#1d8ed1"
                : "#d11d8e"
            }
          />
        </View>
        <View style={{ marginLeft: -30 }}>
          <WhiteSpace />
          <WhiteSpace />
          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
              color: "#1870bc",
            }}
          >
            {namePrepare}
          </Text>
          <Text
            style={{
              fontSize: 13,
              fontWeight: "400",
            }}
          >
            Hoàn thành: {isGoodBuy}/{isGoods}
          </Text>
        </View>
        <View style={{ width: 100, marginRight: 10 }}>
          <WhiteSpace />
          <WhiteSpace />
          <Text
            style={{
              fontSize: 15,
              fontWeight: "bold",
              color: "#1870bc",
              textAlign: "right",
            }}
          >
            {isMoneyGoods}
          </Text>
          <Text
            style={{
              fontSize: 13,
              fontWeight: "400",
              textAlign: "right",
            }}
          >
            {isMoneyGoodsBuy}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default MainListPrepare;
