import { InputItem, Text, View, WhiteSpace, WingBlank } from "@ant-design/react-native";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React, { useState } from "react";
import { StyleSheet, useWindowDimensions } from "react-native";
import { GestureHandlerRootView, TextInput } from "react-native-gesture-handler";
import { ContentReact } from "./content-react";
import { ContentComment } from "./content-comment";

type Prop = {
  item: any;
  accountBabyId: string;
};
export const ReactAndComment = ({ item, accountBabyId }: Prop) => {
  const [isShowComment, setShowComment] = useState(false);
  return (
    <GestureHandlerRootView>
      <View>
        <ContentReact
          item={item}
          accountBabyId={accountBabyId}
          setShowComment={() => setShowComment(!isShowComment)}
        />
        {isShowComment && <ContentComment />}
      </View>
    </GestureHandlerRootView>
  );
};
