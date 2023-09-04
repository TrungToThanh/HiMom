import React, { useCallback, useMemo, useState } from "react";
import { View, Text, StyleSheet, useWindowDimensions } from "react-native";

import { Tabs, ActivityIndicator } from "@ant-design/react-native";

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
import InfoCommon from "../info/info";
import ReminderComponent from "../reminder/reminder";
import HomeListShopping from "../shopping/home_list_shopping";
import { getAllEvent } from "../../../api/eventProcess/event";

const Home = () => {
  const route = useRoute();
  const [isLoading, setIsLoading] = useState(false);
  const { height } = useWindowDimensions();
  const [loadingAgain, setLoadingAgain] = useState(false);

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

  if (!listAccountBaby || listAccountBaby?.length < 1 || isLoading) return <LoadingData />;

  return (
    <Tabs
      tabs={tabs}
      tabBarPosition="bottom"
      swipeable={false}
      usePaged={false}
      style={{ maxHeight: height - 70 }}
    >
      <ProcessBaby
        nameRouteUserId={nameRouteUserId}
        listAccountBaby={listAccountBaby}
        listEvent={listEvent}
        setLoadingAgain={(value) => setLoadingAgain(value)}
      />
      <HomeListShopping nameRouteUserId={nameRouteUserId} listAccountBaby={listAccountBaby} />
      <ReminderComponent />

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
    </Tabs>
  );
};

export default Home;
