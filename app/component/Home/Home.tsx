import React, { useCallback, useMemo, useState } from "react";
import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
import {
  Radio,
  Tabs,
  InputItem,
  Card,
  WhiteSpace,
  Toast,
  ActivityIndicator,
} from "@ant-design/react-native";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faBasketShopping,
  faCheckSquare,
  faEye,
  faEyeSlash,
  faHomeUser,
  faSeedling,
  faStore,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { getAllBabyInBabyList } from "../../../api/login/login";
import { useRoute } from "@react-navigation/native";
import MainShop from "../shopping/main_list_shopping";
import ProcessBaby from "../process/process";
import Account from "../account/account";
import { GestureHandlerRootView, RefreshControl, ScrollView } from "react-native-gesture-handler";
import LoadingData from "../../const/loading";

const Home = () => {
  const route = useRoute();
  const [isLoading, setIsLoading] = useState(false);

  const nameRouteUserId = useMemo(() => {
    if (route) {
      /* @ts-ignore */
      return route?.params?.userId;
    }
  }, []);

  const { listAccountBaby } = getAllBabyInBabyList();
  library.add(faCheckSquare, faEye, faEyeSlash, faUser, faBasketShopping, faHomeUser, faSeedling);
  const tabs = [
    {
      title: (
        <View style={{ justifyContent: "center", alignItems: "center", alignSelf: "center" }}>
          <FontAwesomeIcon icon={faHomeUser} />
          <Text>Trang chủ</Text>
        </View>
      ),
    },
    {
      title: (
        <View style={{ justifyContent: "center", alignItems: "center", alignSelf: "center" }}>
          <FontAwesomeIcon icon={faSeedling} color="green" />
          <Text>Quá trình</Text>
        </View>
      ),
    },
    {
      title: (
        <View style={{ justifyContent: "center", alignItems: "center", alignSelf: "center" }}>
          <FontAwesomeIcon icon={faBasketShopping} color="#e28743" />
          <Text>Chuẩn bị</Text>
        </View>
      ),
    },
    {
      title: (
        <View style={{ justifyContent: "center", alignItems: "center", alignSelf: "center" }}>
          <FontAwesomeIcon icon={faUser} color="#1870bc" />
          <Text>Tài khoản</Text>
        </View>
      ),
    },
  ];
  const RadioItem = Radio.RadioItem;
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  const [showProcess, setShowProcess] = useState(true);
  const [showMainList, setShowMainList] = useState(true);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  if (!listAccountBaby || listAccountBaby?.length < 1 || isLoading) return <LoadingData />;

  return (
    <GestureHandlerRootView>
      <View style={{ width: windowWidth }}>
        <ScrollView
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
          <Tabs tabs={tabs} tabBarPosition="bottom" style={{ minHeight: windowHeight - 50 }}>
            <View style={styles.tabsStyle}>
              <Text>
                1 <ActivityIndicator />
              </Text>
            </View>
            <ProcessBaby nameRouteUserId={nameRouteUserId} listAccountBaby={listAccountBaby} />
            {showMainList ? (
              <MainShop
                nameRouteUserId={nameRouteUserId}
                listAccountBaby={listAccountBaby}
                isShowDeleteButton={true}
                setIsLoading={() => undefined}
              />
            ) : (
              <LoadingData />
            )}

            <Account
              nameRouteUserId={nameRouteUserId}
              listAccountBaby={listAccountBaby}
              isShowDeleteButton={true}
              setIsLoading={() => {
                onRefresh();
                // setIsLoading(true);
                // setTimeout(() => {
                //   setIsLoading(false);
                // }, 300);
              }}
            />
          </Tabs>
        </ScrollView>
      </View>
    </GestureHandlerRootView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  logo: {
    width: 66,
    height: 58,
  },
  tabsStyle: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
