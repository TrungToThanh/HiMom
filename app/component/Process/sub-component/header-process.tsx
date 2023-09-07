import { View } from "@ant-design/react-native";
import {
  faArrowUp19,
  faCalendar,
  faCalendarCheck,
  faCheckCircle,
  faCheckDouble,
  faHeart,
  faHeartCircleCheck,
  faPuzzlePiece,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import moment from "moment";
import React, { useMemo } from "react";
import { Text, useWindowDimensions } from "react-native";
import { UserIdBase } from "../../../const/type";
import dayjs from "dayjs";

interface Props {
  idUserCurrent: UserIdBase;
}
const HeaderProcess = ({ idUserCurrent }: Props) => {
  const { width } = useWindowDimensions();

  const isDiffFirstDay = useMemo(() => {
    let dateObject;
    if (idUserCurrent) {
      var dateParts: any = Boolean(idUserCurrent?.isBorn)
        ? idUserCurrent.birthday?.split("-")
        : idUserCurrent.expectedBirthday?.split("-");

      dateObject = Boolean(idUserCurrent?.isBorn)
        ? dayjs(new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0])).diff(
            dayjs(new Date()),
            "days"
          )
        : dayjs(new Date()).diff(
            dayjs(new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0])).subtract(280, "days"),
            "days"
          );
    }
    return dateObject;
  }, [idUserCurrent]);
  return (
    <View
      style={{
        width: width - 10,
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
          width: width - 100,
          height: 40,
          flexDirection: "row",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <View style={{ marginTop: 10, marginLeft: 5 }}>
          <FontAwesomeIcon
            icon={faCalendarCheck}
            size={12}
            style={{ marginTop: -8, marginLeft: 30 }}
            color="green"
          />
          <Text style={{ fontWeight: "500" }}>
            {Boolean(idUserCurrent?.isBorn)
              ? idUserCurrent.birthday
              : idUserCurrent.expectedBirthday}
          </Text>
        </View>
        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
            marginTop: 8,
            color: "#1870bc",
          }}
        >
          {Boolean(idUserCurrent?.isBorn)
            ? `${Math.floor(isDiffFirstDay / 30)} Tháng`
            : `${Math.floor(isDiffFirstDay / 7)} Tuần`}
        </Text>
        <FontAwesomeIcon icon={faHeart} color="red" />
        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
            marginTop: 8,
            marginRight: 10,
            color: "#1870bc",
          }}
        >
          {Boolean(idUserCurrent?.isBorn)
            ? `${isDiffFirstDay - Math.floor(isDiffFirstDay / 30) * 30} Ngày`
            : `${isDiffFirstDay - Math.floor(isDiffFirstDay / 7) * 7} Ngày`}
        </Text>
      </View>
      <View
        style={{
          borderRadius: 10,
          borderWidth: 1,
          borderColor: "#e1e8fb",
          width: width - 50,
          height: 40,
          flexDirection: "row",
          display: "flex",
        }}
      >
        <Text
          style={{
            fontSize: 14,
            fontWeight: "500",
            marginTop: 10,
            marginLeft: 10,
          }}
        >
          {Math.floor(isDiffFirstDay / 365) > 0
            ? `${Math.floor(isDiffFirstDay / 365)} Tuổi`
            : `${isDiffFirstDay} Ngày`}
        </Text>
        <FontAwesomeIcon icon={faHeartCircleCheck} color="green" size={14} />
      </View>
    </View>
  );
};

export default HeaderProcess;
