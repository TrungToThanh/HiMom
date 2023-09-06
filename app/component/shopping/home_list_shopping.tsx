import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";

import { View, Text, Image, StyleSheet, Dimensions, ImageBackground } from "react-native";
import { WhiteSpace } from "@ant-design/react-native";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

import { FlatList, GestureHandlerRootView, ScrollView } from "react-native-gesture-handler";
import "react-native-gesture-handler";
import getDimensions from "../../hook/get_dimension";
import MainListPrepare from "./sub-component/main_list_prepare";
import { getAllItemShoppingMain } from "../../../api/shopping/shopping_main";

interface Props {
  nameRouteUserId?: number;
}
const HomeListShopping = ({ nameRouteUserId }: Props) => {
  const image = require("../../../assets/background.jpg");

  const [isLoading, setIsLoading] = useState(false);

  const { windowWidth, windowHeight } = getDimensions();
  const { listAllItemsMom, listAllItemsBaby, listAllItemsOther } = getAllItemShoppingMain(
    nameRouteUserId,
    isLoading
  );

  const mom = useMemo(() => {
    let countGoods = 0;
    let countGoodsBuy = 0;
    let moneyGoods = 0;
    let moneyGoodsBuy = 0;

    listAllItemsMom?.map((item) => {
      countGoods = countGoods + Number(item.numberGoods);
      countGoodsBuy = countGoodsBuy + Number(item.numberIsBuyGoods);
      moneyGoods = moneyGoods + Number(item.moneyGoods);
      moneyGoodsBuy = moneyGoodsBuy + Number(item.moneyBuyGoods);
    });
    return {
      countGoods: countGoods,
      countGoodsBuy: countGoodsBuy,
      moneyGoods:
        Number(moneyGoods) > 0 ? Intl.NumberFormat("en-US").format(Number(moneyGoods)) : 0,
      moneyGoodsBuy:
        Number(moneyGoodsBuy) > 0 ? Intl.NumberFormat("en-US").format(Number(moneyGoodsBuy)) : 0,
      moneyTotal: moneyGoods,
    };
  }, [listAllItemsMom]);

  const baby = useMemo(() => {
    let countGoods = 0;
    let countGoodsBuy = 0;
    let moneyGoods = 0;
    let moneyGoodsBuy = 0;

    listAllItemsBaby?.map((item) => {
      countGoods = countGoods + Number(item.numberGoods);
      countGoodsBuy = countGoodsBuy + Number(item.numberIsBuyGoods);
      moneyGoods = moneyGoods + Number(item.moneyGoods);
      moneyGoodsBuy = moneyGoodsBuy + Number(item.moneyBuyGoods);
    });
    return {
      countGoods: countGoods,
      countGoodsBuy: countGoodsBuy,
      moneyGoods:
        Number(moneyGoods) > 0 ? Intl.NumberFormat("en-US").format(Number(moneyGoods)) : 0,
      moneyGoodsBuy:
        Number(moneyGoodsBuy) > 0 ? Intl.NumberFormat("en-US").format(Number(moneyGoodsBuy)) : 0,
      moneyTotal: moneyGoods,
    };
  }, [listAllItemsBaby]);

  const other = useMemo(() => {
    let countGoods = 0;
    let countGoodsBuy = 0;
    let moneyGoods = 0;
    let moneyGoodsBuy = 0;

    listAllItemsOther?.map((item) => {
      countGoods = countGoods + Number(item.numberGoods);
      countGoodsBuy = countGoodsBuy + Number(item.numberIsBuyGoods);
      moneyGoods = moneyGoods + Number(item.moneyGoods);
      moneyGoodsBuy = moneyGoodsBuy + Number(item.moneyBuyGoods);
    });
    return {
      countGoods: countGoods,
      countGoodsBuy: countGoodsBuy,
      moneyGoods:
        Number(moneyGoods) > 0 ? Intl.NumberFormat("en-US").format(Number(moneyGoods)) : 0,
      moneyGoodsBuy:
        Number(moneyGoodsBuy) > 0 ? Intl.NumberFormat("en-US").format(Number(moneyGoodsBuy)) : 0,
      moneyTotal: moneyGoods,
    };
  }, [listAllItemsOther]);

  const totalMoneyPrepare = useMemo(() => {
    const total = Number(mom.moneyTotal + baby.moneyTotal + other.moneyTotal);
    return +total > 0
      ? `$ ${Intl.NumberFormat("en-US").format(
          Number(mom.moneyTotal + baby.moneyTotal + other.moneyTotal)
        )}`
      : "$ 0";
  }, [mom, baby, other]);

  useFocusEffect(
    React.useCallback(() => {
      setIsLoading(false);
      setTimeout(() => {
        setIsLoading(true);
      }, 300);
    }, [])
  );

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
          <Text
            style={{
              marginTop: 20,
              color: "#1870bc",
              fontSize: 16,
              fontWeight: "bold",
            }}
          >
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

                <Text
                  style={{
                    fontSize: 30,
                    fontWeight: "bold",
                    fontStyle: "italic",
                  }}
                >
                  VISA
                </Text>
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
              <Text style={{ fontSize: 30, fontWeight: "bold" }}>{totalMoneyPrepare}</Text>
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
            isGoodBuy={mom.countGoodsBuy || 0}
            isGoods={mom.countGoods || 0}
            isMoneyGoods={mom.moneyGoods || 0}
            isMoneyGoodsBuy={mom.moneyGoodsBuy || 0}
            nameRouteUserId={nameRouteUserId}
          />
          <WhiteSpace />
          <MainListPrepare
            namePrepare="Chuẩn bị cho bé:"
            isGoodBuy={baby.countGoodsBuy || 0}
            isGoods={baby.countGoods || 0}
            isMoneyGoods={baby.moneyGoods || 0}
            isMoneyGoodsBuy={baby.moneyGoodsBuy || 0}
            nameRouteUserId={nameRouteUserId}
          />
          <WhiteSpace />
          <MainListPrepare
            namePrepare="Chuẩn bị khác:"
            isGoodBuy={other.countGoodsBuy || 0}
            isGoods={other.countGoods || 0}
            isMoneyGoods={other.moneyGoods || 0}
            isMoneyGoodsBuy={other.moneyGoodsBuy || 0}
            nameRouteUserId={nameRouteUserId}
          />
        </View>
      </ImageBackground>
    </GestureHandlerRootView>
  );
};

export default HomeListShopping;
