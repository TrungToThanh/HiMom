import React from "react";
import { View } from "@ant-design/react-native";
import { faVideoCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Text, useWindowDimensions } from "react-native";
import { Image } from "expo-image";
import { AVPlaybackSourceObject, ResizeMode, Video } from "expo-av";
import { Asset } from "expo-asset";
import { GestureHandlerRootView } from "react-native-gesture-handler";

type Props = {
  listVideo: any;
};
export const ContentAttachmentVideo = ({ listVideo }: Props) => {
  const { width } = useWindowDimensions();
  const video = React.useRef(null);
  if (!listVideo || listVideo?.length <= 0) return <Text></Text>;
  // return (
  //   <View
  //     style={{
  //       display: "flex",
  //       flexDirection: "row",
  //       justifyContent: "center",
  //     }}
  //   >
  //     <View>
  //       {listVideo?.map((itemVideo, indexVideo) => {
  //         return (
  //           <Video
  //             key={indexVideo}
  //             style={{
  //               height: 300,
  //               width: width - 40,
  //             }}
  //             source={itemVideo}
  //             volume={1}
  //             useNativeControls={true}
  //             resizeMode={ResizeMode.CONTAIN}
  //             isLooping
  //           />
  //         );
  //       })}
  //     </View>
  //   </View>
  // );
};
