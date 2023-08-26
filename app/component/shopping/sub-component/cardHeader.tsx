import React from "react";

import { Button, Text, View } from "@ant-design/react-native";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { IconDefinition, faClose } from "@fortawesome/free-solid-svg-icons";
import getDimensions from "../../../hook/get_dimension";

interface Props {
  nameHeader: string;
  textButton: string;
  iconName: IconDefinition;
  setShowDetailModal?: () => void;
}

const CardHeaderComponent = ({
  nameHeader,
  setShowDetailModal,
  iconName,
  textButton,
}: Props) => {
  const {
    windowWidth,
    windowHeight,
    cardHeight,
    headerCardHeight,
    bodyCardHeight,
  } = getDimensions();
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        height: headerCardHeight,
      }}
    >
      <Text style={{ color: "#1870bc", fontSize: 16, fontWeight: "bold" }}>
        {nameHeader}
      </Text>
      <Button size="small" type="ghost" onPress={() => setShowDetailModal()}>
        <FontAwesomeIcon size={14} icon={iconName} />
        <Text style={{ fontSize: 12, fontWeight: "400" }}>{textButton}</Text>
      </Button>
    </View>
  );
};

export default CardHeaderComponent;
