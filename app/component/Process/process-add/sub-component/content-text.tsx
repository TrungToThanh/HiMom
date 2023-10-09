import { Text, View } from "@ant-design/react-native";
import React from "react";
import { StyleSheet, useWindowDimensions } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { ImageUpload } from "../../../../const/type";
import { Image } from "expo-image";
import { ResizeMode, Video } from "expo-av";

type Props = {
  setContent: (value) => void;
  listAttachmentAddNew: any;
};

export const ContentTextAdd = ({ setContent, listAttachmentAddNew }: Props) => {
  const { width } = useWindowDimensions();
  return (
    <View style={styles.div}>
      <TextInput
        multiline
        textBreakStrategy="highQuality"
        style={styles.divContent}
        placeholder="Nhập nội dung"
        onChangeText={(value) => setContent(value)}
      />
      <View>
        {listAttachmentAddNew?.map((itemSource: ImageUpload, index) => {
          if (itemSource.type === "image") {
            return (
              <View style={styles.divImages} key={index}>
                <Image
                  source={itemSource}
                  style={{
                    height: width / 3 - 20,
                    width: width / 3 - 20,
                    borderRadius: 10,
                  }}
                  transition={1000}
                  allowDownscaling
                  contentFit="cover"
                />
              </View>
            );
          }
          return (
            <View style={styles.divVideo} key={index}>
              <Video
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
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  div: {
    borderColor: "green",
    borderWidth: 1,
    borderRadius: 6,
    margin: 5,
    paddingTop: 5,
  },
  divContent: {
    fontSize: 13,
    fontWeight: "400",
    marginLeft: 5,
    minHeight: 80,
  },
  divImages: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 10,
  },
  divVideo: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
});
