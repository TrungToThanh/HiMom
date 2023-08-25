import React, { useMemo, useState } from "react";
import { View } from "react-native";

import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useRoute } from "@react-navigation/native";
import DetailShopModal from "./detail_shop_modal";
import DetailListModal from "./detail_list_modal";

const DetailShopList = () => {
  const route = useRoute();

  const nameRouteUserId = useMemo(() => {
    if (route) {
      /* @ts-ignore */
      return route?.params?.userId;
    }
  }, []);

  const nameRouteTypeTable = useMemo(() => {
    if (route) {
      /* @ts-ignore */
      return route?.params?.typeTable;
    }
  }, []);

  const nameRouteItemId = useMemo(() => {
    if (route) {
      /* @ts-ignore */
      return route?.params?.itemId;
    }
  }, []);

  const [isShowDetailModal, setShowDetailModal] = useState<boolean>(false);
  const [isInfo, setShowInfo] = useState(false);
  const [showComponent, setReload] = useState<boolean>(true);
  const [itemIdCurrent, setItemIdCurrent] = useState<number>();

  return (
    <GestureHandlerRootView>
      {isShowDetailModal ? (
        <DetailShopModal
          isInfo={isInfo}
          setShowDetailModal={() => setShowDetailModal(false)}
          setReload={() => {
            setReload(false);
            setTimeout(() => {
              setReload(true);
            }, 300);
          }}
          nameRouteTypeTable={nameRouteTypeTable}
          nameRouteUserId={nameRouteUserId}
          nameRouteItemId={nameRouteItemId}
          itemIdCurrent={itemIdCurrent}
        />
      ) : (
        <View>
          {showComponent && (
            <DetailListModal
              setShowDetailModal={() => setShowDetailModal(true)}
              setShowInfo={() => setShowInfo(true)}
              setReload={() => {
                setShowInfo(false);
                setReload(false);
                setTimeout(() => {
                  setReload(true);
                }, 300);
              }}
              nameRouteTypeTable={nameRouteTypeTable}
              nameRouteUserId={nameRouteUserId}
              nameRouteItemId={nameRouteItemId}
              setItemIdCurrent={(itemId) => setItemIdCurrent(itemId)}
            />
          )}
        </View>
      )}
    </GestureHandlerRootView>
  );
};

export default DetailShopList;
