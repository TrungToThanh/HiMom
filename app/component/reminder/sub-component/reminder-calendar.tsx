import React, { useCallback, useEffect, useMemo, useState } from "react";

import _ from "lodash";

import {
  ActivityIndicator,
  Button,
  Result,
  Text,
  Toast,
  View,
  WhiteSpace,
} from "@ant-design/react-native";

import * as Calendar from "expo-calendar";
import CalendarStrip from "react-native-calendar-strip";
import { ScrollView, GestureHandlerRootView } from "react-native-gesture-handler";

import { ImageBackground, useWindowDimensions } from "react-native";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faAdd, faArrowCircleRight } from "@fortawesome/free-solid-svg-icons";

import ModalAddEvent from "./modal-add-event";
import moment from "moment";
import EmptyData from "../../../const/no_data";

const nameCalenderSource = "HiMomGoogleCalendar";

const ReminderCalendar = () => {
  const image = require("../../../../assets/mother.png");
  const [todoList, setTodoList] = useState([]);
  const [isShowEvent, setShowEvent] = useState(false);
  const [isDisableButtonEvent, setDisableButtonEvent] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const { width, height } = useWindowDimensions();

  const [currentDate, setCurrentDate] = useState<any>(null);

  const datesWhitelist = [
    {
      start: moment()?.subtract(10, "days"),
      end: moment()?.add(365, "days"),
    },
  ];

  const getAllEvent = useCallback(
    async (selectedDate) => {
      setIsLoading(true);
      let listEvent: any;
      await Calendar?.getCalendarsAsync(Calendar.EntityTypes.EVENT)
        .then(async (item) => {
          if (item && item.length > 0) {
            const calendarIdExisted = item?.find(
              (childItem) => childItem?.source?.name === nameCalenderSource
            );
            let calendarId = calendarIdExisted?.id;
            listEvent = await Calendar?.getEventsAsync(
              [calendarId],
              moment(selectedDate)?.startOf("day")?.toDate(),
              moment(selectedDate)?.endOf("day")?.toDate()
            );
            setTodoList(listEvent);
          }
        })
        .then(() => {
          setTodoList(listEvent);
          setIsLoading(false);
        });
    },
    [currentDate, todoList]
  );

  const [status, requestPermission] = Calendar?.useCalendarPermissions();

  // useEffect(() => {
  //   requestPermission().then((value) => {
  //     if (value?.status === "granted") {
  //       Calendar?.getCalendarPermissionsAsync();
  //     }
  //   });
  // }, []);

  return (
    <GestureHandlerRootView>
      {status?.status !== "granted" ? (
        <View>
          <EmptyData />
        </View>
      ) : (
        <View>
          <ModalAddEvent
            currentDate={currentDate}
            isShowEvent={isShowEvent}
            setShowEvent={() => {
              setShowEvent(false);
            }}
            setReload={() => getAllEvent(currentDate)}
            nameCalenderSource={nameCalenderSource}
          />
          <CalendarStrip
            headerText="Lịch"
            calendarAnimation={{ type: "sequence", duration: 30 }}
            style={{
              height: 90,
              marginBottom: 10,
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
            datesWhitelist={datesWhitelist}
            selectedDate={currentDate === null ? new Date() : new Date(currentDate)}
            onDateSelected={(date) => {
              setCurrentDate(date);
              // getAllEvent(selectedDate);
              if (moment(date) >= moment().subtract(1, "d")) {
                setDisableButtonEvent(false);
              } else {
                setDisableButtonEvent(true);
              }
            }}
            // locale={{
            //   name: "vi",
            //   config: {
            //     weekdaysShort: "CN_T2_T3_T4_T5_T6_T7"?.split("_"),
            //     weekdaysMin: "CN_T2_T3_T4_T5_T6_T7"?.split("_"),
            //   },
            // }}
          />
          <Text style={{ paddingLeft: 10, fontWeight: "bold" }}>{`Hôm nay: ${moment()?.format(
            "DD/MM/YYYY HH:mm"
          )}`}</Text>
          <WhiteSpace />
          <View
            style={{
              width: width - 20,
              display: "flex",
              alignSelf: "center",
              justifyContent: "space-between",
              flexDirection: "row",
              marginBottom: 10,
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "bold", color: "#1870bc" }}>
              Danh sách sự kiện:
            </Text>
            <Button
              type="ghost"
              size="small"
              style={{ width: 110, backgroundColor: "transparent" }}
              onPress={() => setShowEvent(true)}
              disabled={isDisableButtonEvent}
            >
              <FontAwesomeIcon icon={faAdd} />
              <Text style={{ fontSize: 13, fontWeight: "500" }}>Thêm sự kiện</Text>
            </Button>
          </View>
          {isLoading ? (
            <View
              style={{
                backgroundColor: "transparent",
                alignContent: "center",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {isLoading && (
                <ActivityIndicator size="small" color="#1870bc" text="Tải dữ liệu..." />
              )}
            </View>
          ) : (
            <View>
              {todoList && todoList?.length > 0 && !isLoading ? (
                <View
                  style={{
                    width: width,
                    height: height - 280,
                    backgroundColor: "transparent",
                  }}
                >
                  <ScrollView style={{ backgroundColor: "transparent" }}>
                    {todoList?.map((item, index) => (
                      <View
                        key={index}
                        style={{
                          width: width - 10,
                          height: 40,
                          backgroundColor: "transparent",
                          borderColor: "#1870bc",
                          borderWidth: 1,
                          marginLeft: 5,
                          marginTop: 10,
                          borderRadius: 20,
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <View
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            marginLeft: 10,
                          }}
                        >
                          <Text
                            style={{
                              color: "black",
                              width: 35,
                              fontSize: 13,
                              fontWeight: "500",
                              marginRight: 10,
                            }}
                          >
                            {String(moment(item?.startDate).format("HH"))}:
                            {moment(item?.startDate).format("mm")}
                          </Text>
                          <Text
                            style={{
                              borderRightWidth: 1,
                              borderColor: "#1870bc",
                            }}
                          ></Text>
                          <Text
                            style={{
                              color: "black",
                              paddingLeft: 10,
                              fontSize: 15,
                              fontWeight: "600",
                            }}
                          >
                            {String(item?.title)?.replaceAll("HiMom:", "")}
                          </Text>
                        </View>
                        <Text
                          onPress={() => Calendar?.openEventInCalendar(item?.id)}
                          style={{ margin: 10 }}
                        >
                          <FontAwesomeIcon icon={faArrowCircleRight} color="#1870bc" />
                        </Text>
                      </View>
                    ))}
                  </ScrollView>
                </View>
              ) : (
                <Result
                  imgUrl={image}
                  title=""
                  message="Không có ghi chú"
                  style={{ backgroundColor: "transparent" }}
                />
              )}
            </View>
          )}
        </View>
      )}
    </GestureHandlerRootView>
  );
};

export default ReminderCalendar;
