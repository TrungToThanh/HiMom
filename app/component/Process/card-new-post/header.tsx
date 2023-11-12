import { SearchBar, Text, View } from "@ant-design/react-native";
import { faBell, faHouse, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React from "react";
import { StyleSheet } from "react-native";

type Props = {
  nameBabyUser: string;
};
export const HeaderNewPost = ({ nameBabyUser }: Props) => {
  return (
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
        <View style={styles.textButton}>
          <FontAwesomeIcon icon={faHouse} color="#1977F3" />
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
