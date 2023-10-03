import React from "react";
import { View } from "@ant-design/react-native";
import { faImages, faVideoCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { StyleSheet, Text, useWindowDimensions } from "react-native";
import { Image } from "expo-image";

export const ContentAttachmentAdd = () => {
  const { width } = useWindowDimensions();
  const video = React.useRef(null);

  return (
    <View style={styles.divUpload}>
      <View style={styles.buttonUpload}>
        <Text> Đính kèm ảnh/video </Text>
        <FontAwesomeIcon icon={faImages} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  divUpload: {
    height: 30,
    borderColor: "green",
    borderWidth: 1,
    borderRadius: 6,
    margin: 5,
    padding: 5,
  },
  buttonUpload: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
