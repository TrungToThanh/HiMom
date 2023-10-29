import { ActionSheet, Button, Text, View } from "@ant-design/react-native";
import { faEllipsisVertical, faRemove, faTrash, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React from "react";
import { useWindowDimensions } from "react-native";
import { FbProcessDeleteAPost } from "../../../../../api/firebase/process/deleteAProcess";

type Props = {
  item: any;
  nameBabyUser: string;
  accountParentId: string;
  accountBabyId: string;
  setReload: () => void;
};
export const TitleProcess = ({
  item,
  nameBabyUser,
  accountParentId,
  accountBabyId,
  setReload,
}: Props) => {
  const { width } = useWindowDimensions();

  const showActionSheet = () => {
    const BUTTONS = ["Chỉnh sửa", "Xóa", "Thoát"];

    ActionSheet.showActionSheetWithOptions(
      {
        title: "Thao tác nhanh",
        message: "",
        options: BUTTONS,
        cancelButtonIndex: 2,
        destructiveButtonIndex: 2,
      },
      (buttonIndex: any) => {
        console.log(buttonIndex);
        FbProcessDeleteAPost({ accountBabyId, nameEvent: item?.nameEvent }).then(() => setReload());
      }
    );
  };

  return (
    <View
      style={{
        width: width - 20,
        display: "flex",
        flexDirection: "row",
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          margin: 5,
          borderWidth: 1,
          width: 25,
          borderRadius: 20,
          paddingLeft: 3,
          borderColor: "#b0aca8",
        }}
      >
        <FontAwesomeIcon icon={faUser} color="#4294ff" />
      </View>
      <View>
        <View
          style={{
            width: width - 55,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              fontSize: 14,
              fontWeight: "bold",
            }}
          >
            {item?.relationShip || ""}
            <Text style={{ color: "red" }}>{`  ${item?.status || ""}  `}</Text>
            <Text>{nameBabyUser}</Text>
          </Text>
          <Text onPress={showActionSheet}>
            <FontAwesomeIcon icon={faEllipsisVertical} color="green" />
          </Text>
        </View>

        <Text
          style={{
            fontSize: 12,
            fontWeight: "bold",
            color: "#b0aca8",
          }}
        >
          {item?.dateEvent}
        </Text>
      </View>
    </View>
  );
};
