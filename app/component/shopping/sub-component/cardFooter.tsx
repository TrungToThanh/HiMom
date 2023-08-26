import React from "react";

import { Button, Text, View } from "@ant-design/react-native";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { IconDefinition, faClose } from "@fortawesome/free-solid-svg-icons";
import getDimensions from "../../../hook/get_dimension";

interface Props {
  textButton: string;
  iconName: IconDefinition;
  handleSave: () => void;
}

const CardFooterComponent = ({ iconName, handleSave, textButton }: Props) => {
  return (
    <View
      style={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <Button
        type="primary"
        onPress={() => handleSave()}
        style={{ width: 100 }}
      >
        <Text style={{ fontSize: 16, fontWeight: "600", color: "white" }}>
          <FontAwesomeIcon size={16} icon={iconName} color="white" />
          {textButton}
        </Text>
      </Button>
    </View>
  );
};

export default CardFooterComponent;
