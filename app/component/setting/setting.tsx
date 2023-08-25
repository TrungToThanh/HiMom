import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
import {
  Button,
  InputItem,
  Card,
  WhiteSpace,
  DatePicker,
  Toast,
  List,
  Accordion,
} from "@ant-design/react-native";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faCheckSquare,
  faCoffee,
  faTrash,
  faUser,
  faCalendar,
  faEdit,
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
import Account from "../account/account";

interface Props {}
const SettingAccount = ({}: Props) => {
  library.add(faCheckSquare, faCoffee, faTrash, faUser, faCalendar, faEdit);

  const [activePanel, setActivePanel] = useState([0]);
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
            <Text style={{ color: "#1870bc", fontSize: 16, fontWeight: "bold" }}>
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
            <Accordion.Panel header="Thông tin tài khoản">
              <Account />
            </Accordion.Panel>
            <Accordion.Panel header="Cài đặt">...</Accordion.Panel>
            <Accordion.Panel header="Thông tin phần mềm">...</Accordion.Panel>
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
