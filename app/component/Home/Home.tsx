import React, { useCallback, useMemo, useState } from "react";
import { Text, View, useWindowDimensions } from "react-native";

import { TabBar, Icon, Toast } from "@ant-design/react-native";
import CalendarStrip from "react-native-calendar-strip";

import { getAllBabyInBabyList } from "../../../api/login/login";
import { useRoute } from "@react-navigation/native";
import ProcessBaby from "../process/process";

import LoadingData from "../../const/loading";
import SettingAccount from "../setting/setting";
import ReminderComponent from "../reminder/reminder";
import HomeListShopping from "../shopping/home_list_shopping";
import { getAllEvent } from "../../../api/eventProcess/event";
import { useFocusEffect } from "@react-navigation/native";

const Home = () => {
  const route = useRoute();

  const { width, height } = useWindowDimensions();

  const [selectedTab, setSelectedTab] = useState("process");

  const accountParentId = useMemo(() => {
    if (route) {
      /* @ts-ignore */
      return route?.params?.accountParentId;
    }
  }, [route]);

  const accountBabyId = useMemo(() => {
    if (route) {
      /* @ts-ignore */
      return route?.params?.accountBabyId;
    }
  }, [route]);

  if (!accountParentId || !accountBabyId)
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  return (
    <View style={{ width: width, height: height }}>
      <TabBar unselectedTintColor="black" barTintColor="white">
        <TabBar.Item
          title={"Hành trình"}
          icon={<Icon name="home" />}
          selected={selectedTab === "process"}
          onPress={() => setSelectedTab("process")}
          selectedIcon={<Icon name="home" size={26} color="#1870bc" />}
        >
          <ProcessBaby accountParentId={accountParentId} accountBabyId={accountBabyId} />
        </TabBar.Item>
        <TabBar.Item
          title="Chuẩn bị"
          icon={<Icon name="shopping" />}
          selected={selectedTab === "shopping"}
          onPress={() => setSelectedTab("shopping")}
          selectedIcon={<Icon name="shopping" size={26} color="#1870bc" />}
        >
          {/* <HomeListShopping nameRouteUserId={nameRouteUserId} /> */}
        </TabBar.Item>
        <TabBar.Item
          title="Nhắc nhở"
          icon={<Icon name="ordered-list" />}
          selected={selectedTab === "reminder"}
          onPress={() => setSelectedTab("reminder")}
          selectedIcon={<Icon name="ordered-list" size={26} color="#1870bc" />}
        >
          {/* <ReminderComponent isUserId={nameRouteUserId} /> */}
        </TabBar.Item>
        <TabBar.Item
          title="Cài đặt"
          icon={<Icon name="setting" />}
          selected={selectedTab === "setting"}
          onPress={() => setSelectedTab("setting")}
          selectedIcon={<Icon name="setting" size={26} color="#1870bc" />}
        >
          {/* <SettingAccount
            nameRouteUserId={nameRouteUserId}
            listAccountBaby={listAccountBaby}
            isShowDeleteButton={true}
            setIsLoading={() => {
              setIsLoading(true);
              setTimeout(() => {
                setIsLoading(false);
              }, 300);
            }}
          /> */}
        </TabBar.Item>
      </TabBar>
    </View>
  );
};

export default Home;
