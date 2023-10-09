import React, { useCallback, useState } from "react";
import { View } from "@ant-design/react-native";
import { StyleSheet, Text, useWindowDimensions } from "react-native";
import { Image } from "expo-image";
import { ImageUpload } from "../../../../const/type";
import ImageView from "react-native-image-viewing";
// import firebase from "../../../../../api/firebase/firebase";
import { getStorage, ref, getDownloadURL, listAll } from "firebase/storage";
import firebase from "firebase/compat/app";
import { ResizeMode, Video } from "expo-av";

type Props = {
  listImage: any;
};
export const ContentAttachmentImage = ({ listImage }: Props) => {
  const { width } = useWindowDimensions();
  const [isShowPreview, setShowPreview] = useState(false);
  const [linkImage, setLink] = useState<any>();
  let sourceCook: any;

  if (!listImage || listImage?.length < 1) return <Text></Text>;
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      <ImageView
        images={typeof listImage !== "string" ? listImage : undefined}
        imageIndex={0}
        visible={isShowPreview}
        onRequestClose={() => setShowPreview(false)}
      />
      <View>
        {listImage &&
          listImage?.map((itemSource: ImageUpload | any, index: number) => {
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

            if (itemSource.type === "video") {
              return (
                <Video
                  key={index * 10}
                  style={{
                    height: 300,
                    width: width - 40,
                  }}
                  source={itemSource}
                  volume={1}
                  useNativeControls={true}
                  resizeMode={ResizeMode.CONTAIN}
                  isLooping
                />
              );
            }
            return (
              <View style={styles.divImages}>
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
              </View>
            );
          })}
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
