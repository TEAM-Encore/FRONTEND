import React from 'react';
import {SafeAreaView, View, Text, TouchableOpacity} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {TicketBookIcon} from '@/assets/icons/ticketBook/TicketBookIcon';
import IconSearch from '@/assets/icons/dashboard/IconSearch';
import IconNotification from '@/assets/icons/dashboard/IconNotification';
import TicketBookStyles from './style';
import useAppNavigation from '@/features/core/hooks/useAppNavigation';
import TicketBookList from '@/features/ticket_book/modules/TicketBookList';

export default function TicketBookScreen() {
  const navigation = useAppNavigation();

  return (
    <SafeAreaView style={TicketBookStyles.container}>
      <View style={TicketBookStyles.containerHeader}>
        <View style={TicketBookStyles.containerIcons}>
          <Text style={TicketBookStyles.textTitle}>티켓북</Text>

          <View style={TicketBookStyles.containerRow}>
            <TouchableOpacity
              onPress={() => navigation.navigate('HomeSearchScreen')}>
              <IconSearch style={{marginRight: 20}} />
            </TouchableOpacity>
            <IconNotification />
          </View>
        </View>
      </View>

      <TicketBookList />

      <TouchableOpacity
        style={TicketBookStyles.containerPlusButton}
        onPress={() => navigation.navigate('AddTicketScreen')}>
        <SvgXml xml={TicketBookIcon.plus} style={TicketBookStyles.iconPlus} />
        <Text style={TicketBookStyles.textPlusButton}>추가</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
