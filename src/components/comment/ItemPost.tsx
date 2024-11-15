import React from 'react';
import {FlatList, View, Image, Text, StyleSheet} from 'react-native';
import {SvgXml} from 'react-native-svg';

import {PostIcon} from '@/assets/icons/dashboard/PostIcon';
import Colors from '@/assets/colors/Colors';
import {typography} from '../../styles/typography';

const {subhead03, body01, caption} = typography;

type PostProps = {
  postList: {
    id: string;
    nickname: string;
    date: string;
    title: string;
    content: string;
    image?: any;
    like_count: number;
    comment_count: number;
    category: string;
  }[];
};

const ItemPost: React.FC<PostProps> = ({postList}) => {
  return (
    <FlatList
      data={postList}
      keyExtractor={item => item.id}
      renderItem={({item, index}) => {
        // 카테고리 색상 지정
        const style =
          index % 3 === 0
            ? {backgroundColor: Colors.sub_01, textColor: Colors.sub_05}
            : index % 3 === 1
            ? {backgroundColor: '#FFEAE8', textColor: '#FF7163'}
            : {backgroundColor: '#FFE9DC', textColor: '#FF853E'};

        return (
          <>
            <View style={styles.container}>
              <View
                style={[
                  styles.containerCategory,
                  {backgroundColor: style.backgroundColor},
                ]}>
                <Text style={[styles.textCategory, {color: style.textColor}]}>
                  {item.category}
                </Text>
              </View>
              <View style={styles.containerRow}>
                <View style={{flex: 1}}>
                  <Text
                    style={styles.textTitle}
                    numberOfLines={1}
                    ellipsizeMode="tail">
                    {item.title}
                  </Text>
                  <Text
                    style={styles.textContent}
                    numberOfLines={1}
                    ellipsizeMode="tail">
                    {item.content}
                  </Text>

                  <View style={styles.line} />

                  <View style={styles.containerInfo}>
                    <View style={styles.containerRow}>
                      <Text style={styles.textIsWriterDate}>
                        {item.nickname} ·
                      </Text>
                      <Text style={styles.textIsWriterDate}>{item.date}</Text>
                    </View>

                    <View style={styles.containerRow}>
                      <SvgXml xml={PostIcon.commentLike} />
                      <Text style={styles.textLikeComment}>
                        {item.like_count}
                      </Text>
                      <SvgXml xml={PostIcon.commentComment} />
                      <Text style={styles.textLikeComment}>
                        {item.comment_count}
                      </Text>
                    </View>
                  </View>
                </View>
                {item.image && (
                  <Image style={styles.image} source={item.image} />
                )}
              </View>
            </View>

            <View style={styles.containerRow}></View>
            {index < postList.length - 1 ? (
              <View style={styles.line2} />
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
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  containerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  containerCategory: {
    width: 55,
    height: 24,
    borderRadius: 4.27,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 22,
  },
  textCategory: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 12,
    lineHeight: 18,
    letterSpacing: -0.3,
  },
  textTitle: {
    ...subhead03,
    marginBottom: 4,
  },
  textContent: {
    ...body01,
    color: Colors.gray_09,
  },
  containerInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textIsWriterDate: {
    ...caption,
    color: Colors.gray_09,
  },
  textLikeComment: {
    ...caption,
    color: '#878787',
    marginLeft: 4,
    marginRight: 4,
  },
  image: {
    width: 84,
    height: 92,
    borderRadius: 9,
    marginLeft: 36,
  },
  line: {
    height: 0.75,
    backgroundColor: Colors.gray_04,
    marginVertical: 14,
  },
  line2: {
    height: 4,
    backgroundColor: Colors.gray_03,
    marginVertical: 16,
  },
});

export default ItemPost;
