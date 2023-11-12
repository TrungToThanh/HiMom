import { Text, View } from "@ant-design/react-native";
import { faHeart, faMessage, faShare, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React, { useCallback, useState } from "react";
import { FbProcessUpdateReact } from "../../../../../api/firebase/process/updateReact";
import { StyleSheet } from "react-native";

type Props = {
  item: any;
  accountBabyId: string;
};

export const ContentReact = ({ item, accountBabyId }: Props) => {
  const [react, setReact] = useState(Number(item?.react) || 99);

  const handleReact = useCallback(() => {
    const newReact = Number(react) + 1;
    setReact(newReact);
    FbProcessUpdateReact({ accountBabyId, newReact, nameEvent: item.nameEvent });
  }, [react]);

  return (
    <View
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingLeft: 10,
      }}
    >
      <View style={styles.groupButtonAction}>
        <View style={styles.textButton} onTouchStart={handleReact}>
          <FontAwesomeIcon icon={faThumbsUp} color="#2D3F7B" />
        </View>
        <View style={styles.textButton}>
          <FontAwesomeIcon icon={faMessage} color="#2D3F7B" />
        </View>
        <View style={styles.textButton}>
          <FontAwesomeIcon icon={faShare} color="#2D3F7B" />
        </View>
      </View>
      <View
        style={{
          width: 80,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          textAlign: "right",
          right: 0,
        }}
      >
        <Text style={{ width: 30 }}> {react}</Text>
        <View
          style={{
            width: 50,
            display: "flex",
            flexDirection: "row",
            textAlign: "right",
            right: 0,
          }}
        >
          <View style={styles.likeButton}>
            <FontAwesomeIcon icon={faThumbsUp} color="white" />
          </View>
          <View style={styles.heartButton}>
            <FontAwesomeIcon icon={faHeart} color="white" />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 50,
    width: "98%",
    backgroundColor: "white",
    borderRadius: 14,
    margin: 5,
    padding: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  groupButtonAction: {
    width: "30%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
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
  likeButton: {
    backgroundColor: "#1977F3",
    width: 14,
    height: 14,
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
    borderRadius: 50,
    borderColor: "#F8F9FA",
    borderWidth: 1,
    marginRight: -4,
  },
  heartButton: {
    backgroundColor: "red",
    width: 14,
    height: 14,
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
    borderRadius: 50,
    borderColor: "#F8F9FA",
    borderWidth: 1,
  },
});
