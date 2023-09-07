import React from "react";
import { Result, View } from "@ant-design/react-native";

const EmptyData = () => {
  const image = require("../../assets/pics/momStore.png");
  return (
    <View>
      <Result
        imgUrl={image}
        message="Không có dữ liệu"
        style={{ backgroundColor: "transparent" }}
      />
    </View>
  );
};

export default EmptyData;
