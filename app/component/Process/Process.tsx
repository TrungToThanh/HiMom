import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
  ImageBackground,
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
  SwipeAction,
  List,
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
  faCheck,
  faCircle,
  faHandsClapping,
  faClose,
} from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";

import dayjs from "dayjs";
import CalendarStrip from "react-native-calendar-strip";
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
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import moment from "moment";

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
  const datesWhitelist = [
    {
      start: moment().subtract(10, "days"),
      end: moment().add(365, "days"), // total 4 days enabled
    },
  ];

  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const image = require("../../../assets/background.jpg");

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
  }, [listAccountBaby, isLoading]);

  const isBirthday = useMemo(() => {
    let valueReturn = "";
    if (listAccountBaby) {
      let idCurrent = listAccountBaby?.find(
        (item) => Number(item.id) === Number(nameRouteUserId)
      );

      if (idCurrent) valueReturn = String(idCurrent?.birthday);
    }
    return valueReturn;
  }, [listAccountBaby, nameRouteUserId, isLoading]);

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
  }, [listEvent, isLoading]);

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

  const right = [
    {
      text: <FontAwesomeIcon icon={faTrash} color="white" />,
      backgroundColor: "red",
      color: "white",
    },
  ];

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
            title={
              <View>
                <Text>Xuất phát:</Text>
              </View>
            }
            description={
              <Text>
                <Button size="small" type="ghost">
                  <Text>{isFirstDay}</Text>
                </Button>
              </Text>
            }
            status={"finish"}
            renderIcon={() => (
              <FontAwesomeIcon icon={faCheck} size={14} color="#1870bc" />
            )}
          />
          <Step
            key={1111}
            title={
              <View>
                <WhiteSpace />
                <Text>Cùng nhau:</Text>
              </View>
            }
            description={
              <Text>
                <Button size="small" type="ghost">
                  <Text style={{ color: "green", fontWeight: "600" }}>
                    {isDiffFirstDay}
                  </Text>
                  <Text> ngày</Text>
                </Button>
              </Text>
            }
            status={"wait"}
            renderIcon={() => (
              <FontAwesomeIcon icon={faSeedling} color="green" size={14} />
            )}
          />
          <Step
            key={22222}
            title={
              <View>
                <Text>Dự kiến:</Text>
              </View>
            }
            description={
              <Text>
                <Button size="small" type="ghost">
                  <Text style={{ color: "#faad00", fontWeight: "600" }}>
                    {diffDay}
                  </Text>
                  <Text> ngày nữa!</Text>
                </Button>
              </Text>
            }
            status={"wait"}
            icon={
              <FontAwesomeIcon
                icon={faHandsClapping}
                color="#faad00"
                size={13}
              />
            }
          />
        </Steps>
      </View>
    );
  }

  if (isLoading) return <Text>... Loading </Text>;
  return (
    <GestureHandlerRootView>
      <SafeAreaView>
        <ImageBackground
          source={image}
          resizeMode="cover"
          style={{ width: windowWidth, height: windowHeight }}
        >
          <CalendarStrip
            headerText="Quá trình"
            calendarAnimation={{ type: "sequence", duration: 30 }}
            style={{
              height: 150,
              paddingTop: 20,
            }}
            calendarHeaderStyle={{
              color: "#1870bc",
              fontSize: 16,
              fontWeight: "bold",
            }}
            dateNumberStyle={{ color: "#000000", paddingTop: 10 }}
            dateNameStyle={{ color: "#BBBBBB" }}
            highlightDateNumberStyle={{
              color: "#fff",
              backgroundColor: "#1870bc",
              marginTop: 10,
              height: 35,
              width: 35,
              textAlign: "center",
              borderRadius: 17.5,
              overflow: "hidden",
              paddingTop: 6,
              fontWeight: "600",
              justifyContent: "center",
              alignItems: "center",
            }}
            highlightDateNameStyle={{ color: "#1870bc", fontSize: 13 }}
            disabledDateNameStyle={{ color: "grey" }}
            disabledDateNumberStyle={{ color: "grey", paddingTop: 10 }}
            iconContainer={{ flex: 0.1 }}
            locale={{
              name: "vi",
              config: {
                weekdaysShort: "CN_T2_T3_T4_T5_T6_T7".split("_"),
                weekdaysMin: "CN_T2_T3_T4_T5_T6_T7".split("_"),
              },
            }}
            datesWhitelist={datesWhitelist}
            selectedDate={moment().toDate()}
          />
          <WhiteSpace />
          <View
            style={{
              width: windowWidth - 20,
              display: "flex",
              alignSelf: "center",
              justifyContent: "space-between",
              flexDirection: "row",
              marginBottom: 10,
            }}
          >
            <Text
              style={{ fontSize: 16, fontWeight: "bold", color: "#1870bc" }}
            >
              Tiến trình phát triển:
            </Text>
            <Button
              type="ghost"
              size="small"
              style={{ width: 110, backgroundColor: "transparent" }}
              onPress={() => setShowEvent(true)}
            >
              <FontAwesomeIcon icon={faAdd} />
              <Text style={{ fontSize: 13, fontWeight: "500" }}>
                Thêm sự kiện
              </Text>
            </Button>
          </View>
          <ScrollView>
            <View style={{ marginBottom: 100 }}>
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
                                width: windowWidth - 56,
                              }}
                            >
                              <Text
                                style={{
                                  fontSize: 15,
                                  fontWeight: "bold",
                                }}
                              >
                                {item?.event}
                              </Text>
                            </View>
                          }
                          description={
                            <View
                              style={{
                                height: 50,
                                width: windowWidth - 90,
                                backgroundColor:
                                  +item.id === 1000
                                    ? "green"
                                    : +item.id === 1001
                                    ? "#faad00"
                                    : "#1870bc",
                                borderRadius: 10,
                                flexDirection: "row",
                              }}
                            >
                              <View
                                style={{
                                  height: 50,
                                  marginLeft: 5,
                                  width: windowWidth - 60,
                                  backgroundColor: "white",
                                  borderColor:
                                    +item.id === 1000
                                      ? "green"
                                      : +item.id === 1001
                                      ? "#faad00"
                                      : "#1870bc",
                                  borderWidth: 1,
                                  borderRadius: 10,
                                }}
                              >
                                <SwipeAction
                                  shouldCancelWhenOutside={true}
                                  left={right}
                                  buttonWidth={40}
                                  onSwipeableLeftOpen={() => {
                                    +item.id !== -1 &&
                                      +item.id !== 1000 &&
                                      +item.id !== 1001 &&
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
                                                  setIsLoading(true);
                                                  if (isRes) {
                                                    Toast.success(
                                                      "Xóa thành công!"
                                                    );
                                                  } else {
                                                    Toast.fail("Xóa thất bại!");
                                                  }
                                                  setTimeout(() => {
                                                    setIsLoading(false);
                                                  }, 200);
                                                }
                                              ),
                                          },
                                        ]
                                      );
                                  }}
                                  containerStyle={{
                                    borderRadius: 10,
                                    marginLeft: -1,
                                  }}
                                >
                                  <List.Item
                                    style={{
                                      width: windowWidth - 70,
                                      height: 48,
                                      marginLeft: 20,
                                      borderRadius: 10,
                                    }}
                                  >
                                    {item.description}
                                  </List.Item>
                                </SwipeAction>
                              </View>
                            </View>
                          }
                          status={item?.status || "finish"}
                          renderIcon={() => {
                            if (+item.id === 1000) {
                              return (
                                <FontAwesomeIcon
                                  icon={faCircle}
                                  color="green"
                                  size={22}
                                />
                              );
                            } else if (+item.id === 1001) {
                              return (
                                <FontAwesomeIcon
                                  icon={faCircle}
                                  color="#faad00"
                                  size={22}
                                />
                              );
                            } else {
                              return (
                                <FontAwesomeIcon
                                  icon={faCircle}
                                  size={22}
                                  color="#1870bc"
                                />
                              );
                            }
                          }}
                        />
                      );
                    })}
                </Steps>
              </WingBlank>
            </View>
          </ScrollView>
          <Modal
            style={{
              width: windowWidth - 10,
            }}
            popup={true}
            visible={isShowEvent}
            transparent
            animationType="fade"
            title={
              <Text
                style={{ color: "#1870bc", fontSize: 16, fontWeight: "bold" }}
              >
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
              <Text
                style={{ fontSize: 14, fontWeight: "bold", paddingTop: 10 }}
              >
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
              <Text
                style={{ fontSize: 14, fontWeight: "bold", paddingTop: 10 }}
              >
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
              <Text
                style={{ fontSize: 14, fontWeight: "bold", paddingTop: 10 }}
              >
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
              <Text
                style={{ fontSize: 14, fontWeight: "bold", paddingTop: 10 }}
              >
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
        </ImageBackground>
      </SafeAreaView>
    </GestureHandlerRootView>
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
