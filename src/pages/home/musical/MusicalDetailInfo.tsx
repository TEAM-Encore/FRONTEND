import React from 'react';
import {View, Text, Image} from 'react-native';
import MusicalDetailStyles from './MusicalDetailStyles';
import {HomeIcon} from '@/assets/icons/home/HomeIcon';
import {SvgXml} from 'react-native-svg';

type MusicalDetailInfoProps = {
  data: any;
};

const MusicalDetailInfo: React.FC<MusicalDetailInfoProps> = ({data}) => {
  console.log('공연 정보: ', data);

  return (
    <View style={MusicalDetailStyles.infoContainer}>
      <View>
        <Text style={MusicalDetailStyles.infoTitle}>공연 요약</Text>
        <View style={MusicalDetailStyles.summaryContainer}>
          <View style={MusicalDetailStyles.icons}>
            <View style={MusicalDetailStyles.icon_container}>
              <SvgXml
                xml={HomeIcon.periodIcon}
                style={MusicalDetailStyles.icon}
              />
              <Text style={MusicalDetailStyles.iconTitle}>기간</Text>
              <Text style={MusicalDetailStyles.iconContent_1}>{data.date}</Text>
            </View>
            <View
              style={{...MusicalDetailStyles.icon_container, marginTop: 16}}>
              <SvgXml
                xml={HomeIcon.placeIcon}
                style={MusicalDetailStyles.icon}
              />
              <Text style={MusicalDetailStyles.iconTitle}>공연장</Text>
              <Text style={MusicalDetailStyles.iconContent_2}>
                {data.location}
              </Text>
            </View>
            <View
              style={{...MusicalDetailStyles.icon_container, marginTop: 16}}>
              <SvgXml xml={HomeIcon.ageIcon} style={MusicalDetailStyles.icon} />
              <Text style={MusicalDetailStyles.iconTitle}>관람연령</Text>
              <Text style={MusicalDetailStyles.iconContent_3}>10세 이상</Text>
            </View>
            <View
              style={{...MusicalDetailStyles.icon_container, marginTop: 16}}>
              <SvgXml
                xml={HomeIcon.timeIcon}
                style={MusicalDetailStyles.icon}
              />
              <Text style={MusicalDetailStyles.iconTitle}>러닝타임</Text>
              <Text style={MusicalDetailStyles.iconContent_4}>90분</Text>
            </View>
          </View>
        </View>
      </View>

      <Text style={MusicalDetailStyles.infoTitle}>주요 출연진</Text>
      <Text style={MusicalDetailStyles.subTitle}>시나로 역</Text>
      <View style={MusicalDetailStyles.actorTextContainer}>
        <Image
          source={require('@/assets/images/home/actor1.png')}
          style={MusicalDetailStyles.actorContainer}
        />
        <Text style={MusicalDetailStyles.actorText}>전동석</Text>
      </View>

      <Text style={{...MusicalDetailStyles.subTitle, marginTop: 20}}>
        록산 역
      </Text>
      <View style={MusicalDetailStyles.actorTextContainer}>
        <Image
          source={require('@/assets/images/home/actor1.png')}
          style={MusicalDetailStyles.actorContainer}
        />
        <Text style={MusicalDetailStyles.actorText}>전동석</Text>
      </View>

      <Text style={MusicalDetailStyles.infoTitle}>예매 바로가기</Text>

      <View style={MusicalDetailStyles.actorTextContainer}>
        <Image
          source={require('@/assets/images/home/interpark.png')}
          style={MusicalDetailStyles.actorContainer}
        />
        <Text style={MusicalDetailStyles.actorText}>인터파크</Text>
      </View>
    </View>
  );
};

export default MusicalDetailInfo;
