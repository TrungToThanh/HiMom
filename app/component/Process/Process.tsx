import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
} from "react-native";
import {
  Button,
  InputItem,
  Card,
  WhiteSpace,
  DatePicker,
  Toast,
  WingBlank,
  Steps,
  Modal,
  TextareaItem,
  ActivityIndicator,
  Tag,
} from "@ant-design/react-native";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faCheckSquare,
  faCoffee,
  faTrash,
  faUser,
  faCalendar,
  faEdit,
  faAdd,
  faSeedling,
} from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";

import dayjs from "dayjs";

import CardHeader from "@ant-design/react-native/lib/card/CardHeader";
import { useNavigation } from "@react-navigation/native";
import CardBody from "@ant-design/react-native/lib/card/CardBody";
import {
  deleteAEvent,
  getAllEvent,
  insertANewEvent,
} from "../../../api/eventProcess/event";
import { ProcessBabyBase } from "../../const/type";
import CardHeaderComponent from "../shopping/sub-component/cardHeader";

interface Props {
  listAccountBaby?: any;
  nameRouteUserId?: number;
  isInfoComponent?: boolean;
  diffDay?: any;
  isDiffFirstDay?: any;
}
const ProcessBaby = ({
  listAccountBaby,
  nameRouteUserId,
  isInfoComponent = false,
  diffDay,
  isDiffFirstDay,
}: Props) => {
  library.add(
    faCheckSquare,
    faCoffee,
    faTrash,
    faUser,
    faCalendar,
    faEdit,
    faAdd,
    faSeedling
  );
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const Step = Steps.Step;
  const [isLoading, setIsLoading] = useState(false);
  //Get value date
  const now = dayjs().format("DD-MM-YYYYY");

  const isFirstDay = useMemo(() => {
    let dateObject = "";
    if (listAccountBaby) {
      let idCurrent = listAccountBaby?.find(
        (item) => Number(item.id) === Number(nameRouteUserId)
      );
      var dateParts = idCurrent?.birthday.split("-");

      // month is 0-based, that's why we need dataParts[1] - 1
      dateObject = dayjs(
        new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0])
      )
        .subtract(280, "days")
        .format("DD-MM-YYYY");
    }
    return dateObject;
  }, [listAccountBaby]);

  const isBirthday = useMemo(() => {
    let valueReturn = "";
    if (listAccountBaby) {
      let idCurrent = listAccountBaby?.find(
        (item) => Number(item.id) === Number(nameRouteUserId)
      );

      if (idCurrent) valueReturn = String(idCurrent?.birthday);
    }
    return valueReturn;
  }, [listAccountBaby, nameRouteUserId]);

  //Modal Add Event
  const [isShowEvent, setShowEvent] = useState<boolean>(false);
  const [nameEvent, setNameEvent] = useState<any>("");
  const [dateEvent, setDateEvent] = useState<any>("");
  const [desEvent, setDesEvent] = useState<any>("");
  const [noteEvent, setNoteEvent] = useState<any>("");
  const [isShowDatePicker, setIsShowDatePicker] = useState(false);

  const { listEvent } = getAllEvent();

  const listEventCook = useMemo(() => {
    const listEventCurrent = listEvent?.length > 0 ? listEvent : [];
    const isHasFirstDay = listEventCurrent?.find(
      (item) => Number(item.id) === -1
    );
    if (!isHasFirstDay)
      listEventCurrent?.unshift({
        id: -1,
        event: isFirstDay,
        description: "Nhịp đập đầu tiên!",
        status: "finish",
      });
    const isHasBirthDay = listEventCurrent?.find(
      (item) => Number(item.id) === 1000
    );
    if (!isHasBirthDay)
      listEventCurrent?.push(
        {
          id: 1000,
          event: now,
          description: "Hôm nay",
          status: "wait",
        },
        {
          id: 1001,
          event: isBirthday,
          description: "Oa oa",
          status: "wait",
        }
      );

    const newList = new Set(listEventCurrent);
    return Array.from(newList);
  }, [listEvent]);

  const handleAddEvent = () => {
    insertANewEvent(nameEvent, dateEvent, desEvent, noteEvent).then((isRes) => {
      setIsLoading(true);
      if (isRes) {
        Toast.success("Thêm sự kiện mới thành công!");
      } else {
        Toast.fail("Thất bại!");
      }
      setTimeout(() => {
        setIsLoading(false);
      }, 200);
    });
  };

  if (isInfoComponent) {
    return (
      <View
        style={{
          width: windowWidth,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginLeft: -20,
        }}
      >
        <Steps size="small" direction="horizontal">
          <Step
            key={0}
            title={<View></View>}
            description={
              <Text>
                <Button size="small" type="ghost">
                  <Text>{isFirstDay}</Text>
                </Button>
              </Text>
            }
            status={"finish"}
          />
          <Step
            key={1111}
            title={
              <View>
                <Text> </Text>
              </View>
            }
            description={
              <Text>
                <Button size="small" type="ghost">
                  <Text>{isDiffFirstDay} ngày</Text>
                </Button>
              </Text>
            }
            status={"wait"}
          />
          <Step
            key={22222}
            title={<View></View>}
            description={
              <Text>
                <Button size="small" type="ghost">
                  <Text>Còn {diffDay} ngày</Text>
                </Button>
              </Text>
            }
            status={"wait"}
          />
        </Steps>
      </View>
    );
  }

  return (
    <View
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <WhiteSpace />
      <Card
        style={{
          width: windowWidth - 10,
          height: windowHeight - 60,
        }}
      >
        <CardHeader
          title={
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text
                style={{ color: "green", fontSize: 16, fontWeight: "bold" }}
              >
                <FontAwesomeIcon icon={faSeedling} color="green" />
                Quá trình phát triển:
              </Text>
              <Button
                size="small"
                type="ghost"
                onPress={() => setShowEvent(true)}
              >
                <FontAwesomeIcon size={14} icon={faAdd} />
                <Text style={{ fontSize: 12, fontWeight: "400" }}>
                  Thêm sự kiện
                </Text>
              </Button>
            </View>
          }
        ></CardHeader>
        <CardBody>
          <ScrollView>
            <View>
              <WingBlank size="md">
                <Steps>
                  {listEventCook &&
                    listEventCook?.length > 0 &&
                    listEventCook?.map((item: ProcessBabyBase, index) => {
                      return (
                        <Step
                          key={item?.id}
                          title={
                            <View
                              style={{
                                flex: 0.3,
                                flexDirection: "row",
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                width: 0.8 * windowWidth,
                              }}
                            >
                              <Text
                                style={{ fontSize: 15, fontWeight: "bold" }}
                              >
                                {item?.event}
                              </Text>
                              {+item.id !== -1 &&
                                +item.id !== 1000 &&
                                +item.id !== 1001 && (
                                  <Button
                                    type="ghost"
                                    size="small"
                                    onPress={() => {
                                      Modal.alert(
                                        "Xóa sự kiện",
                                        "Bạn có thật sự muốn xóa sự kiện này?",
                                        [
                                          {
                                            text: "Thoát",
                                            style: "cancel",
                                          },
                                          {
                                            text: "Xóa",
                                            onPress: () =>
                                              deleteAEvent(item.id).then(
                                                (isRes) => {
                                                  if (isRes) {
                                                    Toast.success(
                                                      "Xóa thành công!"
                                                    );
                                                  } else {
                                                    Toast.fail("Xóa thất bại!");
                                                  }
                                                }
                                              ),
                                          },
                                        ]
                                      );
                                    }}
                                  >
                                    Xóa
                                  </Button>
                                )}
                            </View>
                          }
                          description={item?.description}
                          status={item?.status || "finish"}
                        />
                      );
                    })}
                </Steps>
              </WingBlank>
            </View>
          </ScrollView>
        </CardBody>
      </Card>
      <Modal
        style={{
          width: windowWidth - 10,
        }}
        popup={true}
        visible={isShowEvent}
        transparent
        animationType="fade"
        title={
          <Text style={{ color: "#1870bc", fontSize: 16, fontWeight: "bold" }}>
            Thêm sự kiện
          </Text>
        }
        footer={[
          {
            text: "Thoát",
            onPress: () => setShowEvent(false),
            style: "cancel",
          },
          {
            text: "Thêm",
            onPress: () => {
              setShowEvent(false);
              handleAddEvent();
            },
          },
        ]}
      >
        <View
          style={{
            width: windowWidth,
            display: "flex",
            justifyContent: "flex-start",
            marginTop: 10,
          }}
        >
          <Text style={{ fontSize: 14, fontWeight: "bold", paddingTop: 10 }}>
            Tên sự kiện:
          </Text>
          <InputItem
            placeholder="Tên sự kiện"
            multiline
            textBreakStrategy="highQuality"
            onChangeText={(value) => setNameEvent(value?.trim())}
            style={{
              borderBottomWidth: 1,
              borderColor: "#1870bc",
              marginRight: 50,
            }}
          ></InputItem>
          <Text style={{ fontSize: 14, fontWeight: "bold", paddingTop: 10 }}>
            Ngày xảy ra sự kiện:
          </Text>
          <InputItem
            editable={false}
            placeholder="Ngày xảy ra sự kiện"
            value={dateEvent}
            style={{ borderBottomWidth: 1, borderColor: "#1870bc" }}
            extra={
              <Button
                onPress={() => setIsShowDatePicker(true)}
                style={{ borderColor: "white" }}
              >
                <FontAwesomeIcon icon={["fas", "calendar"]} />
              </Button>
            }
          ></InputItem>
          <DatePicker
            visible={isShowDatePicker}
            mode="date"
            value={new Date()}
            minDate={new Date(2015, 7, 6)}
            maxDate={new Date(2026, 11, 3)}
            format="YYYY-MM-DD"
            okText="Chọn"
            dismissText="Thoát"
            onOk={() => setIsShowDatePicker(false)}
            onDismiss={() => setIsShowDatePicker(false)}
            onChange={(value) =>
              setDateEvent(dayjs(value).format("DD-MM-YYYY"))
            }
          ></DatePicker>
          <Text style={{ fontSize: 14, fontWeight: "bold", paddingTop: 10 }}>
            Mô tả sự kiện:
          </Text>
          <InputItem
            placeholder="Mô tả sự kiện"
            multiline
            onChangeText={(value) => setDesEvent(value?.trim())}
            style={{
              borderBottomWidth: 1,
              borderColor: "#1870bc",
              marginRight: 50,
            }}
          ></InputItem>
          <Text style={{ fontSize: 14, fontWeight: "bold", paddingTop: 10 }}>
            Ghi chú:
          </Text>
          <InputItem
            placeholder="Ghi chú"
            multiline
            onChangeText={(value) => setNoteEvent(value?.trim())}
            style={{
              borderBottomWidth: 1,
              borderColor: "#1870bc",
              marginRight: 50,
            }}
          ></InputItem>
        </View>
      </Modal>
    </View>
  );
};

export default ProcessBaby;

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  logo: {
    width: 66,
    height: 58,
  },
});
