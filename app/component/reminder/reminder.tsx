import React, { useCallback, useEffect, useMemo, useState } from "react";

import _ from "lodash";

import { SegmentedControl, Text, View, WhiteSpace } from "@ant-design/react-native";

import { GestureHandlerRootView } from "react-native-gesture-handler";

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
      <View>
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
              values={["Danh mục", "Lịch"]}
              style={{ width: 200, backgroundColor: "transparent" }}
              onChange={(e) => setPanelActive(e.nativeEvent.selectedSegmentIndex)}
            />
          </View>
          <View style={{ backgroundColor: "transparent" }}>
            {isPanelActive === 0 ? <ReminderList isUserId={isUserId} /> : <ReminderCalendar />}
          </View>
        </ImageBackground>
      </View>
    </GestureHandlerRootView>
  );
};

export default ReminderComponent;
