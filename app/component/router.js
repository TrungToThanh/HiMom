import * as React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import DetailShopList from "./shopping/detail_list_shopping";
import Main from "./main";
import Home from "./home/home";
import MainShop from "./shopping/main_list_shopping";
import BabyAcc from "./account/baby/babyAcc";

const Stack = createNativeStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator initialRouteName="Main">
      <Stack.Screen
        name="Main"
        component={Main}
        options={{
          title: "Màn hình đăng nhập",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="BabyAcc"
        component={BabyAcc}
        options={{
          title: "Màn hình đăng nhập Baby",
          headerShown: false,
        }}
        getId={({ params }) => params.nameParentUserId}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          title: "Màn hình chính",
          headerShown: false,
        }}
        getId={({ params }) => params.userId}
      />
      <Stack.Screen
        name="MainShop"
        component={MainShop}
        options={{
          title: "Danh mục chi tiết",
          headerShown: false,
        }}
        getId={({ params }) => {
          params.userId, params.itemActive;
        }}
      />
      <Stack.Screen
        name="DetailShopList"
        component={DetailShopList}
        options={{
          title: "Danh mục chi tiết",
          headerShown: false,
        }}
        getId={({ params }) => {
          params.userId, params.typeTable, params.itemId, params.nameItemId;
        }}
      />
    </Stack.Navigator>
  );
}

export default function MyRoutes() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}
