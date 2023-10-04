import React, { useState } from "react";
import { Button, View } from "@ant-design/react-native";
import { faImages, faVideoCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Keyboard, StyleSheet, Text, useWindowDimensions } from "react-native";
import * as ImagePicker from "expo-image-picker";

type Props = {
  setListVideoAddNew: (list) => void;
};

export const ContentAttachmentAddVideo = ({ setListVideoAddNew }: Props) => {
  const { width } = useWindowDimensions();
  const video = React.useRef(null);
  const [isShowButton, setShowButton] = useState(false);

  const handleSelectPic = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: false,
      quality: 1,
      base64: false,
      selectionLimit: 1,
      allowsMultipleSelection: true,
    });

    if (!result.canceled) {
      setListVideoAddNew(result.assets);
      setShowButton(result.assets.length > 0 ? true : false);
    }
  };

  const handleDeleteAllPicture = () => {
    setListVideoAddNew(null);
    setShowButton(false);
  };

  return (
    <View style={styles.divUpload}>
      <View style={styles.buttonUpload}>
        <View
          style={styles.buttonUpload}
          onTouchStart={() => {
            handleSelectPic();
            Keyboard.dismiss();
          }}
        >
          <FontAwesomeIcon icon={faVideoCamera} />
          <Text> Đính kèm video </Text>
        </View>
        {isShowButton && (
          <View>
            <Button size="small" type="warning" onPress={handleDeleteAllPicture}>
              Xóa
            </Button>
          </View>
        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  divUpload: {
    height: 34,
    borderColor: "green",
    borderWidth: 1,
    borderRadius: 6,
    margin: 5,
    padding: 5,
  },
  buttonUpload: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
