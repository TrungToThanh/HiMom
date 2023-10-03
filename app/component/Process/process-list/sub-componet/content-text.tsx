import { Text, View } from "@ant-design/react-native";
import React from "react";

type Props = {
  item: any;
};

export const ContentText = ({ item }: Props) => {
  return (
    <View>
      <Text
        style={{
          fontSize: 13,
          fontWeight: "400",
          marginLeft: 5,
        }}
      >
        {item.contentEvent}
      </Text>
    </View>
  );
};
