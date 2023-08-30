import React, { useEffect, useState } from "react";

import moment from "moment";
import * as Calendar from "expo-calendar";
import * as Localization from "expo-localization";

import { StyleSheet, useWindowDimensions, Image } from "react-native";
import {
  Modal,
  View,
  Text,
  Button,
  Toast,
  InputItem,
  DatePicker,
  Grid,
} from "@ant-design/react-native";

import Input from "@ant-design/react-native/lib/input-item/Input";
import DateTimePicker from "@react-native-community/datetimepicker";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import dayjs from "dayjs";
import { insertANewEvent } from "../../../../api/eventProcess/event";
import * as ImagePicker from "expo-image-picker";

interface Props {
  isShowEvent?: boolean;
  setShowEvent?: () => void;
  setLoadingAgain: (value) => void;
}
const ModalAddProcess = ({ isShowEvent = false, setShowEvent, setLoadingAgain }: Props) => {
  const { width, height } = useWindowDimensions();

  const [isShowDatePicker, setIsShowDatePicker] = useState(false);
  const [nameEvent, setNameEvent] = useState<any>("");
  const [dateEvent, setDateEvent] = useState<any>("");
  const [desEvent, setDesEvent] = useState<any>("");
  const [linkVideo, setLinkVideo] = useState<any>("");
  const [noteEvent, setNoteEvent] = useState<any>("");
  const [image, setImage] = useState<any>(null);

  const handleAddEvent = () => {
    insertANewEvent(nameEvent, dateEvent, desEvent, noteEvent, image, linkVideo).then((isRes) => {
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
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
      base64: false,
      selectionLimit: 1,
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
            <Text style={{ color: "#1870bc", fontSize: 16, fontWeight: "bold" }}>
              Thêm sự kiện:
            </Text>
            <Button type="ghost" size="small" onPress={() => setIsShowDatePicker(true)}>
              <Text>Chọn ngày {dateEvent}</Text>
            </Button>
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
              onChange={(value) => setDateEvent(dayjs(value).format("DD-MM-YYYY"))}
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
                multiline
                maxLength={200}
                placeholder="Mô tả sự kiện"
                textBreakStrategy="highQuality"
                onChangeText={(value) => setDesEvent(value?.trim())}
              />
            </View>
            <View style={styles.input}>
              <Input
                style={styles.inputItem}
                multiline
                placeholder="Link video"
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
            <View style={styles.input}>
              <Grid
                data={image}
                columnNum={3}
                itemStyle={{ height: 80 }}
                renderItem={(item) => (
                  <Button
                    style={{ width: 80, height: 80 }}
                    type="ghost"
                    onPress={() => {
                      Modal.alert(
                        "Trình hiển thị hình ảnh",
                        <View
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: 350,
                            width: width,
                          }}
                        >
                          <Image
                            // @ts-ignore
                            source={item}
                            style={{
                              height: 350,
                              width: width,
                            }}
                            resizeMethod="auto"
                            resizeMode="cover"
                          />
                        </View>,
                        [
                          {
                            text: "Xóa",
                            style: "cancel",
                          },
                          {
                            text: "Thoát",
                          },
                        ]
                      );
                    }}
                  >
                    <Image
                      // @ts-ignore
                      source={item}
                      style={{
                        height: 80,
                        width: 80,
                      }}
                      resizeMethod="auto"
                      resizeMode="cover"
                    />
                  </Button>
                )}
              />
            </View>
            <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
              <Button
                size="small"
                type="ghost"
                onPress={() => handleSelectPic()}
                style={{ width: 100, marginTop: 20 }}
              >
                Chọn ảnh
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ModalAddProcess;
