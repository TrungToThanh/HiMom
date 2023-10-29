import { Text, View } from "@ant-design/react-native";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React from "react";
import { useWindowDimensions } from "react-native";

type Props = {
  item: any;
  nameBabyUser: string;
};
export const TitleProcess = ({ item, nameBabyUser }: Props) => {
  const { width } = useWindowDimensions();
  return (
    <View
      style={{
        width: width - 20,
        display: "flex",
        flexDirection: "row",
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          margin: 5,
          borderWidth: 1,
          width: 25,
          borderRadius: 20,
          paddingLeft: 3,
          borderColor: "#b0aca8",
        }}
      >
        <FontAwesomeIcon icon={faUser} color="#4294ff" />
      </View>
      <View>
        <View style={{ display: "flex", flexDirection: "row" }}>
          <Text
            style={{
              fontSize: 14,
              fontWeight: "bold",
            }}
          >
            {item?.relationShip || ""}
            <Text style={{ color: "red" }}>{`  ${item?.status || ""}  `}</Text>
            <Text>{nameBabyUser}</Text>
          </Text>
        </View>

        <Text
          style={{
            fontSize: 12,
            fontWeight: "bold",
            color: "#b0aca8",
          }}
        >
          {item?.dateEvent}
        </Text>
      </View>
    </View>
  );
};
