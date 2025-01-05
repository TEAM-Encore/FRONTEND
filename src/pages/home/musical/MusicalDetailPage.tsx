import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from 'types';
import MusicalDetailStyles from './MusicalDetailStyles';
import {SvgXml} from 'react-native-svg';
import {HomeIcon} from '@/assets/icons/home/HomeIcon';
import ModalCategory from '@/components/categoryModal/ModalCategory';
import MusicalDetailInfo from './MusicalDetailInfo';
import MusicalDetailReview from './MusicalDetailReview';

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

  const handleSeries = () => {
    setModalVisible(true);
    setModalTitle('공연 시즌');
  };

  const renderScreen = () => {
    switch (selectedTab) {
      case '공연 정보':
        return <MusicalDetailInfo data={data} />;
      case '공연 후기':
        return <MusicalDetailReview />;
      default:
        return <MusicalDetailInfo data={data} />;
    }
  };

  return (
    <SafeAreaView style={MusicalDetailStyles.container}>
      <ScrollView>
        <View style={MusicalDetailStyles.imageContainer}>
          <Image source={data.image} style={MusicalDetailStyles.image} />
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

        <View>{renderScreen()}</View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MusicalDetailPage;
