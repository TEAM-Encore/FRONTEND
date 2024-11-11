import React from 'react';
import {FlatList, View, Image, Text, StyleSheet} from 'react-native';
import {SvgXml} from 'react-native-svg';

import {PostIcon} from '@/assets/icons/dashboard/PostIcon';
import Colors from '@/assets/colors/Colors';
import {typography} from '../../styles/typography';

const {caption, bodyLong01} = typography;

type CommentProps = {
  commentList: {
    id: string;
    writer: string;
    isWriter: boolean;
    date: string;
    comment: string;
    like: number;
    reply: number;
  }[];
};

const ItemComment: React.FC<CommentProps> = ({commentList}) => {
  return (
    <FlatList
      data={commentList}
      keyExtractor={item => item.id}
      renderItem={({item, index}) => (
        <>
          <View style={styles.container}>
            <View style={styles.containerWriterHeader}>
              <View style={styles.containerRow}>
                <>
                  <SvgXml xml={PostIcon.writerBackground} />
                  <Image
                    style={styles.imageWriter}
                    source={require('@/assets/logo/logo4.png')}
                  />
                </>
                <View>
                  <View style={styles.containerWriterText}>
                    <View style={styles.containerRow}>
                      <Text style={styles.textWriter}>{item.writer}</Text>
                      <SvgXml xml={PostIcon.Badge} />
                    </View>
                    <View style={styles.containerRow}>
                      {item.isWriter && (
                        <Text style={styles.textIsWriterDate}>작성자 · </Text>
                      )}
                      <Text style={styles.textIsWriterDate}>{item.date}</Text>
                    </View>
                  </View>
                </View>
              </View>
              <SvgXml xml={PostIcon.moreVertical} />
            </View>

            <Text style={styles.textContent}>{item.comment}</Text>
            <View style={styles.containerRow}>
              <View style={styles.containerLike}>
                <SvgXml xml={PostIcon.like} />
                <Text style={styles.textLikeComment}>하트 {item.like}</Text>
              </View>
              <View style={styles.containerRow}>
                <SvgXml xml={PostIcon.comment} />
                <Text style={styles.textLikeComment}>댓글 {item.reply}</Text>
              </View>
            </View>
          </View>
          {index < commentList.length - 1 ? (
            <View style={{marginHorizontal: 20}}>
              <View style={styles.line} />
            </View>
          ) : (
            <View style={{marginBottom: 26}} />
          )}
        </>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 26,
    paddingVertical: 11,
  },
  containerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  containerWriterHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  containerWriter: {
    flexDirection: 'row',
    width: '100%',
    height: 102,
    backgroundColor: Colors.gray_03,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  imageWriter: {
    position: 'absolute',
    width: 40,
    height: 40,
  },
  containerWriterText: {
    marginLeft: 8,
  },
  textWriter: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 14,
    lineHeight: 24,
    letterSpacing: -0.3,
    marginRight: 4,
  },
  textIsWriterDate: {
    ...caption,
    color: '#878787',
  },
  containerLike: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 48,
    marginRight: 8,
  },
  textLikeComment: {
    ...caption,
    color: '#878787',
    marginLeft: 4,
  },
  textContent: {
    ...bodyLong01,
    marginLeft: 48,
    marginTop: 9,
    marginBottom: 16,
  },
  line: {
    height: 0.75,
    backgroundColor: Colors.gray_04,
    marginVertical: 26,
  },
});

export default ItemComment;
