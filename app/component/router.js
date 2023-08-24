import * as React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./home/home";
import Main from "./main";

const Stack = createNativeStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator initialRouteName="Main">
      <Stack.Screen
        name="Main"
        component={Main}
        options={{
          title: "Màn hình đăng nhập",
          headerShown: true,
        }}
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
