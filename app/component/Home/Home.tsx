import React, { useCallback, useMemo, useState } from "react";
import { View, Text, StyleSheet, useWindowDimensions } from "react-native";

import { Tabs, ActivityIndicator, Result, TabBar, Icon } from "@ant-design/react-native";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faBasketShopping,
  faCalendarCheck,
  faCheckSquare,
  faEye,
  faEyeSlash,
  faGear,
  faHomeUser,
  faSeedling,
  faStore,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { getAllBabyInBabyList } from "../../../api/login/login";
import { useRoute } from "@react-navigation/native";
import MainShop from "../shopping/main_list_shopping";
import ProcessBaby from "../process/process";

import LoadingData from "../../const/loading";
import SettingAccount from "../setting/setting";
import ReminderComponent from "../reminder/reminder";
import HomeListShopping from "../shopping/home_list_shopping";
import { getAllEvent } from "../../../api/eventProcess/event";
import { GestureHandlerRootView, ScrollView } from "react-native-gesture-handler";
import { useFocusEffect } from "@react-navigation/native";

const Home = () => {
  const route = useRoute();

  const [isLoading, setIsLoading] = useState(false);
  const { width, height } = useWindowDimensions();
  const [loadingAgain, setLoadingAgain] = useState(false);

  const [selectedTab, setSelectedTab] = useState("process");
  const nameRouteUserId = useMemo(() => {
    if (route) {
      /* @ts-ignore */
      return route?.params?.userId;
    }
  }, []);

  const { listAccountBaby } = getAllBabyInBabyList(isLoading);
  const { listEvent } = getAllEvent({
    nameRouteUserId: nameRouteUserId,
    isLoading: loadingAgain,
  });

  const [isDoneLoading, setDoneLoading] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      const isDoneLoading =
        listAccountBaby && listAccountBaby?.length > 0 && listEvent && listEvent?.length > 0;

      if (isDoneLoading) setDoneLoading(true);
    }, [listAccountBaby, listEvent])
  );

  const tabs = [
    {
      title: (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "center",
          }}
        >
          <FontAwesomeIcon icon={faSeedling} color="green" />
          <Text>Quá trình</Text>
        </View>
      ),
    },
    {
      title: (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "center",
          }}
        >
          <FontAwesomeIcon icon={faBasketShopping} color="#e28743" />
          <Text>Chuẩn bị</Text>
        </View>
      ),
    },
    {
      title: (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "center",
          }}
        >
          <FontAwesomeIcon icon={faCalendarCheck} color="#d11d8e" />
          <Text>Nhắc nhở</Text>
        </View>
      ),
    },
    {
      title: (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "center",
          }}
        >
          <FontAwesomeIcon icon={faGear} color="#1870bc" />
          <Text>Cài đặt</Text>
        </View>
      ),
    },
  ];

  return (
    <View style={{ width: width, height: height }}>
      {isDoneLoading ? (
        <TabBar unselectedTintColor="black" barTintColor="white">
          <TabBar.Item
            title={"Hành trình"}
            icon={<Icon name="home" />}
            selected={selectedTab === "process"}
            onPress={() => setSelectedTab("process")}
            selectedIcon={<Icon name="home" size={26} color="#1870bc" />}
          >
            <ProcessBaby
              nameRouteUserId={nameRouteUserId}
              listAccountBaby={listAccountBaby}
              listEvent={listEvent}
              setLoadingAgain={(value) => setLoadingAgain(value)}
            />
          </TabBar.Item>
          <TabBar.Item
            title="Chuẩn bị"
            icon={<Icon name="shopping" />}
            selected={selectedTab === "shopping"}
            onPress={() => setSelectedTab("shopping")}
            selectedIcon={<Icon name="shopping" size={26} color="#1870bc" />}
          >
            <HomeListShopping nameRouteUserId={nameRouteUserId} />
          </TabBar.Item>
          <TabBar.Item
            title="Nhắc nhở"
            icon={<Icon name="calendar" />}
            selected={selectedTab === "reminder"}
            onPress={() => setSelectedTab("reminder")}
            selectedIcon={<Icon name="calendar" size={26} color="#1870bc" />}
          >
            <ReminderComponent isUserId={nameRouteUserId} />
          </TabBar.Item>
          <TabBar.Item
            title="Cài đặt"
            icon={<Icon name="setting" />}
            selected={selectedTab === "setting"}
            onPress={() => setSelectedTab("setting")}
            selectedIcon={<Icon name="setting" size={26} color="#1870bc" />}
          >
            <SettingAccount
              nameRouteUserId={nameRouteUserId}
              listAccountBaby={listAccountBaby}
              isShowDeleteButton={true}
              setIsLoading={() => {
                setIsLoading(true);
                setTimeout(() => {
                  setIsLoading(false);
                }, 300);
              }}
            />
          </TabBar.Item>
        </TabBar>
      ) : (
        <LoadingData />
      )}
    </View>
  );
};

export default Home;
