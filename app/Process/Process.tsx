import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
} from "react-native";
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
  ActivityIndicator,
} from "@ant-design/react-native";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faCheckSquare,
  faCoffee,
  faTrash,
  faUser,
  faCalendar,
  faEdit,
  faL,
} from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";

import dayjs from "dayjs";

import CardHeader from "@ant-design/react-native/lib/card/CardHeader";
import { useNavigation } from "@react-navigation/native";
import CardBody from "@ant-design/react-native/lib/card/CardBody";
import { getAllEvent, insertANewEvent } from "../../api/eventProcess/event";

interface Props {
  listAccountBaby?: any;
  nameRouteUserId?: number;
}
const ProcessBaby = ({ listAccountBaby, nameRouteUserId }: Props) => {
  library.add(faCheckSquare, faCoffee, faTrash, faUser, faCalendar, faEdit);
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const Step = Steps.Step;
  const [isLoading, setIsLoading] = useState(false);

  //Get value date
  const now = dayjs().format("DD-MM-YYYYY");

  const isFirstDay = useMemo(() => {
    let dateObject = "";
    if (listAccountBaby) {
      let idCurrent = listAccountBaby?.find(
        (item) => Number(item.id) === Number(nameRouteUserId)
      );
      var dateParts = idCurrent?.birthday.split("-");

      // month is 0-based, that's why we need dataParts[1] - 1
      dateObject = dayjs(
        new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0])
      )
        .subtract(280, "days")
        .format("DD-MM-YYYY");

      console.log("idCurrent", dateParts, dateObject);
    }
    return dateObject;
  }, [listAccountBaby]);

  const isBirthday = useMemo(() => {
    let valueReturn = "";
    if (listAccountBaby) {
      let idCurrent = listAccountBaby?.find(
        (item) => Number(item.id) === Number(nameRouteUserId)
      );

      if (idCurrent) valueReturn = String(idCurrent?.birthday);
    }
    return valueReturn;
  }, [listAccountBaby, nameRouteUserId]);

  //Modal Add Event
  const [isShowEvent, setShowEvent] = useState<boolean>(false);
  const [nameEvent, setNameEvent] = useState<any>("");
  const [dateEvent, setDateEvent] = useState<any>("");
  const [desEvent, setDesEvent] = useState<any>("");
  const [noteEvent, setNoteEvent] = useState<any>("");

  const { listEvent } = getAllEvent();

  const listEventCook = useMemo(() => {
    const listEventCurrent = listEvent?.length > 0 ? listEvent : [];
    const isHasFirstDay = listEventCurrent?.find(
      (item) => Number(item.id) === -1
    );
    if (!isHasFirstDay)
      listEventCurrent?.unshift({
        id: -1,
        event: isFirstDay,
        description: "Nhịp đập đầu tiên!",
        status: "finish",
      });
    const isHasBirthDay = listEventCurrent?.find(
      (item) => Number(item.id) === 1000
    );
    if (!isHasBirthDay)
      listEventCurrent?.push(
        {
          id: 1000,
          event: now,
          description: "Hôm nay",
          status: "wait",
        },
        {
          id: 1001,
          event: isBirthday,
          description: "Oa oa",
          status: "wait",
        }
      );

    const newList = new Set(listEventCurrent);
    console.log(newList);
    return Array.from(newList);
  }, [listEvent]);

  const handleAddEvent = () => {
    console.log("nameEvent", nameEvent, dateEvent, desEvent, noteEvent);
    insertANewEvent(nameEvent, dateEvent, desEvent, noteEvent).then((isRes) => {
      setIsLoading(true);
      if (isRes) {
        Toast.success("Thêm sự kiện mới thành công!");
      } else {
        Toast.fail("Thất bại!");
      }
      setTimeout(() => {
        setIsLoading(false);
      }, 200);
    });
  };

  // if (isLoading)
  //   return (
  //     <View
  //       style={{
  //         display: "flex",
  //         justifyContent: "center",
  //         alignItems: "center",
  //       }}
  //     >
  //       <Text>
  //         Loading <ActivityIndicator />
  //       </Text>
  //     </View>
  //   );

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
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text
                style={{ color: "#1870bc", fontSize: 16, fontWeight: "bold" }}
              >
                Quá trình phát triển:
              </Text>
              <Button size="small" onPress={() => setShowEvent(true)}>
                Thêm sự kiện
              </Button>
            </View>
          }
        ></CardHeader>
        <CardBody>
          <ScrollView>
            <View>
              <WingBlank size="lg">
                <Steps size="large">
                  {listEventCook &&
                    listEventCook?.length > 0 &&
                    listEventCook?.map((item, index) => {
                      return (
                        <Step
                          key={item?.id}
                          title={<Text> {item?.event}</Text>}
                          description={item?.description}
                          status={item?.status || "finish"}
                        />
                      );
                    })}
                </Steps>
              </WingBlank>
            </View>
          </ScrollView>
        </CardBody>
      </Card>
      <Modal
        style={{
          width: windowWidth - 10,
          // height: windowHeight - 100,
          marginTop: 100,
        }}
        visible={isShowEvent}
        transparent
        animationType="fade"
        title={
          <Text style={{ color: "#1870bc", fontSize: 16, fontWeight: "bold" }}>
            Thêm sự kiện
          </Text>
        }
        footer={[
          {
            text: "Thoát",
            onPress: () => setShowEvent(false),
            style: "cancel",
          },
          {
            text: "Thêm",
            onPress: () => {
              setShowEvent(false);
              handleAddEvent();
            },
          },
        ]}
      >
        <View
          style={{
            width: windowWidth,
            display: "flex",
            justifyContent: "flex-start",
            marginTop: 10,
          }}
        >
          <Text style={{ fontSize: 14, fontWeight: "bold", paddingTop: 10 }}>
            Tên sự kiện:
          </Text>
          <InputItem
            placeholder="Tên sự kiện"
            multiline
            textBreakStrategy="highQuality"
            onChangeText={(value) => setNameEvent(value?.trim())}
            style={{ borderBottomWidth: 1, borderColor: "#1870bc" }}
          ></InputItem>
          <Text style={{ fontSize: 14, fontWeight: "bold", paddingTop: 10 }}>
            Ngày xảy ra sự kiện:
          </Text>
          <InputItem
            placeholder="Ngày xảy ra sự kiện"
            onChangeText={(value) => setDateEvent(value?.trim())}
            style={{ borderBottomWidth: 1, borderColor: "#1870bc" }}
          ></InputItem>
          <Text style={{ fontSize: 14, fontWeight: "bold", paddingTop: 10 }}>
            Mô tả sự kiện:
          </Text>
          <TextareaItem
            placeholder="Mô tả sự kiện"
            autoHeight
            rows={10}
            style={{
              marginLeft: 15,
              paddingLeft: -10,
              borderBottomWidth: 1,
              borderColor: "#1870bc",
            }}
            onChangeText={(value) => setDesEvent(value?.trim())}
          />
          <Text style={{ fontSize: 14, fontWeight: "bold", paddingTop: 10 }}>
            Ghi chú:
          </Text>
          <InputItem
            placeholder="Ghi chú"
            multiline
            onChangeText={(value) => setNoteEvent(value?.trim())}
            style={{ borderBottomWidth: 1, borderColor: "#1870bc" }}
          ></InputItem>
        </View>
      </Modal>
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
