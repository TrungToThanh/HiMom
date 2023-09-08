import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions, DevSettings } from "react-native";
import { Accordion, WhiteSpace, Button, Modal } from "@ant-design/react-native";

import Account from "../account/account";
import InfoApp from "./sub-component/info_app";
import { ResetDB, exportDb, importDb } from "../../../api/database";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faFileExport, faFileImport, faTrash } from "@fortawesome/free-solid-svg-icons";

import { useNavigation } from "@react-navigation/native";

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
  const navigation = useNavigation();
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
      <Text style={{ color: "#1870bc", fontSize: 16, fontWeight: "bold", marginTop: 20 }}>
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
            isSetting={true}
          />
        </Accordion.Panel>
        <Accordion.Panel header="Cài đặt" key="1">
          <View style={{ margin: 20 }}>
            <Button
              onPress={() => {
                Modal.alert("", "Bạn muốn xóa tất cả dữ liệu?", [
                  {
                    text: "Thoát",
                    style: "cancel",
                  },
                  {
                    text: "Xóa",
                    // @ts-ignore
                    onPress: () => ResetDB().then(() => navigation.navigate("Main")),
                  },
                ]);
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <Text>Xóa toàn bộ dữ liệu</Text>
                <FontAwesomeIcon icon={faTrash} color="red" />
              </View>
            </Button>
            <Button
              onPress={() => {
                exportDb();
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <Text>Xuất dữ liệu</Text>
                <FontAwesomeIcon icon={faFileExport} color="green" />
              </View>
            </Button>
          </View>
        </Accordion.Panel>
        <Accordion.Panel header="Thông tin phần mềm" key="2">
          <InfoApp />
        </Accordion.Panel>
      </Accordion>
    </View>
  );
};

export default SettingAccount;
