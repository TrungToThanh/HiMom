import React, { useCallback, useMemo, useState } from "react";
import { Image, Text, View, useWindowDimensions } from "react-native";

import { Card, List, Result, WhiteSpace } from "@ant-design/react-native";
import CardBody from "@ant-design/react-native/lib/card/CardBody";
import ProcessBaby from "../process/process";
import dayjs from "dayjs";

import InfoShoppingCommon from "./sub-component/infoShopping";
import { getAllItemShoppingMain } from "../../../api/shopping/shopping_main";

interface Props {
  listAccountBaby?: any;
  nameRouteUserId?: number;
}
const InfoCommon = ({ listAccountBaby, nameRouteUserId }: Props) => {
  const Item = List.Item;
  const Brief = Item.Brief;

  const { width, height } = useWindowDimensions();

  const nameBaby = useMemo(() => {
    let InfoById;
    if (listAccountBaby) {
      InfoById = listAccountBaby?.find((item) => Number(item.id) === Number(nameRouteUserId));
    }
    return InfoById;
  }, []);

  const isDiffFirstDay = useMemo(() => {
    let dateObject;
    if (listAccountBaby) {
      let idCurrent = listAccountBaby?.find((item) => Number(item.id) === Number(nameRouteUserId));
      var dateParts = idCurrent?.birthday.split("-");

      dateObject = dayjs(new Date()).diff(
        dayjs(new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0])).subtract(280, "days"),
        "days"
      );
    }
    return dateObject;
  }, [listAccountBaby]);

  const diffDay = useMemo(() => {
    let day = "";
    if (listAccountBaby) {
      let idCurrent = listAccountBaby?.find((item) => Number(item.id) === Number(nameRouteUserId));
      var dateParts = idCurrent && idCurrent?.birthday.split("-");
      day = `${dateParts[2]}-${dateParts[1]}-${+dateParts[0]}`;
    }
    return String(dayjs(day).diff(new Date(), "days"));
  }, [listAccountBaby, nameRouteUserId]);

  const { listAllItemsMom, listAllItemsBaby, listAllItemsOther } = getAllItemShoppingMain(
    nameRouteUserId,
    false
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
      moneyGoods: moneyGoods,
      moneyGoodsBuy: moneyGoodsBuy,
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
      moneyGoods: Number(moneyGoods),
      moneyGoodsBuy: Number(moneyGoodsBuy),
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
      moneyGoods: Number(moneyGoods),
      moneyGoodsBuy: Number(moneyGoodsBuy),
      moneyTotal: moneyGoods,
    };
  }, [listAllItemsOther]);

  const totalMoneyPrepare = useMemo(() => {
    return `$ ${Intl.NumberFormat("en-US").format(
      Number(mom.moneyTotal + baby.moneyTotal + other.moneyTotal)
    )}`;
  }, [mom, baby, other]);

  const totalMoneyBuy = useMemo(() => {
    return `$ ${Intl.NumberFormat("en-US").format(
      Number(mom.moneyGoodsBuy + baby.moneyGoodsBuy + other.moneyGoodsBuy)
    )}`;
  }, [mom, baby, other]);

  const totalGoods = useMemo(() => {
    return `${Intl.NumberFormat("en-US").format(
      Number(mom.countGoods + baby.countGoods + other.countGoods)
    )}`;
  }, [mom, baby, other]);

  const totalGoodsBuy = useMemo(() => {
    return `  ${Intl.NumberFormat("en-US").format(
      Number(mom.countGoodsBuy + baby.countGoodsBuy + other.countGoodsBuy)
    )}`;
  }, [mom, baby, other]);

  const image = require("./born.png");

  return (
    <View
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
      }}
    >
      <View style={{ marginBottom: 50, backgroundColor: "white" }}></View>
      <Result
        imgUrl={image}
        title="Hi Mom!"
        message={"Chúng ta là một gia đình"}
        style={{ width: width }}
      />
      <Card
        style={{
          width: width - 10,
        }}
      >
        <CardBody>
          <View style={{ paddingLeft: 30, paddingBottom: 20 }}>
            <View style={{ marginLeft: -20 }}>
              <Item
                extra={
                  <Brief
                    style={{
                      fontSize: 15,
                      fontWeight: "bold",
                      color: "#1870bc",
                    }}
                  >
                    {nameBaby?.nameBaby}
                  </Brief>
                }
              >
                Tên của bé:
              </Item>
              <Item
                extra={
                  <Brief
                    style={{
                      fontSize: 15,
                      fontWeight: "bold",
                      color: "#1870bc",
                    }}
                  >
                    {nameBaby?.birthday}
                  </Brief>
                }
              >
                Ngày sinh dự kiến:
              </Item>
            </View>
            <ProcessBaby
              isDiffFirstDay={isDiffFirstDay}
              diffDay={diffDay}
              isInfoComponent={true}
              listAccountBaby={listAccountBaby}
              nameRouteUserId={nameRouteUserId}
            />
          </View>
        </CardBody>
      </Card>
      <WhiteSpace />
      <InfoShoppingCommon
        title={"Danh mục hàng hóa"}
        numberGoods={totalGoods}
        numberGoodBuy={totalGoodsBuy}
        totalMoney={totalMoneyPrepare}
        totalMoneyBuy={totalMoneyBuy}
      />
      <WhiteSpace />
    </View>
  );
};

export default InfoCommon;
