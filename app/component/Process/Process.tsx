import React, { useCallback, useEffect, useMemo, useState } from "react";
import { View, ScrollView, ImageBackground, useWindowDimensions } from "react-native";
import ProcessBabyList from "./process-list/process-list";
import ProcessBabyAdd from "./process-add/process-add";
import CardNewPost from "./card-new-post/card-new-post";
import { WhiteSpace } from "@ant-design/react-native";

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

  return (
    <View>
      <ImageBackground
        source={imageBackground}
        resizeMode="cover"
        style={{ width: width, height: height }}
      >
        <ScrollView>
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
      </ImageBackground>
    </View>
  );
};

export default ProcessBaby;
