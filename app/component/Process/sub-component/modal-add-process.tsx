import React, { useEffect, useState } from "react";

import {
  StyleSheet,
  useWindowDimensions,
  Image,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
import {
  Modal,
  View,
  Text,
  Button,
  Toast,
  InputItem,
  DatePicker,
  Grid,
  WhiteSpace,
} from "@ant-design/react-native";

import Input from "@ant-design/react-native/lib/input-item/Input";
import DateTimePicker from "@react-native-community/datetimepicker";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import dayjs from "dayjs";
import { insertANewEvent } from "../../../../api/eventProcess/event";
import * as ImagePicker from "expo-image-picker";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import ImageView from "react-native-image-viewing";

interface Props {
  isShowEvent?: boolean;
  setShowEvent?: () => void;
  setLoadingAgain: (value) => void;
  nameRouteUserId: number;
}
const ModalAddProcess = ({
  isShowEvent = false,
  setShowEvent,
  setLoadingAgain,
  nameRouteUserId,
}: Props) => {
  const { width, height } = useWindowDimensions();

  const [isShowDatePicker, setIsShowDatePicker] = useState(false);
  const [nameEvent, setNameEvent] = useState<any>("");
  const [dateEvent, setDateEvent] = useState<any>("");
  const [desEvent, setDesEvent] = useState<any>("");
  const [linkVideo, setLinkVideo] = useState<any>("");
  const [noteEvent, setNoteEvent] = useState<any>("");
  const [image, setImage] = useState<any>(null);
  const [isShowCurrentImage, setShowCurrentImage] = useState(false);
  const [currentImage, setCurrentImage] = useState<any>();

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
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      quality: 1,
      base64: false,
      selectionLimit: 3,
      allowsMultipleSelection: true,
    });

    console.log(result.assets);
    if (!result.canceled) {
      setImage(result.assets);
    }
  };

  const handleShowPicture = (item) => {
    setCurrentImage(item);
    setShowCurrentImage(true);
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
      padding: 4,
      fontSize: 14,
      fontWeight: "600",
    },
  });

  return (
    <View>
      <Modal
        style={{
          width: width - 10,
        }}
        popup={true}
        visible={isShowEvent}
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
            onPress: () => setShowEvent(),
            style: "cancel",
          },
          {
            text: "Thêm",
            onPress: () => {
              if (nameEvent?.trim() === "" || dateEvent?.trim() === "" || desEvent?.trim() === "") {
                Toast.fail("Vui lòng kiểm tra: ngày sự kiện, mô tả sự kiện và tên sự kiện");
              } else {
                setShowEvent();
                handleAddEvent();
              }
            },
          },
        ]}
      >
        <View style={{ width: width - 30, paddingTop: 10 }}>
          <View>
            <ImageView
              images={image}
              imageIndex={0}
              visible={isShowCurrentImage}
              onRequestClose={() => setShowCurrentImage(false)}
            />
            <KeyboardAvoidingView>
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
                onChange={(value) => {
                  setDateEvent(dayjs(value).format("DD-MM-YYYY"));
                  Keyboard.dismiss();
                }}
              ></DatePicker>

              <View style={styles.inputError}>
                <Input
                  style={styles.inputItem}
                  multiline
                  maxLength={50}
                  placeholder="Tên sự kiện"
                  textBreakStrategy="highQuality"
                  onChangeText={(value) => setNameEvent(value?.trim())}
                />
              </View>
              <View style={styles.inputError}>
                <Input
                  style={styles.inputItem}
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
              <View style={styles.inputError}>
                <Input
                  style={styles.inputItem}
                  multiline
                  maxLength={200}
                  placeholder="Mô tả sự kiện"
                  textBreakStrategy="highQuality"
                  onChangeText={(value) => setDesEvent(value?.trim())}
                />
              </View>
              <View style={styles.input}>
                <Text
                  style={styles.inputItem}
                  onPress={() => {
                    handleSelectPic();
                    Keyboard.dismiss();
                  }}
                >
                  Tải file lên
                </Text>
              </View>
              {image?.length > 0 && (
                <View
                  style={{
                    paddingTop: 10,
                    borderWidth: 1,
                    borderColor: "#1870bc",
                    borderRadius: 10,
                  }}
                >
                  <Grid
                    data={image}
                    columnNum={3}
                    itemStyle={{ height: 100 }}
                    renderItem={(item) => (
                      <Button
                        style={{
                          width: 100,
                          height: 100,
                          alignContent: "center",
                          alignItems: "center",
                          alignSelf: "center",
                        }}
                        type="ghost"
                        onPress={() => handleShowPicture(item)}
                      >
                        <Image
                          // @ts-ignore
                          source={item}
                          style={{
                            height: 100,
                            width: 100,
                          }}
                          resizeMethod="auto"
                          resizeMode="cover"
                        />
                      </Button>
                    )}
                  />
                </View>
              )}
              <View style={styles.input}>
                <Input
                  style={styles.inputItem}
                  multiline
                  placeholder="Link video khác"
                  textBreakStrategy="highQuality"
                  onChangeText={(value) => setLinkVideo(value?.trim())}
                />
              </View>
              <View style={styles.input}>
                <Input
                  style={styles.inputItem}
                  multiline
                  maxLength={200}
                  placeholder="Ghi chú"
                  textBreakStrategy="highQuality"
                  onChangeText={(value) => setNoteEvent(value?.trim())}
                />
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
