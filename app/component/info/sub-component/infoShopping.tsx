import React, { useCallback, useMemo, useState } from "react";
import { Text, View, useWindowDimensions } from "react-native";

import { Button, Card, Progress, WhiteSpace } from "@ant-design/react-native";
import CardBody from "@ant-design/react-native/lib/card/CardBody";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCartShopping, faCreditCard, faSackDollar } from "@fortawesome/free-solid-svg-icons";

interface Props {
  title: string;
  numberGoods: number | string;
  numberGoodBuy: number | string;
  totalMoney: number | string;
  totalMoneyBuy: number | string;
}
const InfoShoppingCommon = ({
  title,
  numberGoods,
  numberGoodBuy,
  totalMoney,
  totalMoneyBuy,
}: Props) => {
  const { width } = useWindowDimensions();
  return (
    <Card
      style={{
        width: width - 10,
      }}
    >
      <CardBody>
        <View style={{ paddingLeft: 30, paddingTop: 30, paddingBottom: 30 }}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <Button style={{ width: 80, height: 80, marginTop: 5 }} type="ghost">
              <View>
                <Text>
                  {numberGoodBuy}/{numberGoods}
                </Text>
                <FontAwesomeIcon icon={faCartShopping} color="#ff8700" size={45} />
              </View>
            </Button>
            <View style={{ marginLeft: 20, width: width - 150 }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "700",
                  paddingBottom: 10,
                }}
              >
                {title}
              </Text>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ fontSize: 15, fontWeight: "500" }}>
                  <FontAwesomeIcon icon={faSackDollar} /> Dự kiến:
                </Text>
                <Text style={{ fontSize: 15, fontWeight: "500" }}>{totalMoney}</Text>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ fontSize: 15, fontWeight: "500" }}>
                  <FontAwesomeIcon icon={faCreditCard} /> Chi tiêu:
                </Text>
                <Text style={{ fontSize: 15, fontWeight: "500" }}>{totalMoneyBuy}</Text>
              </View>
              <WhiteSpace />
              <Progress percent={Math.round((Number(numberGoodBuy) * 100) / Number(numberGoods))} />
            </View>
          </View>
        </View>
      </CardBody>
    </Card>
  );
};

export default InfoShoppingCommon;
