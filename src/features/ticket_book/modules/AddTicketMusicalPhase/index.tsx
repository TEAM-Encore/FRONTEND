import React, {useCallback, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import _ from 'lodash';
import {SvgXml} from 'react-native-svg';
import {TicketBookIcon} from '@/assets/icons/ticketBook/TicketBookIcon';
import AddTicketStyles from '@/app/ticketBook/AddTicketScreen/style';
import styled from 'styled-components/native';
import useMusicalSearch from '../../hooks/useMusicalSearch';
import useAddTicketStore from '../../stores/useAddTicketStore';
import {IMusicalSearch} from '@/api/search.api';

type Props = {
  onSelect: () => void;
};

export default function AddTicketMusicalPhase({onSelect}: Props) {
  const musical = useAddTicketStore(s => s.musical);
  const setMusical = useAddTicketStore(s => s.setMusical);

  const [musicalTitle, setMusicalTitle] = useState(musical?.title ?? '');
  const {result, refetch} = useMusicalSearch(musicalTitle.trim());

  const debouncedSearch = useCallback(
    _.debounce((title: string) => {
      if (!title.trim()) return;
      refetch();
    }, 300),
    [],
  );

  const handleInputChange = (text: string) => {
    setMusicalTitle(text);
    debouncedSearch(text);
  };

  const selectMusical = (musical: IMusicalSearch) => {
    setMusical({
      id: musical.musical_id,
      title: musical.title,
      location: musical.location,
    });
    onSelect();
  };

  return (
    <Root>
      <ScrollView>
        <Main>
          <Head>
            <Text style={AddTicketStyles.textProgress}>1/5</Text>
            <Text style={AddTicketStyles.textTitle}>
              관람한 공연을 선택해주세요.
            </Text>
          </Head>

          <View style={AddTicketStyles.containerTextInputIcon}>
            <TextInput
              style={AddTicketStyles.textInputSearch}
              placeholder="공연명 검색"
              onChangeText={handleInputChange}
              value={musicalTitle}
            />
            <SvgXml
              style={AddTicketStyles.iconSearch}
              xml={TicketBookIcon.search}
            />
            {musicalTitle !== '' && (
              <TouchableOpacity
                style={AddTicketStyles.iconSearchCancel}
                onPress={() => setMusicalTitle('')}>
                <SvgXml xml={TicketBookIcon.searchCancel} />
              </TouchableOpacity>
            )}
          </View>

          {result.length > 0 && (
            <View style={{marginTop: 8}}>
              {result.map(item => (
                <TouchableOpacity
                  style={AddTicketStyles.containerSearch}
                  onPress={() => selectMusical(item)}
                  key={item.musical_id}>
                  <Text>{item.title}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </Main>
      </ScrollView>
    </Root>
  );
}

const Root = styled.View`
  flex: 1;
`;

const Main = styled.View`
  gap: 20px;
  padding: 20px;
`;

const Head = styled.View``;
