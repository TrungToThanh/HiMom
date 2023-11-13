import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  View,
  ScrollView,
  ImageBackground,
  useWindowDimensions,
  Text,
  StyleSheet,
  Image,
} from "react-native";
import ProcessBabyList from "./process-list/process-list";
import ProcessBabyAdd from "./process-add/process-add";
import CardNewPost from "./card-new-post/card-new-post";
import { Button, Drawer, WhiteSpace } from "@ant-design/react-native";
import { HeaderNewPost } from "./card-new-post/header";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faBirthdayCake,
  faClose,
  faIdCard,
  faLock,
  faShield,
} from "@fortawesome/free-solid-svg-icons";
import { FbAccBabyGetInfoBasic } from "../../../api/firebase/account/baby/getInfoOfOnePerson";
import * as ImagePicker from "expo-image-picker";
import { FbProcessUpdateAvatarBaby } from "../../../api/firebase/process/updateAvatarBaby";

interface Props {
  accountParentId: any;
  accountBabyId: any;
  accountParentName: string;
  relationShip: string;
  nameBabyUser: string;
}
const ProcessBaby = ({
  accountParentId,
  accountBabyId,
  accountParentName,
  relationShip,
  nameBabyUser,
}: Props) => {
  const { width, height } = useWindowDimensions();
  const imageBackground = require("../../../assets/background.jpg");
  const [isShowDrawer, setIsShowDrawer] = useState(false);
  const [isInfoBasic, setInfoBasic] = useState<any>();
  const [changeImage, setChangeImage] = useState<any>();

  useEffect(() => {
    if (accountBabyId) {
      FbAccBabyGetInfoBasic({ accountBabyId }).then((value) => {
        setInfoBasic(value);
      });
    }
  }, [accountBabyId]);

  const handleSelectPic = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      quality: 1,
      base64: true,
      selectionLimit: 1,
      allowsMultipleSelection: true,
    });

    if (!result.canceled) {
      await FbProcessUpdateAvatarBaby({ accountBabyId, avatar: result?.assets[0]?.base64 || "" });
      setChangeImage(result.assets);
    }
  };

  const sidebar = (
    <View style={{ width: width, padding: 10 }}>
      <View
        style={{
          paddingTop: 80,
          width: width,
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
        }}
      >
        <View onTouchStart={handleSelectPic}>
          <Image
            source={
              { type: "image", uri: `data:image/png;base64,${isInfoBasic?.avatar?.base64}` } ||
              changeImage ||
              imageBackground
            }
            resizeMethod="auto"
            style={{
              width: 162,
              height: 162,
              borderRadius: 100,
              padding: 10,
            }}
            resizeMode="center"
          />
        </View>
        <Text style={{ color: "#2D3F7B", fontSize: 30, fontWeight: "bold", marginVertical: 10 }}>
          {nameBabyUser}
        </Text>
        <View style={{ width: width, borderTopWidth: 1, borderTopColor: "#EFF2F7" }}>
          <Text style={{ fontSize: 14, fontWeight: "bold", padding: 10 }}>
            Thông tin tài khoản:
          </Text>
          <View>
            <View style={styles.info}>
              <FontAwesomeIcon icon={faIdCard} />
              <Text> Mã tài khoản: {accountBabyId} </Text>
            </View>
            <View style={styles.info}>
              <FontAwesomeIcon icon={faBirthdayCake} />
              <Text> Sinh nhật: {isInfoBasic?.birthdayBaby || ""} </Text>
            </View>
            <View style={styles.info}>
              <FontAwesomeIcon icon={faShield} />
              <Text> Mã người tạo: {accountParentId} </Text>
            </View>
            <View style={styles.info}>
              <FontAwesomeIcon icon={faLock} />
              <Text> Mối quan hệ: {relationShip} </Text>
            </View>
          </View>
        </View>
        <View style={{ width: width, borderTopWidth: 1, borderTopColor: "#EFF2F7" }}></View>
        <Button
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
            marginTop: 150,
            width: "60%",
            borderRadius: 20,
          }}
          onPress={() => setIsShowDrawer(false)}
        >
          <FontAwesomeIcon icon={faClose} color="red" />
          <Text>Thoát</Text>
        </Button>
      </View>
    </View>
  );
  return (
    <GestureHandlerRootView>
      <View style={{ backgroundColor: "#FAFBFC", minHeight: height }}>
        <Drawer
          position="left"
          sidebar={sidebar}
          open={isShowDrawer}
          drawerBackgroundColor="white"
          drawerWidth={width}
          edgeWidth={width}
        >
          <ScrollView>
            <HeaderNewPost
              nameBabyUser={nameBabyUser}
              setIsShowDrawer={() => setIsShowDrawer(true)}
              avatar={isInfoBasic?.avatar?.base64 || null}
            />
            <CardNewPost
              relationShip={relationShip}
              accountParentId={accountParentId}
              accountBabyId={accountBabyId}
              accountParentName={accountParentName}
              nameBabyUser={nameBabyUser}
            />
            <ProcessBabyList
              accountParentId={accountParentId}
              accountBabyId={accountBabyId}
              nameBabyUser={nameBabyUser}
            />
            <WhiteSpace size="xl" />
            <View style={{ marginBottom: 100 }}></View>
          </ScrollView>
        </Drawer>
      </View>
    </GestureHandlerRootView>
  );
};

export default ProcessBaby;
const styles = StyleSheet.create({
  textButton: {
    backgroundColor: "white",
    width: 16,
    height: 16,
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
    borderRadius: 50,
    borderColor: "#CFD7ED",
    borderWidth: 1,
  },
  info: {
    backgroundColor: "#F8F9FA",
    padding: 10,
    display: "flex",
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    marginBottom: 10,
    borderRadius: 10,
    width: "95%",
  },
});
