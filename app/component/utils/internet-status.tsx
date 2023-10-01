import React from "react";
import { Result, View } from "@ant-design/react-native";

function InternetStatus(isInternetStatus) {
  if (!isInternetStatus)
    return (
      <View>
        <Result
          imgUrl={{
            uri: "https://zos.alipayobjects.com/rmsportal/GcBguhrOdlYvGfnsXgrE.png",
          }}
          title="Trạng thái kết nối!"
          message="Không thể kết nối! Vui lòng kiểm tra lại kết nối Internet của bạn!"
        />
      </View>
    );
  return <></>;
}

export default InternetStatus;
