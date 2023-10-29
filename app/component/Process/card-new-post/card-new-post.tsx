import { View } from "@ant-design/react-native";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import dayjs from "dayjs";
import React from "react";
import { Text, useWindowDimensions } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { TitleNewPost } from "./title-new-post";
import { useNavigation } from "@react-navigation/native";

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
          minHeight: 50,
          width: width - 10,
          backgroundColor: "white",
          borderColor: "#dedce2",
          borderWidth: 1,
          borderRadius: 5,
          margin: 5,
          padding: 5,
        }}
        onTouchStart={() => handleClickCardNewPost()}
      >
        <TitleNewPost accountParentName={relationShip} />
        <Text> Bạn đang nghĩ gì ....</Text>
      </View>
    </GestureHandlerRootView>
  );
}

export default CardNewPost;
