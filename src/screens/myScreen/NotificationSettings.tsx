import React, { useState } from "react";
import { SafeAreaView, FlatList, Text, View, Switch, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import MyScreenStyles from "./MyScreenStyles";

type NavigationProp = {
    navigate: (screen: 'MarketingDetails') => void;
  };

const updateNotificationSetting = async (id: string, enabled: boolean) => {
  console.log(`알림 ID: ${id}, 활성화 여부: ${enabled}`);
};

const NotificationSettings = () => {
  const navigation = useNavigation();
  const [notifications, setNotifications] = useState([
    { id: "1", label: "푸시 알림", enabled: false },
    { id: "2", label: "게시판 활동", subLabel: "좋아요, 댓글, 인기 게시글 등", enabled: false },
    { id: "3", label: "프리미엄 리뷰", subLabel: "추천, 인기 리뷰 등", enabled: false },
    { id: "4", label: "해시태그 알림", subLabel: "해시태그가 포함된 게시글/리뷰", enabled: false },
  ]);

  const [marketingOptIn, setMarketingOptIn] = useState(false);

  const togglePushNotification = async () => {
    setNotifications((prev) =>
      prev.map((item) => (item.id === "1" ? { ...item, enabled: !item.enabled } : item))
    );

    const newEnabled = !notifications.find((item) => item.id === "1")?.enabled;
    setNotifications((prev) =>
      prev.map((item) => (item.id !== "1" ? { ...item, enabled: newEnabled } : item))
    );

    const updatedItem = notifications.find((item) => item.id === "1");
    if (updatedItem) {
      await updateNotificationSetting("1", newEnabled);
    }
  };

  const toggleSubItem = async (id: string) => {
    setNotifications((prev) => {
      const newNotifications = prev.map((item) =>
        item.id === id ? { ...item, enabled: !item.enabled } : item
      );

      const pushNotification = newNotifications.find((item) => item.id === "1");
      const allSubItemsDisabled = newNotifications
        .filter((item) => item.id !== "1")
        .every((item) => !item.enabled);

      if (pushNotification && allSubItemsDisabled) {
        return newNotifications.map((item) =>
          item.id === "1" ? { ...item, enabled: false } : item
        );
      }

      if (pushNotification && !allSubItemsDisabled) {
        return newNotifications.map((item) =>
          item.id === "1" ? { ...item, enabled: true } : item
        );
      }

      return newNotifications;
    });

    const updatedItem = notifications.find((item) => item.id === id);
    if (updatedItem) {
      await updateNotificationSetting(id, !updatedItem.enabled);
    }
  };

  const toggleMarketingOptIn = async () => {
    const newStatus = !marketingOptIn;
    setMarketingOptIn(newStatus);
    await updateNotificationSetting("marketing", newStatus);
  };

  const renderItem = ({
    item,
    index,
  }: {
    item: { id: string; label: string; subLabel?: string; enabled: boolean };
    index: number;
  }) => (
    <View
      style={[
        MyScreenStyles.notificationItem,
        ["2", "3", "4"].includes(item.id) && { backgroundColor: "#F2F2F2" },
        index === notifications.length - 1 && { borderBottomWidth: 0 }, // 마지막 아이템이면 아래 선 제거
      ]}
    >
      <View style={MyScreenStyles.notificationLabelContainer}>
        <Text style={MyScreenStyles.notificationText}>{item.label}</Text>
        {item.subLabel && <Text style={MyScreenStyles.notificationSubText}>{item.subLabel}</Text>}
      </View>
      <Switch
        value={item.enabled}
        onValueChange={() => {
          if (item.id === "1") {
            togglePushNotification();
          } else {
            toggleSubItem(item.id);
          }
        }}
        trackColor={{ false: "#ddd", true: "#FFF1BB" }}
      />
    </View>
  );

  return (
    <SafeAreaView style={MyScreenStyles.container}>
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingTop: 39 }}
        ListFooterComponent={
            <View style={{ paddingBottom: 10 }}>
            <View style={[MyScreenStyles.marketingContainer, { marginTop: 39 }]}>
              <Text style={MyScreenStyles.notificationText}>마케팅 정보 수신</Text>
              <Switch
                value={marketingOptIn}
                onValueChange={toggleMarketingOptIn}
                trackColor={{ false: "#ddd", true: "#FFF1BB" }}
              />
            </View>
            {/* fullWidthLine을 "마케팅 정보 수신"에서 19.5만큼 떨어뜨리기 위해 marginTop 추가 */}
             <View style={[MyScreenStyles.fullWidthLine, { marginTop: 0 }]} />
          
            {/* 마케팅 정보 수신 동의 약관 */}
            <TouchableOpacity
              onPress={() => navigation.navigate("MarketingDetails")}
              style={{ alignSelf: "flex-start", marginLeft: 19, marginTop: 11 }}
            >
              <Text style={{ fontSize: 11, color: "#A5A5A5", textDecorationLine: "underline" }}>
                마케팅 정보 수신 동의 약관
              </Text>
            </TouchableOpacity>
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default NotificationSettings;
