import React, { useCallback, useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  Text,
  RefreshControl,
} from "react-native";
import { Result, SwipeAction, View } from "@ant-design/react-native";
import { FlatList } from "react-native-gesture-handler";
import EmptyData from "./no_data";
import { getAllItemShoppingMain } from "../../api/shopping/shopping_main";
import { TableItemList } from "./type";

interface Props {
  tableItemList: TableItemList;
  handleLeftAction?: any;
  handleOnClick: (itemId) => void;
  setIsLoading: () => void;
  nameRouteUserId: number | string;
}
const SwipeActionComponent = ({
  tableItemList,
  handleLeftAction,
  handleOnClick,
  setIsLoading,
  nameRouteUserId,
}: Props) => {
  const windowWidth = Dimensions.get("window").width;

  const { listAllItemsMom, listAllItemsBaby, listAllItemsOther } =
    getAllItemShoppingMain(nameRouteUserId);

  return (
    <FlatList
      data={
        tableItemList === TableItemList.mom
          ? listAllItemsMom
          : tableItemList === TableItemList.baby
          ? listAllItemsBaby
          : listAllItemsOther
      }
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
    />
  );
};

export default SwipeActionComponent;
