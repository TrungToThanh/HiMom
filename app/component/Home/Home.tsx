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
  faCheckSquare,
  faEye,
  faEyeSlash,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { getAllBabyInBabyList } from "../../../api/login/login";
import { useRoute } from "@react-navigation/native";
import MainShop from "../shopping/main_list_shopping";
import ProcessBaby from "../Process/Process";
import Account from "../Account/Account";
import {
  GestureHandlerRootView,
  RefreshControl,
  ScrollView,
} from "react-native-gesture-handler";
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
  library.add(faCheckSquare, faEye, faEyeSlash, faUser);
  const tabs = [
    { title: "Trang chủ" },
    { title: "Quá trình" },
    { title: "Mua sắm" },
    { title: "Tài khoản" },
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

  if (!listAccountBaby || listAccountBaby?.length < 1 || isLoading)
    return <LoadingData />;

  return (
    <GestureHandlerRootView>
      <View style={{ width: windowWidth }}>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <Tabs
            tabs={tabs}
            tabBarPosition="bottom"
            style={{ minHeight: windowHeight - 50 }}
          >
            <View style={styles.tabsStyle}>
              <Text>
                1 <ActivityIndicator />
              </Text>
            </View>
            <ProcessBaby
              nameRouteUserId={nameRouteUserId}
              listAccountBaby={listAccountBaby}
            />
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
