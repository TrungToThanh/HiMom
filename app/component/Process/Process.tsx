import React, { useEffect, useMemo, useState } from "react";
import { View, Text, Dimensions, ScrollView, ImageBackground } from "react-native";
import { Image } from "expo-image";
import { Button, WhiteSpace, Toast, Modal, ActionSheet } from "@ant-design/react-native";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faUser,
  faAdd,
  faVideoCamera,
  faImage,
  faEllipsisV,
} from "@fortawesome/free-solid-svg-icons";
import ImageView from "react-native-image-viewing";
import dayjs from "dayjs";
import { deleteAEvent } from "../../../api/eventProcess/event";
import { ProcessBabyBase } from "../../const/type";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import ModalAddProcess from "./sub-component/modal-add-process";
import ProcessLine from "./sub-component/process-line";
import { Video, ResizeMode } from "expo-av";
import ModalViewProcess from "./sub-component/modal-view-process";
import HeaderProcess from "./sub-component/header-process";

interface Props {
  listAccountBaby?: any;
  listEvent: any;
  nameRouteUserId?: number;
  setLoadingAgain: (value) => void;
}
const ProcessBaby = ({ listAccountBaby, listEvent, nameRouteUserId, setLoadingAgain }: Props) => {
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const imageBackground = require("../../../assets/background.jpg");
  const video = React.useRef(null);

  //Get value date
  const now = dayjs().format("DD-MM-YYYYY");

  const idUserCurrent = useMemo(() => {
    let idCurrent;
    if (listAccountBaby) {
      idCurrent = listAccountBaby?.find((item) => Number(item.id) === Number(nameRouteUserId));
    }
    return idCurrent;
  }, [listAccountBaby]);

  const isFirstDate = useMemo(() => {
    let dateObject;
    if (listAccountBaby) {
      let idCurrent = listAccountBaby?.find((item) => Number(item.id) === Number(nameRouteUserId));
      var dateParts = idCurrent?.expectedBirthday?.split("-");

      // month is 0-based, that's why we need dataParts[1] - 1
      dateObject = dayjs(new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0])).subtract(
        280,
        "days"
      );
    }
    return dateObject;
  }, [listAccountBaby]);

  const [isDisplayModalAddEvent, setDisplayModalAddEvent] = useState<boolean>(false);
  const [isShowEvent, setShowEvent] = useState<boolean>(false);
  const [itemIdCurrent, setItemIdCurrent] = useState<any>();

  const [listImageCurrent, setListImage] = useState<any>();
  const [isShowCurrentImage, setShowCurrentImage] = useState(false);

  const listEventCook = useMemo(() => {
    if (!listEvent) return [];
    const newList = Array.from(new Set(listEvent));
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
    +itemId !== 1
      ? Modal.alert("Xóa sự kiện", "Bạn có thật sự muốn xóa sự kiện này?", [
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
        ])
      : Toast.fail("Không thể xóa sự kiện này!");
  };

  return (
    <View>
      <ImageBackground
        source={imageBackground}
        resizeMode="cover"
        style={{ width: windowWidth, height: windowHeight }}
      >
        <ImageView
          images={listImageCurrent?.filter((item) => item.type !== "video")}
          imageIndex={0}
          visible={isShowCurrentImage}
          onRequestClose={() => setShowCurrentImage(false)}
        />
        <ModalAddProcess
          nameRouteUserId={nameRouteUserId}
          isFirstDate={isFirstDate}
          isDisplayModalAddEvent={isDisplayModalAddEvent}
          setDisplayModalAddEvent={() => setDisplayModalAddEvent(false)}
          setLoadingAgain={(value) => setLoadingAgain(value)}
        />
        <ModalViewProcess
          nameRouteUserId={nameRouteUserId}
          isFirstDate={isFirstDate}
          isShowEvent={isShowEvent}
          item={itemIdCurrent}
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
            Hành trình
          </Text>
        </View>
        <HeaderProcess idUserCurrent={idUserCurrent} />
        <WhiteSpace />
        <View>
          <ProcessLine
            isFirstDate={isFirstDate}
            idUserCurrent={idUserCurrent}
            nameRouteUserId={nameRouteUserId}
            setLoadingAgain={(value) => setLoadingAgain(value)}
          />
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
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: "bold", color: "#1870bc" }}>
            Tiến trình phát triển:
          </Text>
          <Button
            type="ghost"
            size="small"
            style={{ width: 110, backgroundColor: "transparent" }}
            onPress={() => setDisplayModalAddEvent(true)}
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
                let imageFirst;
                const sourceImageItem =
                  // @ts-ignore
                  item?.image?.length > 0
                    ? // @ts-ignore
                      JSON?.parse(item?.image)
                    : "";
                indexItem === 0 ? (imageFirst = sourceImageItem.uri) : undefined;
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
                          width: windowWidth - 20,
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
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
                        <View
                          onTouchStart={() => {
                            // setShowEvent(true);
                            setItemIdCurrent(item);
                            ActionSheet.showActionSheetWithOptions(
                              {
                                options: ["Xóa sự kiện", "Chỉnh sửa", "Thoát"],
                                cancelButtonIndex: 2,
                                cancelButtonTintColor: "red",
                                destructiveButtonIndex: 0,
                              },
                              (index) => {
                                if (index === 0) {
                                  handleDeleteEvent(item.id);
                                }
                                if (index === 1) {
                                  setShowEvent(true);
                                }
                              }
                            );
                          }}
                        >
                          <FontAwesomeIcon icon={faEllipsisV} />
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
                              {sourceImageItem?.map((imageItem, indexImage) => {
                                if (imageItem.type === "video") {
                                  return (
                                    <View
                                      key={indexImage}
                                      style={{
                                        borderWidth: 1,
                                        borderRadius: 10,
                                        borderColor: "#1870bc",
                                        padding: 2,
                                      }}
                                      onTouchStart={() => {
                                        video?.current?.presentFullscreenPlayer();
                                        video?.current?.playAsync();
                                      }}
                                    >
                                      <Video
                                        ref={video}
                                        style={{
                                          height: 120,
                                          width: (windowWidth - 60) / 3,
                                        }}
                                        source={imageItem}
                                        volume={1}
                                        useNativeControls={false}
                                        resizeMode={ResizeMode.CONTAIN}
                                        isLooping={false}
                                      />
                                      <FontAwesomeIcon
                                        icon={faVideoCamera}
                                        size={10}
                                        style={{ position: "absolute", margin: 5 }}
                                        color="red"
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
                                      borderColor: "#1870bc",
                                      padding: 2,
                                    }}
                                  >
                                    <Image
                                      // @ts-ignore
                                      source={`data:image/png;base64,${imageItem.base64}`}
                                      // source={imageItem}
                                      style={{
                                        height: 120,
                                        width: (windowWidth - 60) / 3,
                                        borderRadius: 10,
                                      }}
                                      transition={1000}
                                      allowDownscaling
                                      contentFit="cover"
                                    />

                                    <FontAwesomeIcon
                                      icon={faImage}
                                      size={10}
                                      style={{ position: "absolute", margin: 5 }}
                                      color="green"
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
    </View>
  );
};

export default ProcessBaby;
