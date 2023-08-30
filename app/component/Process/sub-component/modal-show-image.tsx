import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  Button,
  WhiteSpace,
  Pagination,
} from "@ant-design/react-native";
import * as ImagePicker from "expo-image-picker";
import { StyleSheet, useWindowDimensions, Image } from "react-native";

const locale = {
  prevText: "Lùi",
  nextText: "Tiến",
};

interface Props {
  listImage: any;
  isShowCurrentImage: boolean;
  setShowCurrentImage: () => void;
}

const ModalShowImage = ({
  listImage,
  isShowCurrentImage = false,
  setShowCurrentImage,
}: Props) => {
  const { width, height } = useWindowDimensions();
  const [isCurrentIndex, setCurrentIndex] = useState(0);

  return (
    <Modal
      visible={isShowCurrentImage}
      popup
      closable={false}
      maskClosable={true}
    >
      <View style={{ height: height }}>
        <WhiteSpace />
        <WhiteSpace />
        <Text
          style={{
            color: "#1870bc",
            fontSize: 16,
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Hình ảnh
        </Text>
        <WhiteSpace />
        <WhiteSpace />
        <Image
          // @ts-ignore
          source={{ uri: listImage?.at(isCurrentIndex).uri }}
          style={{
            height: 400,
            width: width,
          }}
          resizeMethod="auto"
          resizeMode="cover"
        />
        <Pagination
          total={listImage?.length || 0}
          current={isCurrentIndex + 1}
          locale={locale}
          onChange={(current) => {
            setCurrentIndex(current - 1);
          }}
          style={{ height: 20 }}
        />
        <Button style={{ bottom: 20 }} onPress={() => setShowCurrentImage()}>
          Thoát
        </Button>
      </View>
    </Modal>
  );
};

export default ModalShowImage;
