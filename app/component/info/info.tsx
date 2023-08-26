import React, { useCallback, useMemo, useState } from "react";
import { Text, View, useWindowDimensions } from "react-native";

import { Card, Grid, List, Result, WhiteSpace } from "@ant-design/react-native";
import CardBody from "@ant-design/react-native/lib/card/CardBody";
import CardHeader from "@ant-design/react-native/lib/card/CardHeader";
import ProcessBaby from "../process/process";
import dayjs from "dayjs";

interface Props {
  listAccountBaby?: any;
  nameRouteUserId?: number;
}
const InfoCommon = ({ listAccountBaby, nameRouteUserId }: Props) => {
  const Item = List.Item;
  const Brief = Item.Brief;

  const [isLoading, setIsLoading] = useState(false);
  const { width, height } = useWindowDimensions();

  const nameBaby = useMemo(() => {
    let InfoById;
    if (listAccountBaby) {
      InfoById = listAccountBaby?.find(
        (item) => Number(item.id) === Number(nameRouteUserId)
      );
    }
    return InfoById;
  }, []);

  const isDiffFirstDay = useMemo(() => {
    let dateObject;
    if (listAccountBaby) {
      let idCurrent = listAccountBaby?.find(
        (item) => Number(item.id) === Number(nameRouteUserId)
      );
      var dateParts = idCurrent?.birthday.split("-");

      dateObject = dayjs(new Date()).diff(
        dayjs(
          new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0])
        ).subtract(280, "days"),
        "days"
      );
    }
    return dateObject;
  }, [listAccountBaby]);

  const diffDay = useMemo(() => {
    let day = "";
    if (listAccountBaby) {
      let idCurrent = listAccountBaby?.find(
        (item) => Number(item.id) === Number(nameRouteUserId)
      );
      var dateParts = idCurrent && idCurrent?.birthday.split("-");
      day = `${dateParts[2]}-${dateParts[1]}-${+dateParts[0]}`;
    }
    return String(dayjs(day).diff(new Date(), "days"));
  }, [listAccountBaby, nameRouteUserId]);

  return (
    <View
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Result
        imgUrl={{
          uri: "https://zos.alipayobjects.com/rmsportal/GcBguhrOdlYvGfnsXgrE.png",
        }}
        title="Hi Mom!"
        message={"Chúng ta là một gia đình"}
        style={{ width: width }}
      />
      <WhiteSpace />
      <Card
        style={{
          width: width - 10,
        }}
      >
        <CardBody>
          <View style={{ padding: 30 }}>
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
    </View>
  );
};

export default InfoCommon;
