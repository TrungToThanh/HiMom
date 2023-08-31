import React, { useCallback, useEffect, useState } from "react";
import { Text } from "react-native";
import { Badge, List, SwipeAction, View } from "@ant-design/react-native";
import { FlatList } from "react-native-gesture-handler";
import EmptyData from "./no_data";
import { getAllItemShoppingMain } from "../../api/shopping/shopping_main";
import { TableItemList } from "./type";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faCheckSquare,
  faCoffee,
  faTrash,
  faUser,
  faCalendar,
  faEdit,
  faAdd,
  faArrowRight,
  faChevronRight,
  faCartPlus,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";
interface Props {
  tableItemList: TableItemList;
  handleLeftAction?: any;
  handleOnClick: (itemId) => void;
  setIsLoading: () => void;
  nameRouteUserId: number | string;
  setItemId: (itemId, itemName) => void;
}
const SwipeActionComponent = ({
  tableItemList,
  handleLeftAction,
  handleOnClick,
  setIsLoading,
  nameRouteUserId,
  setItemId,
}: Props) => {
  library.add(
    faCheckSquare,
    faCoffee,
    faTrash,
    faUser,
    faCalendar,
    faEdit,
    faAdd,
    faChevronRight,
    faArrowRight,
    faCartPlus,
    faCartShopping
  );
  const Item = List.Item;

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
      style={{ marginRight: -20, backgroundColor: "transparent" }}
      contentContainerStyle={{ backgroundColor: "transparent" }}
      ListHeaderComponentStyle={{ backgroundColor: "transparent" }}
      initialNumToRender={8}
      renderItem={({ item, index }) => (
        <SwipeAction
          left={handleLeftAction}
          onSwipeableOpen={() => setItemId(item.id, item.nameItem)}
          containerStyle={{ backgroundColor: "transparent" }}
          childrenContainerStyle={{
            backgroundColor: "transparent",
            borderBottomColor: "#dddddd",
            borderBottomWidth: 1,
          }}
        >
          <Item
            arrow="horizontal"
            onPress={() => handleOnClick(item.id)}
            style={{
              height: 40,
              display: "flex",
              backgroundColor: "transparent",
            }}
            extra={
              <View style={{ marginRight: 10, backgroundColor: "transparent" }}>
                <Badge
                  text={
                    <Text>
                      <FontAwesomeIcon icon={faCartShopping} color="white" size={12} />
                      {` ${+item.numberIsBuyGoods || 0}/${+item.numberGoods || 0}`}
                    </Text>
                  }
                  size="small"
                  overflowCount={99}
                ></Badge>
              </View>
            }
          >
            <Text
              style={{
                fontSize: 14,
                fontWeight: "500",
                display: "flex",
              }}
            >
              {item.nameItem}
            </Text>
          </Item>
        </SwipeAction>
      )}
      keyExtractor={(item) => item.id}
      ListEmptyComponent={<EmptyData />}
    />
  );
};

export default SwipeActionComponent;
