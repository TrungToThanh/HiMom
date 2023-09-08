import React, { useEffect, useState } from "react";

import moment from "moment";
import * as Calendar from "expo-calendar";
import * as Localization from "expo-localization";

import { Platform, StyleSheet, useWindowDimensions } from "react-native";
import { Modal, View, Text, Button, Toast } from "@ant-design/react-native";

import Input from "@ant-design/react-native/lib/input-item/Input";
import DateTimePicker from "@react-native-community/datetimepicker";
import dayjs from "dayjs";

interface Props {
  currentDate: string;
  isShowEvent?: boolean;
  setShowEvent?: () => void;
  nameCalenderSource: string;
  setReload: () => void;
}
const ModalAddEvent = ({
  currentDate,
  isShowEvent = false,
  setShowEvent,
  nameCalenderSource,
  setReload,
}: Props) => {
  const { width, height } = useWindowDimensions();
  const [timePicker, setTimePicker] = useState<any>(new Date(currentDate));
  const [valueNote, setValueNote] = useState("");
  const [valueNoteAdd, setValueNoteAdd] = useState("");
  const [isError, setIsError] = useState(false);
  const [isShowDatePicker, setShowDatePicker] = useState(false);

  async function getDefaultCalendarSource() {
    const defaultCalendar = await Calendar.getDefaultCalendarAsync();
    return defaultCalendar.source;
  }

  const defaultCalendarSource =
    Platform.OS === "ios"
      ? getDefaultCalendarSource()
      : {
          type: "",
          isLocalAccount: true,
          name: nameCalenderSource,
        };

  const newCalendar = {
    title: "HiMomEvent",
    entityType: Calendar.EntityTypes.EVENT,
    color: "#2196F3",
    source: defaultCalendarSource,
    name: "internal",
    accessLevel: Calendar.CalendarAccessLevel.OWNER,
    ownerAccount: "personal",
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

  useEffect(() => {
    setValueNote("");
    setValueNoteAdd("");
  }, [isShowEvent]);

  const handleAddEvent = async () => {
    if (valueNote?.trim() === "") {
      setIsError(true);
    } else {
      setIsError(false);

      //Check if has Calender
      let calendarId: any;
      await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT)
        .then((item) => {
          const calendarIdExisted = item?.find(
            (childItem) => childItem?.source?.name === nameCalenderSource
          );
          const checkExist = item?.some(
            (childItem) => childItem?.source?.name === nameCalenderSource
          );

          if (checkExist) {
            calendarId = calendarIdExisted.id;
          } else {
            //@ts-ignore
            calendarId = Calendar.createCalendarAsync(newCalendar);
          }
        })
        .then(() => {
          const event = {
            title: `HiMom: ${valueNote}`,
            color: "blue",
            notes: `${calendarId.toString()}: ${valueNoteAdd}`,
            startDate: moment(timePicker).toDate(),
            endDate: moment(timePicker).toDate(),
            ownerAccount: "personal",
            accessLevel: Calendar.CalendarAccessLevel.OWNER,
          };

          Calendar.createEventAsync(calendarId.toString(), event).then((isRes) => {
            if (isRes) {
              Toast.success("Đã thêm thành công!");
              setReload();
            }
          });
        });
    }
  };

  return (
    <View>
      {isShowDatePicker && (
        <DateTimePicker
          display="clock"
          mode="time"
          is24Hour={true}
          value={moment(currentDate).toDate() || new Date()}
          maximumDate={moment(currentDate).endOf("day").toDate()}
          minimumDate={moment(currentDate).toDate()}
          negativeButton={{ label: "Thoát", textColor: "black" }}
          positiveButton={{ label: "Chọn" }}
          onChange={(value) => {
            if (moment(value?.nativeEvent?.timestamp) < moment()) {
              Toast.fail("Không thể chọn thời gian đã trôi qua! Hãy chọn lại!");
            } else {
              setShowDatePicker(false);
              setTimePicker(value?.nativeEvent?.timestamp);
            }
          }}
          onError={() => Toast.fail("Vui lòng chọn lại!")}
        />
      )}
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
              Thêm sự kiện: {moment(currentDate).format("DD/MM/YYYY")}
            </Text>
            <Button type="ghost" size="small" onPress={() => setShowDatePicker(true)}>
              <Text>{moment(timePicker).format("HH:mm")}</Text>
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
              if (valueNote?.trim() === "") {
                setIsError(true);
              } else {
                setIsError(false);
                setShowEvent();
                handleAddEvent();
              }
            },
          },
        ]}
      >
        <View style={{ width: width - 30, paddingTop: 10 }}>
          <View style={isError ? styles.inputError : styles.input}>
            <Input
              style={styles.inputItem}
              maxLength={50}
              placeholder={
                isError
                  ? "Không được phép bỏ qua trường thông tin này. Hãy nhập nội dung cần nhắc nhở!"
                  : "Nội dung cần nhắc nhở"
              }
              multiline={isError}
              defaultValue={valueNote}
              onChangeText={(value) => {
                setIsError(false);
                setValueNote(value);
              }}
            />
          </View>
          <View style={styles.input}>
            <Input
              style={styles.inputItem}
              multiline
              maxLength={204}
              placeholder="Nội dung cần ghi chú"
              defaultValue={valueNoteAdd}
              onChangeText={(value) => setValueNoteAdd(value)}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ModalAddEvent;
