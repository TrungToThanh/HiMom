import React from "react";
import { View } from "@ant-design/react-native";
import { faVideoCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useWindowDimensions } from "react-native";
import { Image } from "expo-image";
import { AVPlaybackSourceObject, ResizeMode, Video } from "expo-av";
import { Asset } from "expo-asset";
import { GestureHandlerRootView } from "react-native-gesture-handler";

type Props = {
  listImage: string[];
  listVideo: any[];
};
export const ContentAttachment = ({ listImage, listVideo }: Props) => {
  const { width } = useWindowDimensions();
  const video = React.useRef(null);
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      <View>
        {listImage &&
          listImage?.map((imageItem, indexImage) => (
            <Image
              // @ts-ignore
              key={indexImage}
              source={
                String(imageItem)?.startsWith("data:image/png;base64,")
                  ? imageItem
                  : `data:image/png;base64,${imageItem}`
              }
              style={{
                height: 120,
                width: (width - 60) / 3,
                borderRadius: 10,
              }}
              transition={1000}
              allowDownscaling
              contentFit="cover"
            />
          ))}
      </View>
      {/* <View>
        {listVideo &&
          listVideo?.map((videoItem: number | AVPlaybackSourceObject | Asset, indexVideo) => {
            return (
              <View
                key={indexVideo}
                style={{
                  borderWidth: 1,
                  borderRadius: 10,
                  borderColor: "#1870bc",
                  padding: 2,
                }}
                // onTouchStart={() => {
                //   video?.current?.presentFullscreenPlayer();
                //   video?.current?.playAsync();
                // }}
              >
                <Video
                  ref={video}
                  style={{
                    height: 120,
                    width: (width - 60) / 3,
                  }}
                  source={videoItem}
                  volume={1}
                  useNativeControls={false}
                  resizeMode={ResizeMode.CONTAIN}
                  isLooping={false}
                />
                <FontAwesomeIcon
                  icon={faVideoCamera}
                  size={10}
                  style={{ position: "absolute", margin: 5 }}
                  color="red"
                />
              </View>
            );
          })}
      </View> */}
    </View>
  );
};
