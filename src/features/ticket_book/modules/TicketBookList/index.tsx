import React, {useCallback, useState} from 'react';
import {FlatList, ListRenderItem, Text} from 'react-native';
import TicketBookItem from '../TicketBookItem';
import styled from 'styled-components/native';
import {SvgXml} from 'react-native-svg';
import {DashboardIcon} from '@/assets/icons/dashboard/DashboardIcon';
import TicketBookStyles from '@/app/ticketBook/TicketBookScreen/style';
import {overlay} from 'overlay-kit';
import TicketBookFilterBottomSheet from '../TicketBookFilterBottomSheet';
import {ITicketBook, ITicketBookListFilter} from '@/api/ticketBookList.api';
import {TICKET_BOOK_FILTER_LIST} from '../../common/constants';
import useTicketBookList from '../../hooks/useTicketBookList';
import {useRefresh} from '@react-native-community/hooks';

function TicketBookList() {
  const [filter, setFilter] = useState<ITicketBookListFilter>('NULL');
  const {ticketBookList, refetch} = useTicketBookList(filter);
  const {isRefreshing, onRefresh} = useRefresh(refetch);

  const handleFilterPress = () => {
    overlay.open(props => (
      <TicketBookFilterBottomSheet
        {...props}
        value={filter}
        onConfirm={setFilter}
      />
    ));
  };

  const getFilterLabel = (value: ITicketBookListFilter) =>
    TICKET_BOOK_FILTER_LIST.find(i => i.value === value)?.label ?? '기간 설정';

  const renderItem: ListRenderItem<ITicketBook> = useCallback(
    ({item}) => <TicketBookItem ticket={item} />,
    [],
  );

  return (
    <Root>
      <Header>
        <FilterBtn onPress={handleFilterPress}>
          <Text style={TicketBookStyles.textCategory}>
            {getFilterLabel(filter)}
          </Text>
          <SvgXml xml={DashboardIcon.arrowDown} />
        </FilterBtn>
      </Header>

      <FlatList
        data={ticketBookList}
        renderItem={renderItem}
        refreshing={isRefreshing}
        onRefresh={onRefresh}
        ItemSeparatorComponent={() => <Gap />}
        contentContainerStyle={{padding: 20}}
        keyExtractor={item => item.id.toString()}
      />
    </Root>
  );
}

export default TicketBookList;

const Root = styled.View`
  flex: 1;
`;

const Header = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 4px 20px;
`;

const FilterBtn = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  gap: 4px;
`;

const Gap = styled.View`
  height: 21px;
`;
