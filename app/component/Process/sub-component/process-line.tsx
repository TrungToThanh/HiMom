import { Steps, Text, View, WhiteSpace, Button } from "@ant-design/react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React, { useMemo, useState } from "react";
import { faCheck, faSeedling, faHandsClapping } from "@fortawesome/free-solid-svg-icons";
import { useWindowDimensions } from "react-native";
import { UserIdBase } from "../../../const/type";
import ModalAddProcessLine from "./modal-add-process-line";
import dayjs from "dayjs";
import { getAllEventProcessLine } from "../../../../api/eventProcess/process line";

interface Props {
  idUserCurrent: UserIdBase;
  nameRouteUserId: any;
  setLoadingAgain: (value) => void;
  isFirstDate: string;
}

const ProcessLine = ({ idUserCurrent, nameRouteUserId, isFirstDate, setLoadingAgain }: Props) => {
  const Step = Steps.Step;
  const { width } = useWindowDimensions();
  const [isDisplayModalAddEventProcessLine, setDisplayModalAddEventProcessLine] =
    useState<boolean>(false);

  const [isLoading, setIsLoading] = useState(false);

  const { listEventProcessLine } = getAllEventProcessLine(nameRouteUserId, isLoading);

  const isDiffFirstDay = useMemo(() => {
    let dateObject;
    if (idUserCurrent && listEventProcessLine?.length > 0) {
      if (Boolean(idUserCurrent.isBorn)) {
        var dateParts: any = listEventProcessLine?.at(0).dateFirst?.split("-");

        dateObject = dayjs(new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0])).diff(
          dayjs(new Date()),
          "days"
        );
      } else {
        var dateParts: any = listEventProcessLine?.at(0).dateFirst?.split("-");

        dateObject = dayjs(new Date()).diff(
          dayjs(new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0])),
          "days"
        );
      }
    }
    return dateObject;
  }, [idUserCurrent, listEventProcessLine]);

  const eventInfo = useMemo(() => {
    if (listEventProcessLine) {
      return { event1: listEventProcessLine[0]?.eventFirst };
    }
  }, [listEventProcessLine]);

  return (
    <View
      style={{
        width: width,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: 10,
      }}
      onTouchStart={() => setDisplayModalAddEventProcessLine(true)}
    >
      <ModalAddProcessLine
        listEventProcessLine={listEventProcessLine}
        nameRouteUserId={nameRouteUserId}
        isFirstDate={isFirstDate}
        isExpectedBirthDay={idUserCurrent.expectedBirthday}
        isBirthDay={idUserCurrent.birthday}
        isBorn={idUserCurrent.isBorn}
        setLoadingAgain={(value) => {
          setLoadingAgain(value);
          setIsLoading(value);
        }}
        isDisplayModalAddEventProcessLine={isDisplayModalAddEventProcessLine}
        setDisplayModalAddEventProcessLine={() => setDisplayModalAddEventProcessLine(false)}
      />
      <Steps size="small" direction="horizontal">
        <Step
          key={0}
          title={
            <View>
              <Text>{listEventProcessLine?.at(0)?.eventFirst || ""}</Text>
            </View>
          }
          description={<Text>{listEventProcessLine?.at(0)?.dateFirst}</Text>}
          status={"finish"}
          renderIcon={() => <FontAwesomeIcon icon={faCheck} size={14} color="#1870bc" />}
        />
        <Step
          key={1}
          title={
            <View>
              <WhiteSpace />
              <Text>{listEventProcessLine?.at(0)?.eventSecond || ""}</Text>
            </View>
          }
          description={
            <Text style={{ color: "green", fontWeight: "600" }}>{`${isDiffFirstDay} ngày`}</Text>
          }
          status={"wait"}
          renderIcon={() => <FontAwesomeIcon icon={faSeedling} color="green" size={14} />}
        />
        <Step
          key={2}
          title={
            <View>
              <Text>{listEventProcessLine?.at(0)?.eventThree}</Text>
            </View>
          }
          description={
            <Text style={{ color: "#faad00", fontWeight: "600" }}>
              {listEventProcessLine?.at(0)?.dateThree}
            </Text>
          }
          status={"wait"}
          icon={<FontAwesomeIcon icon={faHandsClapping} color="#faad00" size={13} />}
        />
      </Steps>
    </View>
  );
};

export default ProcessLine;
