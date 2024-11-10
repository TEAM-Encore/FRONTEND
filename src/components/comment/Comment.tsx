import React, {useState, useRef} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import {SvgXml} from 'react-native-svg';

import PostStyles from '@/pages/dashboard/post/PostStyles';
import {PostIcon} from '@/assets/icons/dashboard/PostIcon';
import Colors from '@/assets/colors/Colors';

type CommentProps = {};

const Comment: React.FC<CommentProps> = () => {
  return <SafeAreaView style={PostStyles.container}></SafeAreaView>;
};

export default Comment;
