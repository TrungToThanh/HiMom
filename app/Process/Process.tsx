import React, { useEffect, useMemo, useState } from "react";
import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
import {
  Button,
  InputItem,
  Card,
  WhiteSpace,
  DatePicker,
  Toast,
  WingBlank,
  Steps,
  Modal,
  TextareaItem,
} from "@ant-design/react-native";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faCheckSquare,
  faCoffee,
  faTrash,
  faUser,
  faCalendar,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";

import dayjs from "dayjs";
import {
  deleteAItemBabyFromBabyList,
  insertValueBabyToBabyList,
  updateValueOfABabyInBabyList,
} from "../../api/login/login";
import CardHeader from "@ant-design/react-native/lib/card/CardHeader";
import { useNavigation } from "@react-navigation/native";
import CardBody from "@ant-design/react-native/lib/card/CardBody";

interface Props {
  listAccountBaby?: any;
  nameRouteUserId?: number;
}
const ProcessBaby = ({ listAccountBaby, nameRouteUserId }: Props) => {
  library.add(faCheckSquare, faCoffee, faTrash, faUser, faCalendar, faEdit);
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const Step = Steps.Step;

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

      console.log("idCurrent", dateParts, dateObject);
    }
    return dateObject;
  }, [listAccountBaby]);

  const isBirthday = useMemo(() => {
    let valueReturn = "";
    if (listAccountBaby) {
      let idCurrent = listAccountBaby?.find((item) => Number(item.id) === Number(nameRouteUserId));

      if (idCurrent) valueReturn = String(idCurrent?.birthday);
    }
    return valueReturn;
  }, [listAccountBaby, nameRouteUserId]);

  const [listEvent, setListEvent] = useState<any>();
  const [nameEvent, setNameEvent] = useState<any>();
  const [dateEvent, setDateEvent] = useState<any>();
  const [desEvent, setDesEvent] = useState<any>();
  const [noteEvent, setNoteEvent] = useState<any>();

  const handleAddEvent = () => {
    Modal.alert(
      "Thêm sự kiện",
      <View style={{ width: windowWidth }}>
        <Text> Tên sự kiện:</Text>
        <InputItem
          placeholder="Tên sự kiện"
          style={{ width: "90%", paddingLeft: -20, margin: 0 }}
          multiline
          textBreakStrategy="highQuality"
          onChangeText={(value) => setNameEvent(value?.trim())}
        ></InputItem>
        <Text>Ngày xảy ra sự kiện:</Text>
        <InputItem
          placeholder="Ngày xảy ra sự kiện"
          onChangeText={(value) => setDateEvent(value?.trim())}
        ></InputItem>
        <Text> Mô tả sự kiện:</Text>
        <TextareaItem
          rows={4}
          placeholder="Mô tả sự kiện"
          autoHeight
          style={{ paddingVertical: 5 }}
          onChangeText={(value) => setDesEvent(value?.trim())}
        />
        <Text>Ghi chú:</Text>
        <InputItem
          placeholder="Ghi chú"
          multiline
          onChangeText={(value) => setNoteEvent(value?.trim())}
        ></InputItem>
      </View>,
      [
        { text: "Thoát", onPress: () => console.log("cancel"), style: "cancel" },
        { text: "Thêm", onPress: () => console.log("ok") },
      ]
    );
  };
  return (
    <View
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
      }}
    >
      <Card
        style={{
          width: windowWidth - 15,
        }}
      >
        <CardHeader
          title={
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <Text style={{ color: "#1870bc", fontSize: 16, fontWeight: "bold" }}>
                Quá trình phát triển:
              </Text>
              <Button size="small" onPress={() => handleAddEvent()}>
                Thêm sự kiện
              </Button>
            </View>
          }
        ></CardHeader>
        <CardBody>
          <WingBlank size="lg">
            <Steps size="large">
              <Step
                title={<Text> {isFirstDay}</Text>}
                description={"nhịp đập đầu tiên!"}
                status={"finish"}
              />
              <Step title={<Text> {now}</Text>} description={"Hôm nay"} status={"success"} />
              <Step title={<Text> {isBirthday}</Text>} description={"Oa oa"} status={"wait"} />
            </Steps>
          </WingBlank>
        </CardBody>
      </Card>
    </View>
  );
};

export default ProcessBaby;

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  logo: {
    width: 66,
    height: 58,
  },
});
