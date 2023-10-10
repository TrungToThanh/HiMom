import React, { useCallback, useMemo, useState } from "react";
import { View } from "@ant-design/react-native";
import { StyleSheet, Text, useWindowDimensions } from "react-native";
import { Image } from "expo-image";
import { ImageUpload } from "../../../../const/type";
import ImageView from "react-native-image-viewing";
import { ResizeMode, Video } from "expo-av";

type Props = {
  listAttachment: any;
};
export const ContentAttachment = ({ listAttachment }: Props) => {
  const { width } = useWindowDimensions();
  const [isShowPreview, setShowPreview] = useState(false);
  let sourceCook: any;

  const listImages = useMemo(() => {
    const list = listAttachment?.filter((item) => item.type !== "video");
    return list;
  }, [listAttachment]);

  const listVideo = useMemo(() => {
    const list = listAttachment?.filter((item) => item.type === "video");
    return list;
  }, [listAttachment]);

  if (!listAttachment || listAttachment?.length < 1) return <Text></Text>;
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      <ImageView
        images={
          typeof listImages !== "string"
            ? listImages
            : {
                base64: `data:image/png;base64,${listImages}`,
                uri: `data:image/png;base64,${listImages}`,
              }
        }
        imageIndex={0}
        visible={isShowPreview}
        onRequestClose={() => setShowPreview(false)}
      />
      <View>
        {listImages && listImages?.length > 0 && (
          <View style={styles.divImages}>
            {listImages?.map((itemSource: ImageUpload | any, index: number) => {
              if (typeof itemSource === "string") {
                if (String(itemSource)?.startsWith("data:image/png;base64,")) {
                  sourceCook = itemSource;
                } else {
                  sourceCook = `data:image/png;base64,${itemSource}`;
                }
              } else {
                if (itemSource?.base64 && String(itemSource?.base64)?.length > 0) {
                  sourceCook = `data:image/png;base64,${itemSource.base64}`;
                } else {
                  sourceCook = itemSource;
                }
              }

              return (
                <Image
                  key={index}
                  source={sourceCook ?? ""}
                  style={{
                    height: width / 3 - 20,
                    width: width / 3 - 20,
                    borderRadius: 10,
                  }}
                  transition={1000}
                  allowDownscaling
                  contentFit="cover"
                  onTouchStart={() => {
                    setShowPreview(true);
                  }}
                />
              );
            })}
          </View>
        )}

        {listVideo && listVideo?.length > 0 && (
          <View>
            {listVideo?.map((itemVideo, indexVideo) => {
              return (
                <Video
                  key={indexVideo + 20}
                  style={{
                    height: 300,
                    width: width - 40,
                  }}
                  source={itemVideo}
                  volume={1}
                  useNativeControls={true}
                  resizeMode={ResizeMode.CONTAIN}
                  isLooping
                />
              );
            })}
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  divImages: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    margin: 10,
    gap: 5,
  },
});
