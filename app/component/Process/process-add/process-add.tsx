import React, { useCallback, useEffect, useMemo, useState } from "react";
import { StyleSheet, Text, View, useWindowDimensions } from "react-native";
import { Button, WhiteSpace } from "@ant-design/react-native";
import { ContentTextAdd } from "./sub-component/content-text";
import { TitleProcessAdd } from "./sub-component/title";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ContentAttachmentAdd } from "./sub-component/context-attachment";
import { ContentPermissionAdd } from "./sub-component/content-permission";

interface Props {
  accountParentId: any;
  accountBabyId: any;
}
const ProcessBabyAdd = ({ accountParentId, accountBabyId }: Props) => {
  const { width, height } = useWindowDimensions();

  return (
    <GestureHandlerRootView>
      <View
        style={{
          minHeight: 50,
          width: width - 10,
          backgroundColor: "white",
          borderColor: "#dedce2",
          borderWidth: 1,
          borderRadius: 5,
          margin: 5,
          padding: 5,
        }}
      >
        <TitleProcessAdd />
        <ContentTextAdd />
        <ContentAttachmentAdd />
        <ContentPermissionAdd />
        <View style={{ marginTop: 20 }}>
          <Button type="ghost">Hoàn thành</Button>
        </View>
      </View>
    </GestureHandlerRootView>
  );
};

export default ProcessBabyAdd;

const styles = StyleSheet.create({
  div: {
    borderColor: "blue",
    borderWidth: 1,
    borderRadius: 6,
    margin: 5,
    paddingTop: 5,
  },
});
