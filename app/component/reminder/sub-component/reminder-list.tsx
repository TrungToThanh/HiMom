import { Button, Checkbox, Text, View, WhiteSpace } from "@ant-design/react-native";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React, { useMemo, useState } from "react";
import { useWindowDimensions } from "react-native";
import ModalAddReminder from "./modal-add-reminder";
import { getAllEventReminder } from "../../../../api/reminder/reminder";
import _ from "lodash";

interface Props {
  isUserId: number;
}
const ReminderList = ({ isUserId }: Props) => {
  const { width, height } = useWindowDimensions();
  const [isShowModal, setShowModal] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const { listReminderTodo } = getAllEventReminder(isUserId, isLoading);

  const listRender = useMemo(() => {
    let list: any;
    if (listReminderTodo?.length > 0) {
      const groupList = _.groupBy(listReminderTodo, "type");
      const keyList = Object.keys(groupList);
      const valueList = Object.values(groupList);
      list = keyList?.map((value, indexValue) => {
        return [
          {
            title: value,
            data: valueList[indexValue],
          },
        ];
      });
      console.log("listReminderTodo", list);
    }

    return list?.length > 0 ? list : undefined;
  }, [listReminderTodo]);
  return (
    <View
      style={{
        display: "flex",
        alignItems: "center",
        backgroundColor: "transparent",
      }}
    >
      <ModalAddReminder
        isUserId={isUserId}
        isShowModal={isShowModal}
        setShowModal={() => setShowModal(false)}
        setIsLoading={(value) => setIsLoading(value)}
      />
      <WhiteSpace size="xl" />
      <View
        style={{
          width: width - 20,
          display: "flex",
          alignSelf: "center",
          justifyContent: "space-between",
          flexDirection: "row",
          marginBottom: 10,
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: "bold", color: "#1870bc" }}>
          Danh sách nhắc nhở:
        </Text>
        <Button
          type="ghost"
          size="small"
          style={{ width: 110, backgroundColor: "transparent" }}
          onPress={() => setShowModal(true)}
          //   disabled={isDisableButtonEvent}
        >
          <FontAwesomeIcon icon={faAdd} />
          <Text style={{ fontSize: 13, fontWeight: "500" }}>Thêm nhắc nhở</Text>
        </Button>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          width: width - 20,
          borderColor: "#1870bc",
          borderWidth: 1,
          borderRadius: 5,
        }}
      >
        <Text
          style={{
            width: 50,
            borderColor: "#1870bc",
            borderRightWidth: 1,
            fontSize: 14,
            fontWeight: "600",
            marginRight: 10,
            marginLeft: 10,
          }}
        >
          Đã làm
        </Text>
        <Text
          style={{
            fontSize: 14,
            fontWeight: "600",
            marginRight: 10,
          }}
        >
          Nội dung
        </Text>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          width: width - 20,
        }}
      >
        {listRender?.length > 0 &&
          listRender?.map((item) => {
            console.log("item", item);
            const data = item?.at(0)?.data;
            return (
              <View>
                <WhiteSpace />
                <Text
                  style={{
                    width: width - 20,
                    color: "#1870bc",
                    fontSize: 16,
                    fontWeight: "900",
                  }}
                >
                  Thể loại: {item?.at(0)?.title}{" "}
                </Text>
                <WhiteSpace />
                <View>
                  {data &&
                    data?.map((detailItem, index) => {
                      return (
                        <View
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            height: 40,
                            alignContent: "center",
                            alignItems: "center",
                            borderColor: "#1870bc",
                            borderWidth: 1,
                            borderRadius: 10,
                            marginTop: 10,
                          }}
                        >
                          <Checkbox style={{ width: 50, marginLeft: 20 }} />
                          <Text> {detailItem?.name}</Text>
                        </View>
                      );
                    })}
                </View>
              </View>
            );
          })}
      </View>
      <WhiteSpace />
    </View>
  );
};

export default ReminderList;
