import React, {useEffect} from 'react';
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
    review_id: any;
    nickname: string;
    title: string;
    like_count: number;
    view_count: number;
    elapsed_time: string;
    star: number;
    rating: string[];
    total_rating: number;
  }[];
  onEndReached: () => void;
  onEndReachedThreshold?: number;
};

const ItemReview: React.FC<PostProps> = ({
  postList,
  onEndReached,
  onEndReachedThreshold = 0.5,
}) => {
  const navigation = useNavigation<NavigationProp>();

  const handlePremiumPost = () => {
    navigation.navigate('PremiumOthersPage', {postList: postList});
    console.log('뿅');
  };

  return (
    <FlatList
      data={postList}
      keyExtractor={item => item.review_id}
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
                      {item.elapsed_time}
                    </Text>
                  </View>

                  <View style={styles.containerInfo}>
                    <View style={styles.containerRow}>
                      <SvgXml xml={PremiumIcon.star} />
                      <Text style={styles.textStar}>
                        총평 {item.rating.total_rating}
                      </Text>
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
      onEndReached={onEndReached}
      onEndReachedThreshold={onEndReachedThreshold}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
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

export default ItemReview;
