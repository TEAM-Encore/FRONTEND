import HomeBannerStyles from '@/app/home/HomeBannerScreen/styles';
import useAppNavigation from '@/features/core/hooks/useAppNavigation';
import {PostIcon} from '@/assets/icons/dashboard/PostIcon';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Text} from 'react-native-gesture-handler';
import {SvgXml} from 'react-native-svg';

type Props = {
  title?: string;
};

function Header({title}: Props) {
  const {goBack} = useAppNavigation();

  return (
    <View style={HomeBannerStyles.containerHeader}>
      <TouchableOpacity style={HomeBannerStyles.iconGoBack} onPress={goBack}>
        <SvgXml style={{margin: 7.75}} xml={PostIcon.arrowLeft} />
      </TouchableOpacity>
      {title && <Text style={HomeBannerStyles.textTitle}>{title}</Text>}
    </View>
  );
}

export default Header;
