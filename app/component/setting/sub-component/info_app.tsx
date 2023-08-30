import React, { useMemo, useState } from "react";
import * as Device from "expo-device";
import { Text, View, WingBlank } from "@ant-design/react-native";
import * as Application from "expo-application";
import moment from "moment";

const InfoApp = () => {
  const [isDateInstall, setDateInstall] = useState<any>();
  const date = useMemo(async () => {
    return Application.getInstallationTimeAsync();
  }, []);

  date.then((item) => setDateInstall(item));

  console.log(isDateInstall);
  return (
    <View>
      <Text>Tên phần mềm: {Application.applicationName} </Text>
      <Text>Phiên bản: {Application.nativeBuildVersion} </Text>
      <Text>
        Ngày cài đặt: {moment(String(isDateInstall)).format("DD/MM/YYYY hh:mm")}{" "}
      </Text>
      <WingBlank />
      <Text>Tên nhà sản xuất: {Device.manufacturer}</Text>
      <Text>
        Tên thiết bị: {Device.deviceName} - {Device.modelName}
      </Text>
      <Text>
        Hệ điều hành: {Device.osName} - {Device.osVersion}
      </Text>
    </View>
  );
};
export default InfoApp;
