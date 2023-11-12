import { Button, View, WingBlank } from "@ant-design/react-native";
import {
  faEye,
  faFaceLaughWink,
  faFaceSmile,
  faPerson,
  faPhotoFilm,
  faSmile,
  faUser,
  faVideoCamera,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import dayjs from "dayjs";
import React from "react";
import { StyleSheet, Text, useWindowDimensions } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { TitleNewPost } from "./title-new-post";
import { useNavigation } from "@react-navigation/native";
import { HeaderNewPost } from "./header";

type Props = {
  accountParentId: any;
  accountBabyId: any;
  accountParentName: string;
  relationShip: string;
  nameBabyUser: string;
};

function CardNewPost({
  accountParentId,
  accountBabyId,
  accountParentName,
  relationShip,
  nameBabyUser,
}: Props) {
  const { width, height } = useWindowDimensions();
  const navigation = useNavigation();

  const handleClickCardNewPost = () => {
    //@ts-ignore
    navigation.navigate("ProcessBabyPostNewEvent", {
      accountParentId: accountParentId,
      accountBabyId: accountBabyId,
      accountParentName: accountParentName,
      relationShip: relationShip,
      nameBabyUser: nameBabyUser,
    });
  };
  return (
    <GestureHandlerRootView>
      <View
        style={{
          paddingTop: 5,
          minHeight: 50,
          width: width,
          backgroundColor: "white",
          borderBottomLeftRadius: 16,
          borderBottomRightRadius: 16,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 2,
        }}
        onTouchStart={() => handleClickCardNewPost()}
      >
        <TitleNewPost accountParentName={relationShip} />
        <WingBlank>
          <View></View>
        </WingBlank>
        <View style={styles.container}>
          <Text> Bạn đang nghĩ gì ....</Text>
          <View style={{ backgroundColor: "black", borderRadius: 50, margin: 5 }}>
            <FontAwesomeIcon icon={faSmile} color="#FFD54F" secondaryColor="black" />
          </View>
        </View>
        <View style={styles.groupButton}>
          <View style={styles.button}>
            <FontAwesomeIcon icon={faPhotoFilm} color="green" />
            <Text style={styles.textButton}>Chụp ảnh</Text>
          </View>
          <View style={styles.button}>
            <FontAwesomeIcon icon={faVideoCamera} color="red" />
            <Text style={styles.textButton}>Quay video</Text>
          </View>
          <View style={styles.button}>
            <FontAwesomeIcon icon={faEye} color="#1977F3" />
            <Text style={styles.textButton}>Đăng video</Text>
          </View>
        </View>
      </View>
    </GestureHandlerRootView>
  );
}

export default CardNewPost;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    padding: 10,
  },
  groupButton: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    padding: 10,
    paddingTop: 5,
  },
  button: {
    width: 117,
    height: 34,
    borderRadius: 7,
    backgroundColor: "#f8f9fa",
    flexDirection: "row",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  textButton: {
    paddingLeft: 10,
  },
});
