import { Dimensions, StatusBar } from "react-native";
import { useHeaderHeight } from "@react-navigation/elements";

const getDimensions = () => {
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const statusBarHeight = StatusBar.currentHeight;
  const headerHeight = useHeaderHeight();
  const cardHeight = windowHeight - statusBarHeight - headerHeight;
  const headerCardHeight = 30;
  const footerCardHeight = 30;
  const bodyCardHeight =
    windowHeight - statusBarHeight - headerCardHeight - footerCardHeight - 100;
  return {
    windowWidth,
    windowHeight,
    cardHeight,
    headerCardHeight,
    bodyCardHeight,
  };
};
export default getDimensions;
