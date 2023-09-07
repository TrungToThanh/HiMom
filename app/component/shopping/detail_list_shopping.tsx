import React, { useMemo, useState } from "react";
import { View } from "react-native";
import { useRoute } from "@react-navigation/native";

import { GestureHandlerRootView } from "react-native-gesture-handler";
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

  const nameMainItemId = useMemo(() => {
    if (route) {
      /* @ts-ignore */
      return route?.params?.nameItemId;
    }
  }, []);

  const [isShowDetailModal, setShowDetailModal] = useState<boolean>(false);
  const [isInfo, setShowInfo] = useState(false);
  const [isCreate, setShowDetailModalToCreate] = useState(false);
  const [showComponent, setReload] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [itemIdCurrent, setItemIdCurrent] = useState<number>();

  return (
    <GestureHandlerRootView>
      {isShowDetailModal || isCreate ? (
        <DetailShopModal
          isCreate={isCreate}
          isInfo={isInfo}
          setShowDetailModal={() => {
            setShowDetailModal(false), setShowDetailModalToCreate(false);
          }}
          setReload={() => {
            setIsLoading(false);
            setTimeout(() => {
              setIsLoading(true);
            }, 100);
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
              isLoading={isLoading}
              setShowDetailModal={() => setShowDetailModal(true)}
              setShowDetailModalToCreate={() => {
                setShowDetailModalToCreate(true), setShowInfo(false);
              }}
              setShowInfo={() => {
                setShowDetailModalToCreate(false), setShowInfo(true);
              }}
              setReload={() => {
                setShowInfo(false);
                setReload(false);
                setTimeout(() => {
                  setReload(true);
                }, 300);
              }}
              setIsLoading={(value) => setIsLoading(value)}
              nameRouteTypeTable={nameRouteTypeTable}
              nameRouteUserId={nameRouteUserId}
              nameRouteItemId={nameRouteItemId}
              nameMainItemId={nameMainItemId}
              setItemIdCurrent={(itemId) => setItemIdCurrent(itemId)}
            />
          )}
        </View>
      )}
    </GestureHandlerRootView>
  );
};

export default DetailShopList;
