import { Text, View } from "@ant-design/react-native";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React, { useCallback, useState } from "react";
import { FbProcessUpdateReact } from "../../../../../api/firebase/process/updateReact";

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
        display: "flex",
        flexDirection: "row",
        paddingLeft: 10,
      }}
      onTouchStart={handleReact}
    >
      <FontAwesomeIcon icon={faHeart} color="red" size={20} />
      <Text> {react}</Text>
    </View>
  );
};
