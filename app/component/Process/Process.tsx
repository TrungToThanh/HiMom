import React, { useEffect, useMemo, useState } from "react";
import { View, Text, Dimensions, ScrollView, ImageBackground } from "react-native";
import { Image } from "expo-image";
import { Button, WhiteSpace, Toast, Modal } from "@ant-design/react-native";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faUser,
  faCalendar,
  faAdd,
  faHeart,
  faVideoCamera,
  faImage,
} from "@fortawesome/free-solid-svg-icons";
import ImageView from "react-native-image-viewing";
import dayjs from "dayjs";
import { deleteAEvent, getAllEvent, insertANewEvent } from "../../../api/eventProcess/event";
import { ProcessBabyBase } from "../../const/type";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import moment from "moment";
import _ from "lodash";
import ModalAddProcess from "./sub-component/modal-add-process";
import ProcessLine from "./sub-component/process-line";
import { Video, ResizeMode } from "expo-av";
import { useFocusEffect } from "@react-navigation/native";

interface Props {
  listAccountBaby?: any;
  listEvent: any;
  nameRouteUserId?: number;
  setLoadingAgain: (value) => void;
}
const ProcessBaby = ({
  listAccountBaby,
  listEvent,
  nameRouteUserId,

  setLoadingAgain,
}: Props) => {
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const image = require("../../../assets/background.jpg");
  const video = React.useRef(null);

  //Get value date
  const now = dayjs().format("DD-MM-YYYYY");

  const isFirstDay = useMemo(() => {
    let dateObject = "";
    if (listAccountBaby) {
      let idCurrent = listAccountBaby?.find((item) => Number(item.id) === Number(nameRouteUserId));
      var dateParts = idCurrent?.birthday.split("-");

      // month is 0-based, that's why we need dataParts[1] - 1
      dateObject = dayjs(new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]))
        .subtract(280, "days")
        .format("DD-MM-YYYY");
    }
    return dateObject;
  }, [listAccountBaby]);

  const isDiffFirstDay = useMemo(() => {
    let dateObject;
    if (listAccountBaby) {
      let idCurrent = listAccountBaby?.find((item) => Number(item.id) === Number(nameRouteUserId));
      var dateParts = idCurrent?.birthday.split("-");

      dateObject = dayjs(new Date()).diff(
        dayjs(new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0])).subtract(280, "days"),
        "days"
      );
    }
    return dateObject;
  }, [listAccountBaby]);

  const diffDay = useMemo(() => {
    let day = "";
    if (listAccountBaby) {
      let idCurrent = listAccountBaby?.find((item) => Number(item.id) === Number(nameRouteUserId));
      var dateParts = idCurrent && idCurrent?.birthday.split("-");
      day = `${dateParts[2]}-${dateParts[1]}-${+dateParts[0]}`;
    }
    return String(dayjs(day).diff(new Date(), "days"));
  }, [listAccountBaby, nameRouteUserId]);

  const [isShowEvent, setShowEvent] = useState<boolean>(false);
  const [itemIdCurrent, setItemIdCurrent] = useState<any>();
  const [indexItemCurrent, setIndexItemCurrent] = useState<any>();

  const [listImageCurrent, setListImage] = useState<any>();
  const [isShowCurrentImage, setShowCurrentImage] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      setLoadingAgain(true);
      setTimeout(() => {
        setLoadingAgain(false);
      }, 400);
    }, [])
  );

  const listEventCook = useMemo(() => {
    if (!listEvent) return [];
    const newList = Array.from(new Set(listEvent));
    console.log("newList", newList);
    const b = newList.sort(function (a: ProcessBabyBase, b: ProcessBabyBase) {
      var dateParts: any = String(a.date).split("-");
      const dateObjectA = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);

      var datePartsB: any = String(b.date).split("-");
      const dateObjectB = new Date(+datePartsB[2], datePartsB[1] - 1, +datePartsB[0]);

      return dateObjectA.getTime() - dateObjectB.getTime();
    });
    return b;
  }, [listEvent]);

  const handleDeleteEvent = (itemId) => {
    +itemId !== -1 &&
      +itemId !== -2 &&
      +itemId !== -3 &&
      Modal.alert("Xóa sự kiện", "Bạn có thật sự muốn xóa sự kiện này?", [
        {
          text: "Thoát",
          style: "cancel",
        },
        {
          text: "Xóa",
          onPress: () =>
            deleteAEvent(nameRouteUserId, itemId).then((isRes) => {
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

  return (
    <GestureHandlerRootView>
      <SafeAreaView>
        <ImageBackground
          source={image}
          resizeMode="cover"
          style={{ width: windowWidth, height: windowHeight }}
        >
          <ImageView
            images={listImageCurrent}
            imageIndex={0}
            visible={isShowCurrentImage}
            onRequestClose={() => setShowCurrentImage(false)}
          />
          <ModalAddProcess
            nameRouteUserId={nameRouteUserId}
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
                  fontSize: 16,
                  fontWeight: "bold",
                  marginTop: 8,
                  marginRight: 10,
                  color: "#1870bc",
                }}
              >
                {+isDiffFirstDay > 0 ? Math.floor(isDiffFirstDay / 7) : 0}/40 Tuần -{" "}
                {isDiffFirstDay - Math.floor(isDiffFirstDay / 7) * 7} Ngày
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
                {isDiffFirstDay}
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
                {+diffDay > 0 ? diffDay : 0}
              </Text>
            </View>
          </View>
          <WhiteSpace />
          <ProcessLine isFirstDay={isFirstDay} isDiffFirstDay={isDiffFirstDay} diffDay={diffDay} />
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
            <Text style={{ fontSize: 16, fontWeight: "bold", color: "#1870bc" }}>
              Tiến trình phát triển:
            </Text>
            <Button
              type="ghost"
              size="small"
              style={{ width: 110, backgroundColor: "transparent" }}
              onPress={() => setShowEvent(true)}
            >
              <FontAwesomeIcon icon={faAdd} />
              <Text style={{ fontSize: 13, fontWeight: "500" }}>Thêm sự kiện</Text>
            </Button>
          </View>
          <ScrollView>
            <View style={{ marginBottom: 100 }}>
              {listEventCook &&
                listEventCook?.length > 0 &&
                listEventCook?.map((item: ProcessBabyBase, indexItem) => {
                  const sourceImageItem =
                    listEventCook?.at(indexItem)?.image?.length > 0
                      ? JSON?.parse(listEventCook?.at(indexItem)?.image)
                      : "";
                  return (
                    <View key={indexItem}>
                      <View
                        style={{
                          minHeight: 50,
                          width: windowWidth - 10,
                          backgroundColor: "white",
                          borderColor: "#dedce2",
                          borderWidth: 1,
                          borderRadius: 5,
                          margin: 5,
                          padding: 5,
                        }}
                      >
                        <View
                          style={{
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
                            }}
                          >
                            <FontAwesomeIcon icon={faUser} />
                          </View>
                          <View>
                            <Text
                              style={{
                                fontSize: 14,
                                fontWeight: "bold",
                              }}
                              adjustsFontSizeToFit
                              lineBreakMode="clip"
                            >
                              {item?.event}
                            </Text>
                            <Text
                              style={{
                                fontSize: 12,
                                fontWeight: "bold",
                                color: "#b0aca8",
                              }}
                            >
                              {item?.date}
                            </Text>
                          </View>
                        </View>
                        <WhiteSpace />
                        <Text
                          style={{
                            fontSize: 13,
                            fontWeight: "400",
                            marginLeft: 5,
                          }}
                        >
                          {item.description}
                        </Text>
                        <View>
                          {sourceImageItem && sourceImageItem?.length > 0 && (
                            <View>
                              <View
                                style={{
                                  flexDirection: "row",
                                  display: "flex",
                                  paddingTop: 10,
                                  justifyContent: "space-evenly",
                                }}
                              >
                                {sourceImageItem?.map((image, indexImage) => {
                                  if (image.type === "video") {
                                    return (
                                      <View
                                        key={indexImage}
                                        style={{
                                          borderWidth: 1,
                                          borderRadius: 10,
                                          borderColor: "#b0aca8",
                                          padding: 5,
                                        }}
                                        onTouchStart={() => {
                                          video?.current?.presentFullscreenPlayer();
                                          video?.current?.playAsync();
                                        }}
                                      >
                                        <FontAwesomeIcon icon={faVideoCamera} size={10} />
                                        <Video
                                          ref={video}
                                          style={{
                                            height: 120,
                                            width: (windowWidth - 60) / 3,
                                          }}
                                          source={image}
                                          volume={1}
                                          useNativeControls={false}
                                          resizeMode={ResizeMode.CONTAIN}
                                          isLooping
                                        />
                                      </View>
                                    );
                                  }
                                  return (
                                    <View
                                      key={indexImage}
                                      onTouchStart={() => {
                                        item.image &&
                                          item.image?.length > 0 &&
                                          setListImage(JSON?.parse(item.image));
                                        setShowCurrentImage(true);
                                      }}
                                      style={{
                                        borderWidth: 1,
                                        borderRadius: 10,
                                        borderColor: "#b0aca8",
                                        padding: 5,
                                      }}
                                    >
                                      <FontAwesomeIcon icon={faImage} size={10} />
                                      <Image
                                        // @ts-ignore
                                        source={image}
                                        style={{
                                          height: 120,
                                          width: (windowWidth - 60) / 3,
                                          borderRadius: 10,
                                        }}
                                        transition={1000}
                                        allowDownscaling
                                        contentFit="cover"
                                      />
                                    </View>
                                  );
                                })}
                              </View>
                            </View>
                          )}
                        </View>
                      </View>
                    </View>
                  );
                })}
            </View>
          </ScrollView>
        </ImageBackground>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default ProcessBaby;
