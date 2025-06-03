import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import {SvgXml} from 'react-native-svg';
import debounce from 'lodash.debounce';
import {TicketBookIcon} from '@/assets/icons/ticketBook/TicketBookIcon';
import AddTicketStyles from '@/app/ticketBook/AddTicketScreen/style';
import styled from 'styled-components/native';
import Typo from '@/components/Typo';
import useAddTicketStore from '../../stores/useAddTicketStore';
import useActorSearch from '../../hooks/useActorSearch';
import {IActorSearch} from '@/api/search.api';

type Props = {
  onConfirm: () => void;
};

export default function AddTicketActorsPhase({onConfirm}: Props) {
  const actors = useAddTicketStore(s => s.actors);
  const addActor = useAddTicketStore(s => s.addActor);
  const removeActor = useAddTicketStore(s => s.removeActor);

  const [input, setInput] = useState('');
  const {result, refetch, isLoading} = useActorSearch(input);
  const isVisibleSearchResult = result.length > 0 && !!input;
  const isVisibleSelectedActors = !isVisibleSearchResult && actors.length > 0;

  const executeSearch = debounce(() => {
    if (!input) return;
    refetch();
  }, 300);

  const handleInputChange = (text: string) => {
    setInput(text);
    executeSearch();
  };

  const selectActor = (actor: IActorSearch) => {
    addActor(actor);
    setInput('');
  };

  const handleConfirm = () => {
    onConfirm();
  };

  return (
    <Root>
      <ScrollView>
        <Main>
          <Head>
            <Text style={AddTicketStyles.textProgress}>4/5</Text>
            <Text style={AddTicketStyles.textTitle}>
              캐스팅 정보를 추가해주세요.
            </Text>
          </Head>

          <View style={AddTicketStyles.containerTextInputIcon}>
            <TextInput
              style={AddTicketStyles.textInputSearch}
              placeholder="배우 검색"
              onChangeText={handleInputChange}
              value={input}
            />
            <SvgXml
              style={AddTicketStyles.iconSearch}
              xml={TicketBookIcon.search}
            />
            {input !== '' && (
              <TouchableOpacity
                style={AddTicketStyles.iconSearchCancel}
                onPress={() => setInput('')}>
                <SvgXml xml={TicketBookIcon.searchCancel} />
              </TouchableOpacity>
            )}
          </View>

          {isVisibleSearchResult && (
            <View style={{marginTop: 8}}>
              {result.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    AddTicketStyles.containerSearch,
                    {
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'flex-start',
                      height: 66,
                    },
                  ]}
                  onPress={() => selectActor(item)}>
                  <Image
                    source={{uri: item.actor_image_url}}
                    style={AddTicketStyles.imageActorExample}
                  />
                  <Text style={AddTicketStyles.textActor}>{item.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {isVisibleSelectedActors && (
            <ScrollView
              style={{paddingTop: 12}}
              horizontal
              showsHorizontalScrollIndicator={false}>
              {actors.map((item, index) => (
                <View key={index} style={AddTicketStyles.containerActor}>
                  <Image
                    source={{uri: item.actor_image_url}}
                    style={AddTicketStyles.imageActor}
                  />
                  <SvgXml
                    xml={TicketBookIcon.actorDelete}
                    style={AddTicketStyles.iconActorDelete}
                    onPress={() => removeActor(item)}
                  />
                  <Text style={AddTicketStyles.textActor}>{item.name}</Text>
                </View>
              ))}
            </ScrollView>
          )}
        </Main>
      </ScrollView>

      <Footer>
        <Btn onPress={handleConfirm}>
          <Confirm>확인</Confirm>
        </Btn>
      </Footer>
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

const Footer = styled.View`
  padding: 20px;
`;

const Btn = styled.TouchableOpacity`
  height: 52px;
  align-items: center;
  justify-content: center;
  padding: 15px 10px;
  border-radius: 10px;
  background-color: ${p => p.theme.system.sub_04};
`;

const Confirm = styled(Typo.Subhead04)`
  text-align: center;
`;
