import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
import { Card, WhiteSpace, Accordion } from "@ant-design/react-native";

import {
  faCheckSquare,
  faCoffee,
  faTrash,
  faUser,
  faCalendar,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";

import CardHeader from "@ant-design/react-native/lib/card/CardHeader";
import Account from "../account/account";
import InfoApp from "./sub-component/info_app";

interface Props {
  isShowDeleteButton?: boolean;
  listAccountBaby?: any;
  nameRouteUserId?: number;
}
const SettingAccount = ({
  isShowDeleteButton,
  listAccountBaby,
  nameRouteUserId,
}: Props) => {
  library.add(faCheckSquare, faCoffee, faTrash, faUser, faCalendar, faEdit);

  const [activePanel, setActivePanel] = useState<any>([]);
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  return (
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
          width: windowWidth - 10,
          height: windowHeight - 60,
        }}
      >
        <CardHeader
          title={
            <Text
              style={{ color: "#1870bc", fontSize: 16, fontWeight: "bold" }}
            >
              Cài đặt tài khoản:
            </Text>
          }
        ></CardHeader>
        <Card.Body>
          <Accordion
            style={{ width: windowWidth - 10 }}
            activeSections={activePanel}
            onChange={(value) => setActivePanel(value)}
          >
            <Accordion.Panel header="Thông tin tài khoản" key="0">
              <Account
                listAccountBaby={listAccountBaby}
                isShowDeleteButton={isShowDeleteButton}
                nameRouteUserId={nameRouteUserId}
              />
            </Accordion.Panel>
            <Accordion.Panel header="Cài đặt" key="1">
              ...
            </Accordion.Panel>
            <Accordion.Panel header="Thông tin phần mềm" key="2">
              <InfoApp />
            </Accordion.Panel>
          </Accordion>
        </Card.Body>
      </Card>
    </View>
  );
};

export default SettingAccount;

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
