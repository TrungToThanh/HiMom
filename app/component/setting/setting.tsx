import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Accordion, WhiteSpace } from "@ant-design/react-native";

import Account from "../account/account";
import InfoApp from "./sub-component/info_app";

interface Props {
  isShowDeleteButton?: boolean;
  listAccountBaby?: any;
  nameRouteUserId?: number;
  setIsLoading: () => void;
}
const SettingAccount = ({
  isShowDeleteButton,
  listAccountBaby,
  nameRouteUserId,
  setIsLoading,
}: Props) => {
  const [activePanel, setActivePanel] = useState<any>();
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
      <Text style={{ color: "#1870bc", fontSize: 16, fontWeight: "bold" }}>
        Cài đặt tài khoản:
      </Text>
      <WhiteSpace />
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
            setIsLoading={setIsLoading}
          />
        </Accordion.Panel>
        <Accordion.Panel header="Cài đặt" key="1">
          ...
        </Accordion.Panel>
        <Accordion.Panel header="Thông tin phần mềm" key="2">
          <InfoApp />
        </Accordion.Panel>
      </Accordion>
    </View>
  );
};

export default SettingAccount;
