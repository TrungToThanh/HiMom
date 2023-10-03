import { Text, View } from "@ant-design/react-native";
import React from "react";
import { StyleSheet } from "react-native";
import { TextInput } from "react-native-gesture-handler";

export const ContentTextAdd = () => {
  return (
    <View style={styles.div}>
      <TextInput
        multiline
        textBreakStrategy="highQuality"
        style={styles.divContent}
        placeholder="Nhập nội dung"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  div: {
    borderColor: "green",
    borderWidth: 1,
    borderRadius: 6,
    margin: 5,
    paddingTop: 5,
  },
  divContent: {
    fontSize: 13,
    fontWeight: "400",
    marginLeft: 5,
    minHeight: 120,
  },
});
