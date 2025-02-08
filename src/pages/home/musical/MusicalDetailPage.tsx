import React, {useCallback, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  FlatList,
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import {RouteProp, useFocusEffect} from '@react-navigation/native';
import {RootStackParamList} from 'types';
import MusicalDetailStyles from './MusicalDetailStyles';
import {SvgXml} from 'react-native-svg';
import {HomeIcon} from '@/assets/icons/home/HomeIcon';
import ModalCategory from '@/components/categoryModal/ModalCategory';
import MusicalDetailInfo from './MusicalDetailInfo';
import MusicalDetailReview from './MusicalDetailReview';
import {getDetailedMusical} from '@/api/musical.api';

type MusicalDetailPageRouteProp = RouteProp<
  RootStackParamList,
  'MusicalDetailPage'
>;

interface MusicalDetailPageProps {
  route: MusicalDetailPageRouteProp;
}

const MusicalDetailPage: React.FC<MusicalDetailPageProps> = ({route}) => {
  const data = route.params?.data;
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [series, setSeries] = useState('3연') || '3연';
  const seriesList = ['3연', '재연', '초연'];
  const [selectedTab, setSelectedTab] = useState('공연 정보');
  const [detailInfo, setDetailInfo] = useState();

  const fetchDetailedMusical = async () => {
    try {
      const response = await getDetailedMusical(data.id);
      // console.log('뮤지컬 상세 페이지 2: ', response.data.data);
      setDetailInfo(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchDetailedMusical();
    }, []),
  );

  const handleSeries = () => {
    setModalVisible(true);
    setModalTitle('공연 시즌');
  };

  const renderScreen = () => {
    switch (selectedTab) {
      case '공연 정보':
        return <MusicalDetailInfo data={detailInfo} />;
      case '공연 후기':
        return <MusicalDetailReview data={detailInfo} />;
      default:
        return <MusicalDetailInfo data={detailInfo} />;
    }
  };

  return (
    <SafeAreaView style={MusicalDetailStyles.container}>
      <FlatList
        data={[]}
        keyExtractor={item => item.id.toString()}
        ListHeaderComponent={
          <>
            <View style={MusicalDetailStyles.imageContainer}>
              <Image
                source={{uri: data.image_url}}
                style={MusicalDetailStyles.image}
              />
              <View style={MusicalDetailStyles.chipContainer}>
                <Text style={MusicalDetailStyles.chipText}>NOW</Text>
              </View>
              <Text style={MusicalDetailStyles.title}>{data.title}</Text>
              <TouchableOpacity onPress={handleSeries}>
                <View style={MusicalDetailStyles.buttonContainer}>
                  <Text style={MusicalDetailStyles.buttonText}>{series}</Text>
                  <SvgXml xml={HomeIcon.downArrow} />
                </View>
              </TouchableOpacity>
              <ModalCategory
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                categoryList={seriesList}
                modalTitle={modalTitle}
                onSelect={(item: string) => {
                  setSeries(item);
                }}
              />
            </View>

            <View style={MusicalDetailStyles.tabContainer}>
              {['공연 정보', '공연 후기'].map((tab, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => setSelectedTab(tab)}
                  style={[
                    MusicalDetailStyles.tabButton,
                    selectedTab === tab && MusicalDetailStyles.activeTabButton,
                  ]}>
                  <Text
                    style={[
                      MusicalDetailStyles.tabText,
                      selectedTab === tab && MusicalDetailStyles.activeTabText,
                    ]}>
                    {tab}
                  </Text>
                  {selectedTab === tab ? (
                    <View style={MusicalDetailStyles.activeTabUnderline} />
                  ) : (
                    <View style={MusicalDetailStyles.tabUnderline} />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </>
        }
        renderItem={null}
        ListFooterComponent={<View>{renderScreen()}</View>}
      />
    </SafeAreaView>
  );
};

export default MusicalDetailPage;
