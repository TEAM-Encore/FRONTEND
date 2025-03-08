import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import {SvgXml} from 'react-native-svg';
import debounce from 'lodash.debounce';

import AddTicketStyles from './AddTicketStyles';
import Colors from '@/assets/colors/Colors';
import {useAddTicket} from '@/state/AddTicketContext';

import {TicketBookIcon} from '@/assets/icons/ticketBook/TicketBookIcon';
import {getActorSearch} from '@/api/search.api';

type PremiumProp = {
  goToNext: any;
  saveData: any;
  stepData: any;
};

type SearchResult = {
  id: number;
  name: string;
  actor_image_url: string;
};

export default function AddTicketStep4Page({
  goToNext,
  saveData,
  stepData,
}: PremiumProp) {
  const screenWidth = Dimensions.get('window').width;

  const {updateAddTicketData} = useAddTicket();

  const [input, setInput] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [selectedActors, setSelectedActors] = useState<SearchResult[]>(
    (stepData[4] as SearchResult[]) || [],
  );

  const fetchSearchResults = async (keyword: string) => {
    if (keyword.trim() === '') {
      setSearchResults([]);
      return;
    }

    try {
      const response = await getActorSearch(keyword);
      setSearchResults(response.data.data);
    } catch (error) {
      console.error('티켓북 생성 배우 검색 실패:', error);
    }
  };

  const debounced = debounce(text => {
    fetchSearchResults(text);
  }, 300);

  const handleInputChange = (text: string) => {
    setInput(text);
    debounced(text);
  };

  const addActor = (actor: SearchResult) => {
    if (!selectedActors.some(a => a.id === actor.id)) {
      const updatedActors = [...selectedActors, actor];
      setSelectedActors(updatedActors);
      setInput('');
      setSearchResults([]);
      updateAddTicketData({actors: updatedActors});
    }
  };

  const removeActor = (actorId: number) => {
    const updatedActors = selectedActors.filter(a => a.id !== actorId);
    setSelectedActors(updatedActors);
    updateAddTicketData({actors: updatedActors});
  };

  return (
    <>
      <SafeAreaView style={AddTicketStyles.container}>
        <View style={{flexDirection: 'row'}}>
          <View
            style={[
              AddTicketStyles.line,
              {width: screenWidth * (4 / 5), backgroundColor: Colors.sub_04},
            ]}
          />
          <View style={[AddTicketStyles.line, {width: screenWidth / 5}]} />
        </View>

        <ScrollView style={{marginHorizontal: 20}}>
          <Text style={AddTicketStyles.textProgress}>4/5</Text>
          <Text style={AddTicketStyles.textTitle}>
            캐스팅 정보를 추가해주세요.
          </Text>
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
          {searchResults.length > 0 && input !== '' ? (
            <View style={{marginTop: 8}}>
              {searchResults.map((item, index) => (
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
                  onPress={() => addActor(item)}>
                  <Image
                    source={{uri: item.actor_image_url}}
                    style={AddTicketStyles.imageActorExample}
                  />
                  <Text style={AddTicketStyles.textActor}>{item.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          ) : (
            selectedActors.length > 0 && (
              <View style={{flexDirection: 'row', marginTop: 38}}>
                {selectedActors.map((item, index) => (
                  <View key={index} style={AddTicketStyles.containerActor}>
                    <Image
                      source={{uri: item.actor_image_url}}
                      style={AddTicketStyles.imageActor}
                    />
                    <SvgXml
                      xml={TicketBookIcon.actorDelete}
                      style={AddTicketStyles.iconActorDelete}
                      onPress={() => removeActor(item.id)}
                    />
                    <Text style={AddTicketStyles.textActor}>{item.name}</Text>
                  </View>
                ))}
              </View>
            )
          )}
        </ScrollView>

        <View style={AddTicketStyles.containerButton}>
          <TouchableOpacity
            style={[
              AddTicketStyles.containerNextButton,
              selectedActors.length > 0 && {backgroundColor: Colors.sub_04},
            ]}
            onPress={() => {
              saveData(4, selectedActors);
              goToNext(5);
            }}
            disabled={selectedActors.length == 0}>
            <Text
              style={[
                AddTicketStyles.textNextButton,
                selectedActors.length > 0 && {color: Colors.gray_12},
              ]}>
              다음
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
}
