import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import debounce from 'lodash.debounce';

import AddTicketStyles from './AddTicketStyles';
import {useAddTicket} from '@/state/AddTicketContext';

import Colors from '@/assets/colors/Colors';
import {SvgXml} from 'react-native-svg';
import {TicketBookIcon} from '@/assets/icons/ticketBook/TicketBookIcon';
import {getMusicalSearch} from '@/api/search.api';

type PremiumProp = {
  goToNext: any;
  saveData: any;
  stepData: any;
};

type SearchResult = {
  title: string;
  musical_id: number;
  show_times: string[];
  location: string;
};

export default function AddTicketStep1Page({
  goToNext,
  saveData,
  stepData,
}: PremiumProp) {
  const screenWidth = Dimensions.get('window').width;

  const {updateAddTicketData} = useAddTicket();

  const [musicalTitle, setMusicalTitle] = useState(stepData[1] || '');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  const fetchSearchResults = async (keyword: string) => {
    if (keyword.trim() === '') {
      setSearchResults([]);
      return;
    }

    try {
      const response = await getMusicalSearch(keyword);
      setSearchResults(response.data.data);
    } catch (error) {
      console.error('티켓북 생성 뮤지컬 검색 실패:', error);
    }
  };

  const debounced = debounce(text => {
    fetchSearchResults(text);
  }, 300);

  const handleInputChange = (text: string) => {
    setMusicalTitle(text);
    debounced(text);
  };

  const selectedMusical = (
    title: string,
    musicalId: number,
    timeList: string[],
    place: string,
  ) => {
    setMusicalTitle(title);
    setSearchResults([]);
    updateAddTicketData({
      musicalId: musicalId,
      timeList: timeList,
      place: place,
    });
  };

  const isNextButtonActive = musicalTitle !== '' && searchResults.length === 0;

  return (
    <>
      <SafeAreaView style={AddTicketStyles.container}>
        <View style={{flexDirection: 'row'}}>
          <View
            style={[
              AddTicketStyles.line,
              {width: screenWidth / 5, backgroundColor: Colors.sub_04},
            ]}
          />
          <View
            style={[AddTicketStyles.line, {width: screenWidth * (4 / 5)}]}
          />
        </View>

        <ScrollView style={{marginHorizontal: 20}}>
          <Text style={AddTicketStyles.textProgress}>1/5</Text>
          <Text style={AddTicketStyles.textTitle}>
            공연과 관람 일정을 선택해주세요.
          </Text>
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
          {searchResults.length > 0 && (
            <View style={{marginTop: 8}}>
              {searchResults.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={AddTicketStyles.containerSearch}
                  onPress={() =>
                    selectedMusical(
                      item.title,
                      item.musical_id,
                      item.show_times,
                      item.location,
                    )
                  }>
                  <Text>{item.title}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </ScrollView>

        <View style={AddTicketStyles.containerButton}>
          <TouchableOpacity
            style={[
              AddTicketStyles.containerNextButton,
              isNextButtonActive && {backgroundColor: Colors.sub_04},
            ]}
            onPress={() => {
              saveData(1, musicalTitle);
              goToNext(2);
            }}
            disabled={!isNextButtonActive}>
            <Text
              style={[
                AddTicketStyles.textNextButton,
                isNextButtonActive && {color: Colors.gray_12},
              ]}>
              다음
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
}
