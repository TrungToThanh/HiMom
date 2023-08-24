import React from "react";
import { Image, ScrollView, Text } from "react-native";
import { Result, View } from "@ant-design/react-native";

const EmptyData = () => {
  return (
    <View>
      <Result
        imgUrl={{
          uri: "https://zos.alipayobjects.com/rmsportal/GcBguhrOdlYvGfnsXgrE.png",
        }}
        message="Không có dữ liệu"
      />
    </View>
  );
};

export default EmptyData;
