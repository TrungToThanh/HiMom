import React, { useMemo, useState } from "react";
import * as Device from "expo-device";
import { List, Text, View, WingBlank } from "@ant-design/react-native";
import * as Application from "expo-application";
import dayjs from "dayjs";
import * as Network from "expo-network";
import { Platform } from "react-native";

const InfoApp = () => {
  const Item = List.Item;

  const [isDateInstall, setDateInstall] = useState<any>();
  const date = useMemo(async () => {
    return Application.getInstallationTimeAsync();
  }, []);

  date.then((item) => setDateInstall(item));

  const isNetworkStatus = useMemo(async () => {
    return (await Network.getNetworkStateAsync()).isConnected;
  }, []);

  const uniqueId =
    Platform.OS === "ios" ? Application.getIosIdForVendorAsync() : Application.androidId;

  return (
    <View>
      <Item extra={String(uniqueId)}>Mã số:</Item>
      <Item extra={Application.applicationName}>Tên phần mềm:</Item>
      <Item extra={Application.nativeBuildVersion}>Phiên bản ứng dụng:</Item>
      <Item extra={dayjs(String(isDateInstall)).format("DD/MM/YYYY hh:mm")}>Ngày cài đặt:</Item>
      <WingBlank />
      <Item extra={Device.manufacturer}>Tên nhà sản xuất:</Item>
      <Item extra={Device.deviceName}>Tên thiết bị:</Item>
      <Item extra={Device.osName}>Hệ điều hành:</Item>
      <Item extra={Device.osVersion}>Phiên bản os:</Item>
    </View>
  );
};
export default InfoApp;
