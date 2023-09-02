import { Card, Text, View } from "@ant-design/react-native";
import React, { useCallback, useEffect, useState } from "react";

import * as Calendar from "expo-calendar";
import moment from "moment";
import { useWindowDimensions } from "react-native";
import CardBody from "@ant-design/react-native/lib/card/CardBody";
import { useFocusEffect } from "@react-navigation/native";

const nameCalenderSource = "HiMomGoogleCalendar";

const InfoEvent = () => {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentDate, setCurrentDate] = useState<any>(
    `${moment().format("YYYY")}-${moment().format("MM")}-${moment().format(
      "DD"
    )}`
  );
  const { width } = useWindowDimensions();

  const [status, requestPermission] = Calendar.useCalendarPermissions();
  Calendar.getCalendarPermissionsAsync();

  useEffect(() => {
    requestPermission();
  }, [todoList]);

  const getAllEvent = useCallback(async () => {
    setIsLoading(true);
    let listEvent: any;
    await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT)
      .then(async (item) => {
        if (item && item.length > 0) {
          const calendarIdExisted = item?.find(
            (childItem) => childItem?.source?.name === nameCalenderSource
          );
          let calendarId = calendarIdExisted?.id;
          listEvent = await Calendar.getEventsAsync(
            [calendarId],
            moment().startOf("day").toDate(),
            moment().endOf("day").toDate()
          );
          setTodoList(listEvent);
        }
      })
      .then(() => {
        setTodoList(listEvent);
        setIsLoading(false);
      });
  }, [currentDate, todoList]);

  useFocusEffect(
    React.useCallback(() => {
      getAllEvent();
    }, [])
  );

  return (
    <Card
      style={{
        width: width - 10,
      }}
    >
      <CardBody>
        <View style={{ paddingLeft: 30, paddingTop: 10, marginBottom: 30 }}>
          <View>
            <Text style={{ fontSize: 14, fontWeight: "600" }}>
              Sự kiện hôm nay:
            </Text>
            {todoList && todoList?.length < 1 ? (
              <Text>Không có sự kiện</Text>
            ) : (
              <View>
                {todoList.map((item, index) => (
                  <Text key={index}>
                    {String(moment(todoList[0]?.startDate).format("hh"))}:
                    {moment(todoList[0]?.startDate).format("mm")} -
                    {String(todoList[0]?.title).replaceAll("HiMom:", "")}
                  </Text>
                ))}
              </View>
            )}
          </View>
        </View>
      </CardBody>
    </Card>
  );
};
export default InfoEvent;
