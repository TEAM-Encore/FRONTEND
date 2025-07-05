import {Text, SafeAreaView} from 'react-native';
import React from 'react';
import NotificationSettingHeader from '@/features/my/modules/NotificationSetting/NotificationSettingHeader';
import NotificationSettingList from '../../../features/my/modules/NotificationSetting/NotificationSettingList';

export default function NotificationSettingScreen() {
  return (
    <SafeAreaView style={{flex: 1}}>
      <NotificationSettingHeader />
      <NotificationSettingList />
    </SafeAreaView>
  );
}
