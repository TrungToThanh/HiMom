import { InputItem, Text, View, WhiteSpace, WingBlank } from "@ant-design/react-native";
import Input from "@ant-design/react-native/lib/input-item/Input";
import { faLocationArrow, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React from "react";
import { StyleSheet, useWindowDimensions } from "react-native";
import { GestureHandlerRootView, TextInput } from "react-native-gesture-handler";

export const ContentComment = (item) => {
  const { width } = useWindowDimensions();
  return (
    <GestureHandlerRootView>
      <View style={{ borderTopWidth: 1, borderColor: "#E5E8EB", marginTop: 10 }}>
        <WingBlank>
          <WhiteSpace />
          <View
            style={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <View style={styles.textButton}>
              <FontAwesomeIcon icon={faUser} />
            </View>
            <View>
              <Text style={{ fontWeight: "bold", fontSize: 12 }}> Bố Trung</Text>
              <Text style={{ fontWeight: "normal", fontSize: 11 }}> Jennie de thuong </Text>
            </View>
          </View>
          <View
            style={{
              borderColor: "#F8F9FA",
              borderWidth: 1,
              borderRadius: 16,
              marginTop: 5,
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Input placeholder="Nhập bình luận ..." style={{ paddingLeft: 4 }} />
            <View style={styles.textButton}>
              <FontAwesomeIcon icon={faLocationArrow} color="#1977F3" />
            </View>
          </View>
        </WingBlank>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  textButton: {
    backgroundColor: "white",
    width: 16,
    height: 16,
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
    borderRadius: 50,
    borderColor: "#CFD7ED",
    borderWidth: 1,
  },
});
