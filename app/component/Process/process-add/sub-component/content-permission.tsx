import { Checkbox, Text, View } from "@ant-design/react-native";
import React from "react";
import { StyleSheet } from "react-native";
import { TextInput } from "react-native-gesture-handler";

export const ContentPermissionAdd = () => {
  return (
    <View style={styles.div}>
      <View style={styles.divUpload}>
        <Text>Cho phép bình luận</Text>
        <Checkbox />
      </View>
      <View style={styles.divUpload}>
        <Text>Cho phép thả tim</Text>
        <Checkbox />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  div: {
    height: 50,
    borderColor: "green",
    borderWidth: 1,
    borderRadius: 6,
    margin: 5,
    paddingTop: 5,
  },
  divUpload: {
    display: "flex",
    flexDirection: "row",
    paddingLeft: 5,
    justifyContent: "space-between",
  },
});
