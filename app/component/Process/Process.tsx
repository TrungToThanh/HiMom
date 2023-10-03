import React, { useCallback, useEffect, useMemo, useState } from "react";
import { View, ScrollView, ImageBackground, useWindowDimensions } from "react-native";
import ProcessBabyList from "./process-list/process-list";
import ProcessBabyAdd from "./process-add/process-add";

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
        <ProcessBabyAdd accountParentId={accountParentId} accountBabyId={accountBabyId} />
      </ImageBackground>
    </View>
  );
};

export default ProcessBaby;
