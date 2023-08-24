import React from "react";
import { Dimensions, Image, ScrollView, Text } from "react-native";
import { Result, SwipeAction, View } from "@ant-design/react-native";
import { FlatList } from "react-native-gesture-handler";
import EmptyData from "./no_data";

interface Props {
  listAllItems?: any;
  handleLeftAction?: any;
  handleOnClick: (itemId) => void;
}
const SwipeActionComponent = ({ listAllItems, handleLeftAction, handleOnClick }: Props) => {
  const windowWidth = Dimensions.get("window").width;

  return (
    <FlatList
      data={listAllItems}
      scrollEnabled={true}
      initialNumToRender={4}
      renderItem={({ item, index }) => (
        <SwipeAction
          left={handleLeftAction}
          onSwipeableOpen={() => console.log("open")}
          onSwipeableClose={() => console.log("close")}
          containerStyle={{ backgroundColor: "red", paddingLeft: 5 }}
          childrenContainerStyle={{
            backgroundColor: "white",
            paddingLeft: 20,
            borderBottomColor: "#dddddd",
            borderBottomWidth: 1,
            width: windowWidth - 25,
          }}
        >
          <Text
            style={{
              height: 40,
              fontSize: 14,
              fontWeight: "500",
              justifyContent: "flex-start",
              alignItems: "center",
              display: "flex",
            }}
            onPress={() => handleOnClick(item.id)}
          >
            {index + 1}.{item.nameItem}
          </Text>
        </SwipeAction>
      )}
      keyExtractor={(item) => item.id}
      ListEmptyComponent={<EmptyData />}
      refreshing={true}
    />
  );
};

export default SwipeActionComponent;
