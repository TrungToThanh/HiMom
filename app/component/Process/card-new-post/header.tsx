import { Drawer, SearchBar, Text, View } from "@ant-design/react-native";
import { faBell, faHouse, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React from "react";
import { Image, StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

type Props = {
  nameBabyUser: string;
  setIsShowDrawer: () => void;
  avatar: string;
};
export const HeaderNewPost = ({ nameBabyUser, setIsShowDrawer, avatar }: Props) => {
  return (
    <GestureHandlerRootView>
      <View
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 10,
          borderBottomColor: "#E5E8EB",
          borderBottomWidth: 1,
          backgroundColor: "white",
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View style={styles.textButton} onTouchStart={setIsShowDrawer}>
            {avatar ? (
              <Image
                source={{ uri: `data:image/png;base64,${avatar}` }}
                resizeMethod="auto"
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: 10,
                  padding: 10,
                }}
                resizeMode="center"
              />
            ) : (
              <FontAwesomeIcon icon={faHouse} color="#1977F3" />
            )}
          </View>
          <Text style={{ color: "#2D3F7B", fontSize: 20, fontWeight: "bold", paddingLeft: 8 }}>
            {nameBabyUser || ""}
          </Text>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 8,
          }}
        >
          <View style={styles.textButton}>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </View>
          <View style={styles.textButton}>
            <FontAwesomeIcon icon={faBell} color="#2D3F7B" />
          </View>
        </View>
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
