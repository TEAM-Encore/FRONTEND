import React, {useCallback, useState} from 'react';
import {FlatList, ListRenderItem, Text} from 'react-native';
import TicketBookItem from '../TicketBookItem';
import styled from 'styled-components/native';
import {SvgXml} from 'react-native-svg';
import {DashboardIcon} from '@/assets/icons/dashboard/DashboardIcon';
import TicketBookStyles from '@/app/ticketBook/TicketBookScreen/style';
import {overlay} from 'overlay-kit';
import TicketBookFilterBottomSheet from '../TicketBookFilterBottomSheet';
import {ITicketBookListFilter} from '@/api/ticketBookList.api';
import {TICKET_BOOK_FILTER_LIST} from '../../common/constants';

function TicketBookList() {
  const [filter, setFilter] = useState<ITicketBookListFilter>('NULL');
  const tickets = Array.from({length: 10});

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

  const renderItem: ListRenderItem<any> = useCallback(
    ({item}) => <TicketBookItem title="위키드" />,
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
        data={tickets}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <Gap />}
        contentContainerStyle={{padding: 20}}
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
