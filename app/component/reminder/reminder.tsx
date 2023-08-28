import React, { useEffect, useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Button, Modal, Tag, Text, View, WhiteSpace } from "@ant-design/react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Calendar from "expo-calendar";
import CalendarStrip from "react-native-calendar-strip";
import moment from "moment";
import { Alert, Platform, useWindowDimensions } from "react-native";
import Input from "@ant-design/react-native/lib/input-item/Input";
import * as Localization from "expo-localization";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faAdd, faArrowCircleRight } from "@fortawesome/free-solid-svg-icons";
import { ScrollView } from "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const nameCalenderSource = "HiMomGoogleCalendar";
const defaultCalendarSource = {
  type: "",
  isLocalAccount: true,
  name: nameCalenderSource,
}; //only for android

const newCalendar = {
  title: "HiMomEvent",
  entityType: Calendar.EntityTypes.EVENT,
  color: "#2196F3",
  source: defaultCalendarSource,
  name: "internal",
  accessLevel: Calendar.CalendarAccessLevel.OWNER,
  ownerAccount: "personal",
};

const ReminderComponent = () => {
  const [todoList, setTodoList] = useState([]);
  const [valueNote, setValueNote] = useState("");
  const [valueNoteAdd, setValueNoteAdd] = useState("");
  const { width, height } = useWindowDimensions();
  const [selectedTask, setSelectedTask] = useState(null);

  const [currentDate, setCurrentDate] = useState<any>(
    `${moment().format("YYYY")}-${moment().format("MM")}-${moment().format("DD")}`
  );

  const [status, requestPermission] = Calendar.useCalendarPermissions();
  Calendar.getCalendarPermissionsAsync();

  useEffect(() => {
    requestPermission();
  }, []);

  const datesWhitelist = [
    {
      start: moment(),
      end: moment().add(365, "days"), // total 4 days enabled
    },
  ];

  const getAllEvent = async () => {
    await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT).then(async (item) => {
      if (item && item.length > 0) {
        const calendarIdExisted = item?.find(
          (childItem) => childItem?.source?.name === nameCalenderSource
        );
        let calendarId = calendarIdExisted?.id;
        console.log(moment(currentDate).endOf("day").toDate());
        const listEvent = await Calendar.getEventsAsync(
          [calendarId],
          moment(currentDate).startOf("day").toDate(),
          moment(currentDate).endOf("day").toDate()
        );
        console.log("listEvent", listEvent);
        setTodoList(listEvent);
      }
    });
  };
  const addEventToCalender = () => {
    Modal.alert(
      "Thêm sự kiện",
      <View>
        <Text> Ngày xảy ra sự kiện:</Text>
        <Input value={currentDate} editable={false} />
        <Text> Nội dung cần nhắc nhở:</Text>
        <Input
          placeholder="nhập nội dung bạn muốn nhắc nhở"
          defaultValue={valueNote}
          onChangeText={(value) => setValueNote(value)}
        />
        <Text> Ghi chú thêm:</Text>
        <Input
          placeholder="nhập nội dung bạn muốn ghi chú"
          defaultValue={valueNoteAdd}
          onChangeText={(value) => setValueNoteAdd(value)}
        />
      </View>,
      [
        {
          text: "Thoát",
        },
        {
          text: "Đồng ý",
          onPress: async () => {
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
                  calendarId = Calendar.createCalendarAsync(newCalendar);
                }
              })
              .then(() => {
                const event = {
                  title: `HiMom: ${valueNote}`,
                  notes: calendarId.toString(),
                  startDate: new Date(currentDate),
                  endDate: new Date(currentDate),
                  timeZone: Localization.timezone,
                };
                console.log(calendarId.toString());
                Calendar.createEventAsync(calendarId.toString(), event);
              });
          },
        },
      ]
    );
  };

  return (
    <GestureHandlerRootView>
      <SafeAreaView>
        <CalendarStrip
          headerText="Nhắc nhở"
          calendarAnimation={{ type: "sequence", duration: 30 }}
          style={{
            height: 150,
            paddingTop: 20,
            paddingBottom: 20,
          }}
          calendarHeaderStyle={{ color: "#000000" }}
          dateNumberStyle={{ color: "#000000", paddingTop: 10 }}
          dateNameStyle={{ color: "#BBBBBB" }}
          highlightDateNumberStyle={{
            color: "#fff",
            backgroundColor: "#2E66E7",
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
          highlightDateNameStyle={{ color: "#2E66E7" }}
          disabledDateNameStyle={{ color: "grey" }}
          disabledDateNumberStyle={{ color: "grey", paddingTop: 10 }}
          iconContainer={{ flex: 0.1 }}
          datesWhitelist={datesWhitelist}
          selectedDate={currentDate}
          onDateSelected={(date) => {
            const selectedDate = `${moment(date).format("YYYY")}-${moment(date).format(
              "MM"
            )}-${moment(date).format("DD")}`;
            setCurrentDate(selectedDate);
            getAllEvent();
          }}
          locale={{
            name: "vn",
            config: {
              weekdaysShort: "CN_T2_T3_T4_T5_T6_T7".split("_"),
              weekdaysMin: "CN_T2_T3_T4_T5_T6_T7".split("_"),
            },
          }}
        />

        {todoList?.length > 0 && (
          <View style={{ width: width, height: height - 280 }}>
            <ScrollView>
              {todoList?.map((item) => (
                <View
                  style={{
                    width: width - 10,
                    height: 40,
                    backgroundColor: "white",
                    borderColor: "#2e66e7",
                    marginLeft: 5,
                    marginBottom: 10,
                    borderRadius: 20,
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View>
                    <Text style={{ color: "black", paddingLeft: 20, paddingTop: 5 }}>
                      Sự kiện: {String(item?.title).replaceAll("HiMom:", "")}
                    </Text>
                    <Text style={{ color: "black", paddingLeft: 20 }}>{item?.note}</Text>
                  </View>
                  <Text
                    onPress={() => Calendar.openEventInCalendar(item.id)}
                    style={{ margin: 10 }}
                  >
                    <FontAwesomeIcon icon={faArrowCircleRight} color="black" />
                  </Text>
                </View>
              ))}
            </ScrollView>
          </View>
        )}
        <View
          style={{
            width: width - 50,
            bottom: 0,
            marginBottom: 0,
            display: "flex",
            // position: "absolute",
            alignSelf: "center",
          }}
        >
          <Button
            type="ghost"
            style={{ width: width - 50, backgroundColor: "white" }}
            onPress={() => addEventToCalender()}
          >
            <FontAwesomeIcon icon={faAdd} />
            <Text>Thêm sự kiện</Text>
          </Button>
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default ReminderComponent;
