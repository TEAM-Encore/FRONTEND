import TicketDetailStyles from '@/app/ticketBook/TicketDetailScreen/style';
import useAppNavigation from '@/features/core/hooks/useAppNavigation';
import {PostIcon} from '@/assets/icons/dashboard/PostIcon';
import {TicketBookIcon} from '@/assets/icons/ticketBook/TicketBookIcon';
import useDialog from '@/features/core/hooks/useDialog';
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {SvgXml} from 'react-native-svg';
import useRemoveTicket from '../../hooks/useRemoveTicket';

type Props = {
  ticketId: number;
};

function TicketBookDetailsHeader({ticketId}: Props) {
  const {goBack, navigate} = useAppNavigation();
  const {showDialog} = useDialog();

  const removeTicket = useRemoveTicket();

  const handleEditPress = () => {
    navigate('EditTicketScreen', {id: ticketId});
  };

  const handleRemovePress = () => {
    showDialog({
      title: '티켓 내역을 삭제할까요?',
      desc: '티켓 내역이 삭제되며 복구할 수 없습니다.',
      confirmLabel: '삭제하기',
      onConfirm: () => {
        removeTicket(ticketId, {
          onSuccess: () => {
            goBack();
          },
        });
      },
    });
  };

  return (
    <View style={TicketDetailStyles.containerHeader}>
      <TouchableOpacity style={TicketDetailStyles.iconGoBack} onPress={goBack}>
        <SvgXml style={{margin: 7.75}} xml={PostIcon.arrowLeft} />
      </TouchableOpacity>

      <Text style={TicketDetailStyles.textTitle}>티켓 내역</Text>

      <TouchableOpacity
        onPress={handleEditPress}
        style={{position: 'absolute', right: 65}}>
        <SvgXml xml={TicketBookIcon.edit} />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handleRemovePress}
        style={{position: 'absolute', right: 25}}>
        <SvgXml xml={TicketBookIcon.delete} />
      </TouchableOpacity>
    </View>
  );
}

export default TicketBookDetailsHeader;
