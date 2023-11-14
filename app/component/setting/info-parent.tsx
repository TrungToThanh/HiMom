import { Button, Text, View } from "@ant-design/react-native";
import React, { useState } from "react";
import { Image, StyleSheet, useWindowDimensions } from "react-native";
import { TextInput } from "react-native-gesture-handler";

import { ResizeMode, Video } from "expo-av";
import * as ImagePicker from "expo-image-picker";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faBirthdayCake,
  faEdit,
  faEye,
  faEyeDropper,
  faIdCard,
  faLock,
  faShield,
} from "@fortawesome/free-solid-svg-icons";
import { FbProcessUpdateAvatarParent } from "../../../api/firebase/process/updateAvatarParent";
import { FbAccParentGetInfoBasic } from "../../../api/firebase/account/parrent/getInfo";
import { useFocusEffect } from "@react-navigation/native";
import Input from "@ant-design/react-native/lib/input-item/Input";

type Props = {
  accountParentId: string;
};

export const InfoParent = ({ accountParentId }: Props) => {
  const { width } = useWindowDimensions();

  const [isInfoBasicParent, setInfoBasicParent] = useState<any>();
  const [changeImage, setChangeImage] = useState<any>();
  const [isShowPass, setShowPass] = useState(false);

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
      await FbProcessUpdateAvatarParent({
        accountId: accountParentId,
        avatar: result?.assets[0]?.base64 || "",
      });
      setChangeImage(result.assets);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      const handleGetInfo = async () => {
        if (accountParentId) {
          await FbAccParentGetInfoBasic({ accountId: accountParentId }).then((value) => {
            value && setInfoBasicParent(value);
          });
        }
      };
      setTimeout(() => {
        handleGetInfo();
      }, 0);
    }, [accountParentId])
  );

  return (
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
              {
                type: "image",
                uri: `data:image/png;base64,${isInfoBasicParent?.avatar?.base64}`,
              } || changeImage
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
          {isInfoBasicParent?.name}
        </Text>
        <View style={{ width: width, borderTopWidth: 1, borderTopColor: "#EFF2F7" }}>
          <Text style={{ fontSize: 14, fontWeight: "bold", padding: 10 }}>
            Thông tin tài khoản:
          </Text>
          <View>
            <View style={styles.info}>
              <FontAwesomeIcon icon={faIdCard} />
              <Text> Mã tài khoản: {isInfoBasicParent?.uniqueId} </Text>
            </View>
            <View style={styles.infoEdit}>
              <View style={styles.inputNameAndPass}>
                <FontAwesomeIcon icon={faBirthdayCake} />
                <Text> Tên đăng nhập: {isInfoBasicParent?.name}</Text>
              </View>
              <View>
                <FontAwesomeIcon icon={faEdit} />
              </View>
            </View>
            <View style={styles.infoEdit}>
              <View style={styles.inputNameAndPass}>
                <FontAwesomeIcon icon={faShield} />
                <Text> Mã đăng nhập: </Text>
                <Input secureTextEntry={!isShowPass} value={isInfoBasicParent?.password} />
              </View>
              <View
                onTouchStart={() => setShowPass(!isShowPass)}
                style={{ display: "flex", flexDirection: "row", gap: 12 }}
              >
                <FontAwesomeIcon icon={faEye} />
                <FontAwesomeIcon icon={faEdit} />
              </View>
            </View>
          </View>
        </View>
        <View style={{ width: width, borderTopWidth: 1, borderTopColor: "#EFF2F7" }}></View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
  infoEdit: {
    backgroundColor: "#F8F9FA",
    paddingVertical: 10,
    display: "flex",
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    marginBottom: 10,
    borderRadius: 10,
    width: "95%",
    justifyContent: "space-between",
  },
  inputNameAndPass: {
    backgroundColor: "#F8F9FA",
    paddingHorizontal: 10,
    display: "flex",
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    width: "80%",
  },
});
