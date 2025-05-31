import React from 'react';
import {SafeAreaView, ScrollView, View, TouchableOpacity} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {HomeIcon} from '@/assets/icons/home/HomeIcon';
import IconSearch from '@/assets/icons/home/IconSearch';
import IconNotification from '@/assets/icons/home/IconNotification';
import useAppNavigation from '@/app/useAppNavigation';
import HomeStyles from './style';
import HomeCarousel from '@/features/home/modules/HomeCarousel';
import LatestMusical from '@/features/home/modules/LatestMusical';
import HomePremiumReviews from '@/features/home/modules/HomePremiumReviews';
import HomeEventBannerCarousel from '@/features/home/modules/HomeEventBannerCarousel';
import FeaturedMusicals from '@/features/home/modules/FeaturedMusicals';
import UpcomingMusicals from '@/features/home/modules/UpcomingMusicals';

const HomeScreen: React.FC = () => {
  const {navigate} = useAppNavigation();

  return (
    <SafeAreaView style={HomeStyles.container}>
      <View style={HomeStyles.containerIcons}>
        <SvgXml xml={HomeIcon.iconTitle} />

        <View style={HomeStyles.containerRow}>
          <TouchableOpacity onPress={() => navigate('HomeSearchScreen')}>
            <IconSearch style={{marginRight: 20}} />
          </TouchableOpacity>
          <IconNotification />
        </View>
      </View>

      <ScrollView>
        <HomeCarousel />

        <LatestMusical />

        <HomePremiumReviews />

        <HomeEventBannerCarousel />

        <FeaturedMusicals />

        <UpcomingMusicals />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
