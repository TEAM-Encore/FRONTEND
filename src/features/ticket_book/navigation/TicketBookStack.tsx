import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import TicketBookScreen from '@/app/ticketBook/TicketBookScreen';
import AddTicketScreen from '@/app/ticketBook/AddTicketScreen';
import EditTicketScreen from '@/app/ticketBook/EditTicketScreen';
import TicketDetailScreen from '@/app/ticketBook/TicketDetailScreen';

export type TicketBookStackParamList = {
  TicketBookScreen: undefined;
  AddTicketScreen: undefined;
  EditTicketScreen: undefined;
  TicketDetailScreen: undefined;
};

const Stack = createStackNavigator<TicketBookStackParamList>();

export default function TicketBookStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="TicketBookScreen" component={TicketBookScreen} />
      <Stack.Screen name="AddTicketScreen" component={AddTicketScreen} />
      <Stack.Screen name="EditTicketScreen" component={EditTicketScreen} />
      <Stack.Screen name="TicketDetailScreen" component={TicketDetailScreen} />
    </Stack.Navigator>
  );
}
