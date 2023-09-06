import React, { useCallback, useEffect, useMemo, useState } from "react";

import _ from "lodash";

import {
  ActivityIndicator,
  Button,
  Result,
  SegmentedControl,
  Text,
  View,
  WhiteSpace,
} from "@ant-design/react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, GestureHandlerRootView } from "react-native-gesture-handler";

import { ImageBackground, useWindowDimensions } from "react-native";
import ReminderCalendar from "./sub-component/reminder-calendar";
import ReminderList from "./sub-component/reminder-list";

interface Props {
  isUserId: number;
}

const ReminderComponent = ({ isUserId }: Props) => {
  const image = require("../../../assets/background.jpg");
  const { width, height } = useWindowDimensions();
  const [isPanelActive, setPanelActive] = useState<any>(0);
  return (
    <GestureHandlerRootView>
      <SafeAreaView>
        <ImageBackground source={image} resizeMode="cover" style={{ width: width, height: height }}>
          <View
            style={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "transparent",
            }}
          >
            <Text
              style={{
                marginTop: 20,
                color: "#1870bc",
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              Nhắc nhở
            </Text>
            <WhiteSpace />
            <SegmentedControl
              selectedIndex={isPanelActive}
              values={["Lịch", "Danh mục"]}
              style={{ width: 200 }}
              onChange={(e) => setPanelActive(e.nativeEvent.selectedSegmentIndex)}
            />
          </View>
          <View>
            {isPanelActive == 0 ? <ReminderCalendar /> : <ReminderList isUserId={isUserId} />}
          </View>
        </ImageBackground>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default ReminderComponent;
