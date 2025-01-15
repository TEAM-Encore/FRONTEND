import React from 'react';
import {FlatList, View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {SvgXml} from 'react-native-svg';

import Colors from '@/assets/colors/Colors';
import {typography} from '../../styles/typography';

import {PremiumIcon} from '@/assets/icons/premium/PremiumIcon';
import {timeAgo} from '../../util/timeAgo';
import {useNavigation} from '@react-navigation/native';

const {subhead03, caption} = typography;

type NavigationProp = {
  navigate: (screen: 'PremiumOthersPage') => void;
};

type PostProps = {
  postList: {
    id: any;
    nickname: string;
    title: string;
    like_count: number;
    view_count: number;
    created_at: string;
    star: number;
  }[];
};

const ItemOthersReview: React.FC<PostProps> = ({postList}) => {
  const navigation = useNavigation<NavigationProp>();

  const handlePremiumPost = () => {
    navigation.navigate('PremiumOthersPage');
  };

  return (
    <FlatList
      data={postList}
      keyExtractor={item => item.id}
      renderItem={({item, index}) => {
        return (
          <>
            <TouchableOpacity
              style={styles.container}
              onPress={handlePremiumPost}>
              <View style={styles.containerRow}>
                <View style={{flex: 1}}>
                  <Text
                    style={styles.textTitle}
                    numberOfLines={1}
                    ellipsizeMode="tail">
                    {item.title}
                  </Text>

                  <View style={styles.containerRow}>
                    <Text style={styles.textWriterDate}>{item.nickname} ·</Text>
                    <Text style={styles.textWriterDate}>
                      {timeAgo(item.created_at)}
                    </Text>
                  </View>

                  <View style={styles.containerInfo}>
                    <View style={styles.containerRow}>
                      <SvgXml xml={PremiumIcon.star} />
                      <Text style={styles.textStar}>총평 {item.star}</Text>
                    </View>
                    <View style={styles.containerRow}>
                      <SvgXml xml={PremiumIcon.view} />
                      <Text style={styles.textViewAndLike}>
                        {item.view_count}
                      </Text>
                      <SvgXml xml={PremiumIcon.like} />
                      <Text style={styles.textViewAndLike}>
                        {item.like_count}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </TouchableOpacity>

            <View style={styles.containerRow}></View>
            {index < postList.length - 1 ? (
              <View style={styles.line} />
            ) : (
              <View style={{marginBottom: 16}} />
            )}
          </>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
  },
  containerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textTitle: {
    ...subhead03,
    color: Colors.gray_12,
    marginBottom: 4,
  },
  containerInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  textStar: {
    ...caption,
    color: Colors.gray_08,
    marginLeft: 5,
  },
  textWriterDate: {
    ...caption,
    color: Colors.gray_07,
  },
  textViewAndLike: {
    ...caption,
    color: Colors.gray_08,
    marginLeft: 2,
    marginRight: 6,
  },
  line: {
    height: 0.75,
    backgroundColor: Colors.gray_04,
    marginVertical: 10,
  },
});

export default ItemOthersReview;
