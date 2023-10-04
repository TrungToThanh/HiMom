import React, { useCallback, useEffect, useMemo, useState } from "react";
import { View, ScrollView, ImageBackground, useWindowDimensions } from "react-native";
import ProcessBabyList from "./process-list/process-list";
import ProcessBabyAdd from "./process-add/process-add";
import CardNewPost from "./card-new-post/card-new-post";

interface Props {
  accountParentId: any;
  accountBabyId: any;
}
const ProcessBaby = ({ accountParentId, accountBabyId }: Props) => {
  const { width, height } = useWindowDimensions();
  const imageBackground = require("../../../assets/background.jpg");

  return (
    <View>
      <ImageBackground
        source={imageBackground}
        resizeMode="cover"
        style={{ width: width, height: height }}
      >
        <ProcessBabyList accountParentId={accountParentId} accountBabyId={accountBabyId} />
        <CardNewPost accountParentId={accountParentId} accountBabyId={accountBabyId} />
      </ImageBackground>
    </View>
  );
};

export default ProcessBaby;
