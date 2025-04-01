import React, { useState } from "react";
import { SafeAreaView, FlatList, Text, View, Switch } from "react-native";
import MyScreenStyles from "./MyScreenStyles";

// 알림 상태를 서버에 동기화하는 함수 (이미 구현했다고 가정)
const updateNotificationSetting = async (id: string, enabled: boolean) => {
  // 서버와 동기화하는 로직을 여기에 구현
  console.log(`알림 ID: ${id}, 활성화 여부: ${enabled}`);
};

const NotificationSettings = () => {
  // 알림 항목 및 상태
  const [notifications, setNotifications] = useState([
    { id: "1", label: "푸시 알림", enabled: false },
    { id: "2", label: "게시판 활동", subLabel: "좋아요, 댓글, 인기 게시글 등", enabled: false },
    { id: "3", label: "프리미엄 리뷰", subLabel: "추천, 인기 리뷰 등", enabled: false },
    { id: "4", label: "해시태그 알림", subLabel: "해시태그가 포함된 게시글/리뷰", enabled: false },
  ]);

  // 푸시 알림을 켰을 때 하위 항목들을 켬
  const togglePushNotification = async () => {
    setNotifications((prev) =>
      prev.map((item) => {
        if (item.id === "1") {
          const newEnabled = !item.enabled;
          return { ...item, enabled: newEnabled };
        }
        return item;
      })
    );

    // 푸시 알림을 켰을 때 하위 항목들도 모두 켬
    const newEnabled = !notifications.find((item) => item.id === "1")?.enabled;
    setNotifications((prev) =>
      prev.map((item) =>
        item.id !== "1" ? { ...item, enabled: newEnabled } : item
      )
    );

    // 서버와 동기화
    const updatedItem = notifications.find(item => item.id === "1");
    if (updatedItem) {
      await updateNotificationSetting("1", newEnabled);
    }
  };

  // 하위 항목을 개별적으로 토글하고, 푸시 알림 상태를 확인
  const toggleSubItem = async (id: string) => {
    setNotifications((prev) => {
      const newNotifications = prev.map((item) => {
        if (item.id === id) {
          return { ...item, enabled: !item.enabled };
        }
        return item;
      });

      // 푸시 알림 상태 업데이트 로직
      const pushNotification = newNotifications.find((item) => item.id === "1");
      const allSubItemsDisabled = newNotifications
        .filter((item) => item.id !== "1")
        .every((item) => !item.enabled);

      // 하위 항목들이 모두 꺼졌을 때 푸시 알림도 꺼짐
      if (pushNotification && allSubItemsDisabled) {
        return newNotifications.map((item) =>
          item.id === "1" ? { ...item, enabled: false } : item
        );
      }

      // 하위 항목 중 하나라도 켜져 있으면 푸시 알림 켬
      if (pushNotification && !allSubItemsDisabled) {
        return newNotifications.map((item) =>
          item.id === "1" ? { ...item, enabled: true } : item
        );
      }

      return newNotifications;
    });

    // 서버와 동기화
    const updatedItem = notifications.find(item => item.id === id);
    if (updatedItem) {
      await updateNotificationSetting(id, !updatedItem.enabled);
    }
  };

  // 렌더링 함수
  const renderItem = ({ item }: { item: { id: string; label: string; subLabel?: string; enabled: boolean } }) => (
    <View style={MyScreenStyles.notificationItem}>
      <View style={MyScreenStyles.notificationLabelContainer}>
        <Text style={MyScreenStyles.notificationText}>{item.label}</Text>
        {item.subLabel && <Text style={MyScreenStyles.notificationSubText}>{item.subLabel}</Text>}
      </View>
      <Switch
        value={item.enabled}
        onValueChange={() => {
          // 푸시 알림일 경우
          if (item.id === "1") {
            togglePushNotification();
          } else {
            toggleSubItem(item.id);
          }
        }} // 토글 시 서버와 동기화
        trackColor={{ false: "#ddd", true: "#FFF1BB" }} // #FFD700
      />
    </View>
  );

  return (
    <SafeAreaView style={MyScreenStyles.container}>
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
};

export default NotificationSettings;
