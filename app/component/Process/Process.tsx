import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  Dimensions,
  ScrollView,
  ImageBackground,
  Linking,
} from "react-native";
import {
  Button,
  WhiteSpace,
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
  faHeart,
  faImage,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";

import dayjs from "dayjs";
import { deleteAEvent, getAllEvent } from "../../../api/eventProcess/event";
import { ProcessBabyBase } from "../../const/type";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import moment from "moment";
import _ from "lodash";
import ModalAddProcess from "./sub-component/modal-add-process";
import ModalShowImage from "./sub-component/modal-show-image";

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
  const image = require("../../../assets/background.jpg");

  const Step = Steps.Step;

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

  const isDiffFirstDay1 = useMemo(() => {
    let dateObject;
    if (listAccountBaby) {
      let idCurrent = listAccountBaby?.find(
        (item) => Number(item.id) === Number(nameRouteUserId)
      );
      var dateParts = idCurrent?.birthday.split("-");

      dateObject = dayjs(new Date()).diff(
        dayjs(
          new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0])
        ).subtract(280, "days"),
        "days"
      );
    }
    return dateObject;
  }, [listAccountBaby]);

  const diffDay1 = useMemo(() => {
    let day = "";
    if (listAccountBaby) {
      let idCurrent = listAccountBaby?.find(
        (item) => Number(item.id) === Number(nameRouteUserId)
      );
      var dateParts = idCurrent && idCurrent?.birthday.split("-");
      day = `${dateParts[2]}-${dateParts[1]}-${+dateParts[0]}`;
    }
    return String(dayjs(day).diff(new Date(), "days"));
  }, [listAccountBaby, nameRouteUserId]);

  const [isShowEvent, setShowEvent] = useState<boolean>(false);
  const [loadingAgain, setLoadingAgain] = useState(false);
  const [itemIdCurrent, setItemIdCurrent] = useState<any>();
  const [indexItemCurrent, setIndexItemCurrent] = useState<any>();

  const [listImageCurrent, setListImage] = useState<any>();
  const [isShowCurrentImage, setShowCurrentImage] = useState(false);

  const { listEvent } = getAllEvent({ isLoading: loadingAgain });

  const listEventCook = useMemo(() => {
    const listEventCurrent = listEvent?.length > 0 ? listEvent : [];
    const isHasFirstDay = listEventCurrent?.find(
      (item) => Number(item.id) === -1
    );
    if (!isHasFirstDay)
      listEventCurrent?.unshift({
        id: -1,
        date: isFirstDay,
        event: "Thấy gì chưa!",
        description: "Nhịp đập đầu tiên!",
        status: "finish",
        image: "",
        linkvideo: "",
      });
    const isHasBirthDay = listEventCurrent?.find(
      (item) => Number(item.id) === 1000
    );
    if (!isHasBirthDay)
      listEventCurrent?.push(
        {
          id: 1000,
          date: moment().format("DD-MM-YYYY"),
          event: "Hôm nay",
          description: "Con đang ngủ hay đang nghịch nhỉ?",
          status: "wait",
          image: "",
          linkvideo: "",
        },
        {
          id: 1001,
          date: isBirthday,
          event: "Quan trọng nhá!",
          description: "Oa oa",
          status: "wait",
          image: "",
          linkvideo: "",
        }
      );

    const newList = Array.from(new Set(listEventCurrent));
    const b = newList.sort(function (a: ProcessBabyBase, b: ProcessBabyBase) {
      var dateParts: any = String(a.date).split("-");
      const dateObjectA = new Date(
        +dateParts[2],
        dateParts[1] - 1,
        +dateParts[0]
      );

      var datePartsB: any = String(b.date).split("-");
      const dateObjectB = new Date(
        +datePartsB[2],
        datePartsB[1] - 1,
        +datePartsB[0]
      );

      return dateObjectA.getTime() - dateObjectB.getTime();
    });
    return b;
  }, [listEvent]);

  const handleDeleteEvent = (itemId) => {
    +itemId !== -1 &&
      +itemId !== 1000 &&
      +itemId !== 1001 &&
      Modal.alert("Xóa sự kiện", "Bạn có thật sự muốn xóa sự kiện này?", [
        {
          text: "Thoát",
          style: "cancel",
        },
        {
          text: "Xóa",
          onPress: () =>
            deleteAEvent(itemId).then((isRes) => {
              setLoadingAgain(true);
              setTimeout(() => {
                setLoadingAgain(false);
              }, 100);
              if (isRes) {
                Toast.success("Xóa thành công!");
              } else {
                Toast.fail("Xóa thất bại!");
              }
            }),
        },
      ]);
  };

  const listImage = useMemo(() => {
    const a = listImageCurrent?.map((item) => {
      return { uri: item.uri };
    });
    console.log("listImageCurrent", a);
    return a;
  }, [listImageCurrent]);

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

  return (
    <GestureHandlerRootView>
      <SafeAreaView>
        <ImageBackground
          source={image}
          resizeMode="cover"
          style={{ width: windowWidth, height: windowHeight }}
        >
          <ModalShowImage
            listImage={listImage}
            isShowCurrentImage={isShowCurrentImage}
            setShowCurrentImage={() => setShowCurrentImage(false)}
          />
          <ModalAddProcess
            isShowEvent={isShowEvent}
            setShowEvent={() => setShowEvent(false)}
            setLoadingAgain={(value) => setLoadingAgain(value)}
          />
          <View
            style={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "transparent",
            }}
          >
            <Text
              style={{
                marginTop: 20,
                color: "#1870bc",
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              Chuẩn bị
            </Text>
          </View>
          <View
            style={{
              width: windowWidth - 10,
              height: 40,
              paddingLeft: 10,
              paddingTop: 10,
              flexDirection: "row",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                borderRadius: 10,
                borderWidth: 1,
                borderColor: "#e1e8fb",
                width: windowWidth - 100,
                height: 40,
                flexDirection: "row",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <View style={{ marginTop: 10, marginLeft: 5 }}>
                <Text>
                  <FontAwesomeIcon icon={faCalendar} color="green" size={12} />
                  {moment().format("DD/MM/YYYY")}
                </Text>
              </View>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  marginTop: 6,
                  marginRight: 20,
                  color: "#1870bc",
                }}
              >
                {+isDiffFirstDay1 > 0 ? Math.round(isDiffFirstDay1 / 7) : 0}/40
                Tuần
              </Text>
            </View>
            <View
              style={{
                borderRadius: 10,
                borderWidth: 1,
                borderColor: "#e1e8fb",
                width: windowWidth - 50,
                height: 40,
                flexDirection: "row",
                display: "flex",
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "bold",
                  marginTop: 10,
                  marginLeft: 10,
                }}
              >
                {isDiffFirstDay1}
              </Text>
              <FontAwesomeIcon icon={faHeart} color="red" />
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "bold",
                  marginTop: 10,
                  marginLeft: 5,
                }}
              >
                {+diffDay1 > 0 ? diffDay1 : 0}
              </Text>
            </View>
          </View>
          <WhiteSpace />
          <View
            style={{
              width: windowWidth - 20,
              display: "flex",
              alignSelf: "center",
              justifyContent: "space-between",
              flexDirection: "row",
              marginBottom: 10,
              marginTop: 20,
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
                          key={index}
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
                                  fontSize: 14,
                                  fontWeight: "bold",
                                }}
                              >
                                {item?.date}: {item?.event}
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
                                  key={index + 1}
                                  buttonWidth={60}
                                  onSwipeableWillOpen={() => {
                                    setIndexItemCurrent(index);
                                    setItemIdCurrent(item.id);
                                  }}
                                  onSwipeableOpen={() =>
                                    setIndexItemCurrent(index)
                                  }
                                  renderLeftActions={() => {
                                    if (
                                      indexItemCurrent === index &&
                                      itemIdCurrent !== -1 &&
                                      itemIdCurrent !== 1000 &&
                                      itemIdCurrent !== 1001
                                    ) {
                                      return (
                                        <View
                                          style={{
                                            height: 50,
                                            width: 40,
                                            borderWidth: 1,
                                            borderRadius: 10,
                                            flexDirection: "row",
                                            display: "flex",
                                            justifyContent: "flex-start",
                                            alignItems: "center",
                                            backgroundColor: "white",
                                            borderColor:
                                              +item.id === 1000
                                                ? "green"
                                                : +item.id === 1001
                                                ? "#faad00"
                                                : "#1870bc",
                                          }}
                                        >
                                          <Button
                                            style={{
                                              width: 38,
                                              borderRadius: 10,
                                              height: 50,
                                              paddingTop: 5,
                                            }}
                                            onPress={() =>
                                              handleDeleteEvent(item.id)
                                            }
                                          >
                                            <FontAwesomeIcon
                                              icon={faTrash}
                                              color="red"
                                            />
                                          </Button>
                                        </View>
                                      );
                                    } else {
                                      return (
                                        <Text style={{ color: "transparent" }}>
                                          '
                                        </Text>
                                      );
                                    }
                                  }}
                                  containerStyle={{
                                    borderRadius: 10,
                                    marginLeft: -1,
                                  }}
                                >
                                  <List.Item
                                    style={{
                                      width: windowWidth - 70,
                                      height: 46,
                                      marginLeft: 20,
                                      borderRadius: 10,
                                    }}
                                    extra={
                                      <View>
                                        {(String(item.linkvideo)?.trim() !==
                                          "" ||
                                          String(item.image)?.trim() !==
                                            "") && (
                                          <View
                                            style={{
                                              width: 50,
                                              flexDirection: "row",
                                              display: "flex",
                                            }}
                                          >
                                            {String(item.image)?.trim() !==
                                              "" && (
                                              <Button
                                                size="small"
                                                style={{ width: 20 }}
                                                onPress={() => {
                                                  setListImage(
                                                    JSON.parse(item.image)
                                                  );
                                                  setShowCurrentImage(true);
                                                }}
                                              >
                                                <FontAwesomeIcon
                                                  icon={faImage}
                                                />
                                              </Button>
                                            )}
                                            {String(item.linkvideo)?.trim() !==
                                              "" && (
                                              <Button
                                                size="small"
                                                style={{
                                                  width: 20,
                                                  marginLeft: 10,
                                                }}
                                                onPress={() =>
                                                  Linking.openURL(
                                                    item.linkvideo
                                                  )
                                                }
                                              >
                                                <FontAwesomeIcon
                                                  icon={faVideo}
                                                />
                                              </Button>
                                            )}
                                          </View>
                                        )}
                                      </View>
                                    }
                                  >
                                    <Text
                                      style={{
                                        fontSize: 13,
                                        fontWeight: "400",
                                      }}
                                    >
                                      {item.description}
                                    </Text>
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
        </ImageBackground>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default ProcessBaby;
