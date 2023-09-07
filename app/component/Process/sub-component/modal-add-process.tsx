import React, { useEffect, useState } from "react";
import dayjs from "dayjs";

import * as ImagePicker from "expo-image-picker";
import ImageView from "react-native-image-viewing";
import { Image } from "expo-image";

import { StyleSheet, useWindowDimensions, KeyboardAvoidingView, Keyboard } from "react-native";

import {
  Modal,
  View,
  Text,
  Button,
  Toast,
  DatePicker,
  Grid,
  WhiteSpace,
} from "@ant-design/react-native";
import Input from "@ant-design/react-native/lib/input-item/Input";

import { insertANewEvent } from "../../../../api/eventProcess/event";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faImage, faUpload, faUser, faVideoCamera } from "@fortawesome/free-solid-svg-icons";
import { ResizeMode, Video } from "expo-av";

interface Props {
  isDisplayModalAddEvent?: boolean;
  setDisplayModalAddEvent?: () => void;
  setLoadingAgain: (value) => void;
  nameRouteUserId: number;
  isFirstDate: any;
}
const ModalAddProcess = ({
  isDisplayModalAddEvent = false,
  setDisplayModalAddEvent,
  setLoadingAgain,
  nameRouteUserId,
  isFirstDate,
}: Props) => {
  const { width, height } = useWindowDimensions();
  const video = React.useRef(null);

  const [imageShow, setImageShow] = useState<any>(null);

  const [isShowDatePicker, setIsShowDatePicker] = useState(false);
  const [nameEvent, setNameEvent] = useState<any>("");
  const [dateEvent, setDateEvent] = useState<any>("");
  const [desEvent, setDesEvent] = useState<any>("");
  const [linkVideo, setLinkVideo] = useState<any>("");
  const [noteEvent, setNoteEvent] = useState<any>("");
  const [image, setImage] = useState<any>(null);
  const [isShowCurrentImage, setShowCurrentImage] = useState(false);

  const [isNameEvent, setCheckNameEvent] = useState(false);
  const [isDateEvent, setCheckDateEvent] = useState(false);

  useEffect(() => {
    setNameEvent("");
    setDateEvent("");
    setDesEvent("");
    setImage("");
    setLinkVideo("");
    setNoteEvent("");
    setCheckNameEvent(false);
    setCheckDateEvent(false);
    setShowCurrentImage(false);
  }, [isDisplayModalAddEvent]);

  const handleAddEvent = () => {
    insertANewEvent(
      nameRouteUserId,
      nameEvent,
      dateEvent,
      desEvent,
      noteEvent,
      image,
      linkVideo
    ).then((isRes) => {
      setLoadingAgain(true);
      setTimeout(() => {
        setLoadingAgain(false);
      }, 500);
      if (isRes) {
        Toast.success("Thêm sự kiện mới thành công!");
      } else {
        Toast.fail("Thất bại!");
      }
    });
  };

  const handleSelectPic = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      quality: 1,
      base64: true,
      selectionLimit: 3,
      allowsMultipleSelection: true,
    });

    if (!result.canceled) {
      setImage(result.assets);
    }
  };

  const styles = StyleSheet.create({
    input: {
      flexDirection: "row",
      padding: 5,
      borderWidth: 1,
      borderColor: "#1870bc",
      borderRadius: 10,
      width: width - 30,
      marginTop: 10,
    },
    inputError: {
      flexDirection: "row",
      padding: 5,
      borderWidth: 2,
      borderColor: "red",
      borderRadius: 10,
      width: width - 30,
      marginTop: 10,
    },
    inputItem: {
      width: width - 35,
      fontSize: 14,
      fontWeight: "600",
    },
    inputItemError: {
      width: width - 35,
      fontSize: 14,
      fontWeight: "600",
      color: "red",
      borderBottomWidth: 1,
      borderColor: "red",
    },
  });

  return (
    <View>
      <Modal
        style={{
          width: width - 10,
        }}
        visible={isDisplayModalAddEvent}
        transparent
        animationType="fade"
        title={
          <View
            style={{
              width: width - 10,
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
              alignItems: "center",
              alignSelf: "center",
              textAlign: "center",
            }}
          >
            <Text style={{ color: "#1870bc", fontSize: 16, fontWeight: "bold" }}>Thêm sự kiện</Text>
          </View>
        }
        footer={[
          {
            text: "Thoát",
            onPress: () => setDisplayModalAddEvent(),
            style: "cancel",
          },
          {
            text: "Lưu",
            onPress: () => {
              if (nameEvent?.trim() === "") setCheckNameEvent(true);
              if (dateEvent?.trim() === "") setCheckDateEvent(true);

              if (nameEvent?.trim() === "" || dateEvent?.trim() === "") {
                Toast.fail("Vui lòng kiểm tra: ngày sự kiện và tên sự kiện");
              } else {
                setDisplayModalAddEvent();
                handleAddEvent();
              }
            },
          },
        ]}
      >
        <View style={{ width: width - 30, paddingTop: 10 }}>
          <View>
            <ImageView
              images={imageShow}
              imageIndex={0}
              visible={isShowCurrentImage}
              onRequestClose={() => setShowCurrentImage(false)}
            />
            <KeyboardAvoidingView>
              <DatePicker
                visible={isShowDatePicker}
                mode="date"
                value={dateEvent?.trim() === "" ? new Date() : new Date(dateEvent)}
                minDate={new Date(isFirstDate)}
                maxDate={new Date()}
                format="YYYY-MM-DD"
                okText="Chọn"
                dismissText="Thoát"
                onOk={() => setIsShowDatePicker(false)}
                onDismiss={() => setIsShowDatePicker(false)}
                onChange={(value) => {
                  setDateEvent(dayjs(value).format("DD-MM-YYYY"));
                  Keyboard.dismiss();
                }}
              ></DatePicker>
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
                  <Input
                    style={isNameEvent ? styles.inputItemError : styles.inputItem}
                    multiline
                    maxLength={50}
                    placeholder="Tên sự kiện"
                    textBreakStrategy="highQuality"
                    onChangeText={(value) => setNameEvent(value)}
                  />
                  <Input
                    style={isDateEvent ? styles.inputItemError : styles.inputItem}
                    maxLength={11}
                    placeholder="Ngày xảy ra sự kiện"
                    value={dateEvent}
                    onTouchStart={() => {
                      setIsShowDatePicker(true);
                      Keyboard.dismiss();
                    }}
                    showSoftInputOnFocus={false}
                  />
                </View>
              </View>
              <View style={{ height: "auto", maxHeight: 120 }}>
                <Input
                  style={styles.inputItem}
                  multiline
                  maxLength={200}
                  placeholder="Mô tả sự kiện"
                  textBreakStrategy="highQuality"
                  onChangeText={(value) => setDesEvent(value)}
                />
              </View>
              {image && image?.length > 0 && (
                <View>
                  <View
                    style={{
                      flexDirection: "row",
                      display: "flex",
                      paddingTop: 10,
                      justifyContent: "space-evenly",
                    }}
                  >
                    {image?.map((image, indexImage) => {
                      if (image.type === "video") {
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
                            <FontAwesomeIcon
                              icon={faVideoCamera}
                              size={10}
                              style={{ position: "absolute", margin: 5 }}
                              color="red"
                            />
                            <Video
                              ref={video}
                              style={{
                                height: 120,
                                width: (width - 60) / 3,
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
                          style={{
                            borderWidth: 1,
                            borderRadius: 10,
                            borderColor: "#1870bc",
                            padding: 2,
                          }}
                        >
                          <Image
                            // @ts-ignore
                            source={image}
                            style={{
                              height: 120,
                              width: (width - 60) / 3,
                              borderRadius: 10,
                            }}
                            transition={1000}
                            allowDownscaling
                            contentFit="cover"
                            onTouchStart={() => {
                              const sourceImageItem =
                                // @ts-ignore
                                image
                                  ? // @ts-ignore
                                    [image]
                                  : null;
                              setImageShow(sourceImageItem);
                              setShowCurrentImage(true);
                            }}
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
              <View
                style={styles.input}
                onTouchStart={() => {
                  handleSelectPic();
                  Keyboard.dismiss();
                }}
              >
                <FontAwesomeIcon icon={faUpload} color="green" />
                <Text style={styles.inputItem}> Đính kèm ảnh/video (tối đa 3 tệp)</Text>
              </View>
            </KeyboardAvoidingView>

            <WhiteSpace />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ModalAddProcess;
