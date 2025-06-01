import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {HomeIcon} from '@/assets/icons/home/HomeIcon';
import MusicalDetailStyles from './style';
import useAppRoute from '@/app/useAppRoute';
import Header from '@/components/Header';
import MusicalDetailInfo from '@/features/home/modules/MusicalDetailInfo';
import MusicalDetailReview from '@/features/home/modules/MusicalDetailReview';
import styled from 'styled-components/native';
import {overlay} from 'overlay-kit';
import MusicalSeriesSelectBottomSheet from '@/features/home/modules/MusicalSeriesSelectBottomSheet';

const MusicalDetailScreen: React.FC = () => {
  const {data} = useAppRoute('MusicalDetailScreen').params;

  const [series, setSeries] = useState('3연');
  const tabs = ['공연 정보', '공연 후기'] as const;
  const [selectedTab, setSelectedTab] =
    useState<(typeof tabs)[number]>('공연 정보');

  const handleSeriesPress = () => {
    overlay.open(props => (
      <MusicalSeriesSelectBottomSheet
        {...props}
        value={series}
        onConfirm={setSeries}
      />
    ));
  };

  return (
    <SafeAreaView style={MusicalDetailStyles.container}>
      <Header title="뮤지컬 공연 정보" />

      <ScrollView>
        <View style={MusicalDetailStyles.imageContainer}>
          <ImageContainer>
            <Image
              source={{uri: data.image_url}}
              style={MusicalDetailStyles.image}
            />
            <View style={MusicalDetailStyles.chipContainer}>
              <Text style={MusicalDetailStyles.chipText}>NOW</Text>
            </View>
          </ImageContainer>

          <Text style={MusicalDetailStyles.title}>{data.title}</Text>
          <TouchableOpacity onPress={handleSeriesPress}>
            <View style={MusicalDetailStyles.buttonContainer}>
              <Text style={MusicalDetailStyles.buttonText}>{series}</Text>
              <SvgXml xml={HomeIcon.downArrow} />
            </View>
          </TouchableOpacity>
        </View>

        <View style={MusicalDetailStyles.tabContainer}>
          {tabs.map((tab, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setSelectedTab(tab)}
              style={[
                {flex: 1},
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

        {selectedTab === '공연 정보' && <MusicalDetailInfo id={data.id} />}
        {selectedTab === '공연 후기' && <MusicalDetailReview id={data.id} />}
      </ScrollView>
    </SafeAreaView>
  );
};

export default MusicalDetailScreen;

const ImageContainer = styled.View``;
