import { View } from "@ant-design/react-native";
import React, { useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ContentReact } from "./content-react";
import { ContentComment } from "./content-comment";

type Prop = {
  item: any;
  accountBabyId: string;
};
export const ReactAndComment = ({ item, accountBabyId }: Prop) => {
  const [isShowComment, setShowComment] = useState(false);
  return (
    <GestureHandlerRootView>
      <View>
        <ContentReact
          item={item}
          accountBabyId={accountBabyId}
          setShowComment={() => setShowComment(!isShowComment)}
        />
        {isShowComment && <ContentComment item={item} accountBabyId={accountBabyId} />}
      </View>
    </GestureHandlerRootView>
  );
};
