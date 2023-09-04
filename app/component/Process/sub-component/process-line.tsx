import { Steps, Text, View, WhiteSpace, Button } from "@ant-design/react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React from "react";
import { faCheck, faSeedling, faHandsClapping } from "@fortawesome/free-solid-svg-icons";
import { useWindowDimensions } from "react-native";

interface Props {
  isFirstDay: any;
  isDiffFirstDay: any;
  diffDay: any;
}

const ProcessLine = ({ isFirstDay, isDiffFirstDay, diffDay }: Props) => {
  const Step = Steps.Step;
  const { width } = useWindowDimensions();

  return (
    <View
      style={{
        width: width,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: 10,
      }}
    >
      <Steps size="small" direction="horizontal">
        <Step
          key={0}
          title={
            <View>
              <Text>Xuất phát:</Text>
            </View>
          }
          description={
            <Text>
              <Button size="small" type="ghost">
                <Text>{isFirstDay}</Text>
              </Button>
            </Text>
          }
          status={"finish"}
          renderIcon={() => <FontAwesomeIcon icon={faCheck} size={14} color="#1870bc" />}
        />
        <Step
          key={1111}
          title={
            <View>
              <WhiteSpace />
              <Text>Cùng nhau:</Text>
            </View>
          }
          description={
            <Text>
              <Button size="small" type="ghost">
                <Text style={{ color: "green", fontWeight: "600" }}>{isDiffFirstDay}</Text>
                <Text> ngày</Text>
              </Button>
            </Text>
          }
          status={"wait"}
          renderIcon={() => <FontAwesomeIcon icon={faSeedling} color="green" size={14} />}
        />
        <Step
          key={22222}
          title={
            <View>
              <Text>Dự kiến:</Text>
            </View>
          }
          description={
            <Text>
              <Button size="small" type="ghost">
                <Text style={{ color: "#faad00", fontWeight: "600" }}>{diffDay}</Text>
                <Text> ngày nữa!</Text>
              </Button>
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
