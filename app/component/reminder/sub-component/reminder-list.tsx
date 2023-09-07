import {
  Accordion,
  ActionSheet,
  Button,
  Checkbox,
  List,
  Modal,
  Result,
  Text,
  Toast,
  View,
  WhiteSpace,
} from "@ant-design/react-native";
import { faAdd, faArrowCircleDown, faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React, { useMemo, useState } from "react";
import { useWindowDimensions } from "react-native";
import ModalAddReminder from "./modal-add-reminder";
import {
  deleteAReminder,
  getAllEventReminder,
  updateEventReminder,
} from "../../../../api/reminder/reminder";
import _ from "lodash";
import LoadingData from "../../../const/loading";

interface Props {
  isUserId: number;
}
const ReminderList = ({ isUserId }: Props) => {
  const image = require("../../../../assets/mother.png");
  const Item = List.Item;
  const { width, height } = useWindowDimensions();
  const [isShowModal, setShowModal] = useState(false);
  const [activePanel, setActivePanel] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);
  const { listReminderTodo } = getAllEventReminder(isUserId, isLoading);

  const listRender = useMemo(() => {
    if (!listReminderTodo || listReminderTodo?.length < 1) return undefined;

    const groupList = _.groupBy(listReminderTodo, "type");

    const keyList = Object.keys(groupList);
    const valueList = Object.values(groupList);
    const list = keyList?.map((value, indexValue) => {
      return [
        {
          title: value,
          data: valueList[indexValue],
        },
      ];
    });

    return list?.length > 0 ? list : undefined;
  }, [listReminderTodo, isLoading]);

  if (isLoading)
    return (
      <View>
        <LoadingData />
      </View>
    );
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
          backgroundColor: "transparent",
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
        >
          <FontAwesomeIcon icon={faAdd} />
          <Text style={{ fontSize: 13, fontWeight: "500" }}>Thêm nhắc nhở</Text>
        </Button>
      </View>

      <View
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          width: width - 20,
          backgroundColor: "transparent",
        }}
      >
        {listRender?.length > 0 ? (
          <Accordion
            style={{ width: width, backgroundColor: "transparent", marginLeft: -10 }}
            activeSections={activePanel}
            onChange={(value) => setActivePanel(value)}
          >
            {listRender?.map((item, index) => {
              const data: any = item?.at(0)?.data;
              return (
                <Accordion.Panel
                  header={
                    <View
                      style={{
                        width: "100%",
                        height: 40,
                        display: "flex",
                        justifyContent: "center",
                        marginLeft: -15,
                        backgroundColor: "transparent",
                      }}
                    >
                      <Text style={{ fontSize: 14, fontWeight: "800", marginLeft: 10 }}>
                        {`${index + 1}. ${item?.at(0)?.title}`}
                      </Text>
                    </View>
                  }
                  key={String(index + 1)}
                >
                  {data &&
                    data?.map((detailItem, index) => {
                      return (
                        <Item
                          key={index}
                          style={{
                            width: "110%",
                            height: 40,
                            backgroundColor: "transparent",
                            marginLeft: -10,
                            marginRight: -10,
                          }}
                          extra={
                            <View
                              style={{ backgroundColor: "transparent" }}
                              onTouchStart={() => {
                                ActionSheet.showActionSheetWithOptions(
                                  {
                                    options: ["Xóa", "Thoát"],
                                    cancelButtonIndex: 1,
                                    destructiveButtonIndex: 0,
                                  },
                                  (index) => {
                                    if (index === 0) {
                                      Modal.alert("Xóa ghi chú", "Bạn muốn xóa mục này?", [
                                        { text: "Thoát", style: "cancel" },
                                        {
                                          text: "Đồng ý",
                                          onPress: () => {
                                            deleteAReminder(isUserId, detailItem?.id).then(
                                              (isRes) => {
                                                if (isRes) {
                                                  Toast.success("Xóa thành công!");
                                                  setTimeout(() => {
                                                    setIsLoading(true);
                                                  }, 100);
                                                  setTimeout(() => {
                                                    setIsLoading(false);
                                                  }, 300);
                                                } else {
                                                  Toast.fail("Xóa thất bại!");
                                                }
                                              }
                                            );
                                          },
                                        },
                                      ]);
                                    }
                                  }
                                );
                              }}
                            >
                              <FontAwesomeIcon icon={faEllipsisV} />
                            </View>
                          }
                        >
                          <View
                            style={{
                              width: width - 50,
                              display: "flex",
                              flexDirection: "row",
                              backgroundColor: "transparent",
                            }}
                          >
                            <Checkbox
                              style={{ width: 30 }}
                              defaultChecked={Boolean(detailItem?.done)}
                              onChange={(value) => {
                                updateEventReminder(
                                  isUserId,
                                  value?.target?.checked,
                                  detailItem?.id
                                );
                              }}
                            />
                            <Text>{`${detailItem?.name}:`}</Text>
                          </View>
                        </Item>
                      );
                    })}
                </Accordion.Panel>
              );
            })}
          </Accordion>
        ) : (
          <Result
            imgUrl={image}
            title=""
            message="Không có ghi chú"
            style={{ backgroundColor: "transparent" }}
          />
        )}
      </View>
      <WhiteSpace />
    </View>
  );
};

export default ReminderList;
