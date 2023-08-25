import React, { useCallback, useEffect, useState } from "react";
import { Dimensions, Image, ScrollView, Text, RefreshControl } from "react-native";
import { Badge, List, Result, SwipeAction, View } from "@ant-design/react-native";
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
  faClose,
  faA,
  faArrowAltCircleRight,
  faArrowRight,
  faChevronCircleRight,
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
  const windowWidth = Dimensions.get("window").width;
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
      renderItem={({ item, index }) => (
        <SwipeAction
          left={handleLeftAction}
          onSwipeableOpen={() => setItemId(item.id, item.nameItem)}
          containerStyle={{ backgroundColor: "red", paddingLeft: 5 }}
          childrenContainerStyle={{
            backgroundColor: "#f0f1f3",
            borderBottomColor: "#dddddd",
            borderBottomWidth: 1,
            paddingRight: 0,
          }}
        >
          <Item
            arrow="horizontal"
            onPress={() => handleOnClick(item.id)}
            style={{
              height: 40,
              display: "flex",
              backgroundColor: "#f0f1f3",
            }}
            extra={
              <View style={{ marginRight: 10 }}>
                <Badge
                  text={
                    <Text>
                      <FontAwesomeIcon icon={faCartShopping} color="white" size={12} />
                      {` 12/99`}
                    </Text>
                  }
                  size="small"
                  overflowCount={99}
                >
                  <View
                    style={{
                      width: 150,
                      height: 20,
                      marginBottom: -20,
                    }}
                  ></View>
                </Badge>
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
