import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TextInput,
} from 'react-native';
import {SvgXml} from 'react-native-svg';

import PostStyles from '@/pages/dashboard/post/PostStyles';
import {PostIcon} from '@/assets/icons/dashboard/PostIcon';
import Colors from '@/assets/colors/Colors';

type PostPageProps = {};

const PostPage: React.FC<PostPageProps> = () => {
  const images = [
    {
      id: '1',
      image: require('@/assets/images/home/Musical4.jpeg'),
    },
    {
      id: '2',
      image: require('@/assets/images/home/Musical5.jpeg'),
    },
    {
      id: '3',
      image: require('@/assets/images/home/Musical6.jpeg'),
    },
    {
      id: '4',
      image: require('@/assets/images/home/Musical6.jpeg'),
    },
    {
      id: '5',
      image: require('@/assets/images/home/Musical6.jpeg'),
    },
  ];

  const [valueComment, onChangeComment] = useState('');

  return (
    <SafeAreaView style={PostStyles.container}>
      <ScrollView>
        <View style={PostStyles.containerHeader}>
          <SvgXml xml={PostIcon.arrowLeft} />
          <View style={PostStyles.containerRow}>
            <SvgXml style={{marginRight: 11}} xml={PostIcon.upload} />
            <SvgXml xml={PostIcon.moreVertical} />
          </View>
        </View>

        <View style={{marginHorizontal: 20}}>
          <View style={PostStyles.containerCategory}>
            <Text style={PostStyles.textCategory}>이벤트</Text>
          </View>
          <Text style={PostStyles.textTitle}>
            드레스 리허설 참관 및 MD 증정
          </Text>
          <Text style={PostStyles.textContent}>
            추첨을 통해 드레스 리허설을 참관할 수 있는 기회가 있어 공유합니다.
            벤자민 버튼 공연인데 너무 좋아서 회전문 돌았어서 다른 분들도 꼭
            보셨으면 좋겠어요!
            {'\n'}
            {'\n'}
            링아센에서 해서 시설도 꽤 좋은 편이라 강추합니다ㅎㅎ 링크로
            들어가시면 이벤트 내용 나와요~
          </Text>
        </View>

        <FlatList
          contentContainerStyle={{marginHorizontal: 20}}
          data={images}
          renderItem={({item}) => (
            <Image style={PostStyles.images} source={item.image} />
          )}
          keyExtractor={(item, index) => index.toString()}
          horizontal={true}
        />

        <View style={{marginHorizontal: 20}}>
          <View style={PostStyles.line} />
        </View>

        <TouchableOpacity style={PostStyles.containerHashtag}>
          <Text style={PostStyles.textHashtag}>
            #벤자민버튼 #MD #드레스리허설
          </Text>
        </TouchableOpacity>

        <View style={PostStyles.containerCommentLikeItems}>
          <View style={[PostStyles.containerCommentLike, {marginRight: 10}]}>
            <SvgXml xml={PostIcon.comment} />
            <Text style={PostStyles.textCommentLike}>42</Text>
          </View>
          <View style={PostStyles.containerCommentLike}>
            <SvgXml xml={PostIcon.like} />
            <Text style={PostStyles.textCommentLike}>21</Text>
          </View>
        </View>

        <View style={PostStyles.containerWriter}>
          <View style={PostStyles.containerRow}>
            <>
              <SvgXml xml={PostIcon.writerBackground} />
              <Image
                style={PostStyles.imageWriter}
                source={require('@/assets/logo/logo4.png')}
              />
            </>
            <View style={PostStyles.containerWriterText}>
              <View style={PostStyles.containerRow}>
                <Text style={PostStyles.textWriter}>뮤사랑</Text>
                <SvgXml xml={PostIcon.Badge} />
              </View>
              <Text style={PostStyles.textDate}>11분전</Text>
            </View>
          </View>
          <View style={PostStyles.containerWriterButton}>
            <Text style={PostStyles.textWriterButton}>작성자</Text>
          </View>
        </View>

        <View style={PostStyles.containerCommentTitle}>
          <Text style={PostStyles.textCommentTitle}>댓글 21</Text>
          <View style={PostStyles.containerRow}>
            <TouchableOpacity>
              <Text
                style={[PostStyles.textLatestRecommended, {marginRight: 12}]}>
                최신순
              </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={PostStyles.textLatestRecommended}>추천순</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <KeyboardAvoidingView
        style={PostStyles.containerCommentInput}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <SvgXml xml={PostIcon.commentImage} />
        <View style={PostStyles.containerCommentTextInput}>
          <TextInput
            style={PostStyles.textCommentInput}
            placeholder={'댓글을 입력해주세요'}
            onChangeText={text => onChangeComment(text)}
            value={valueComment}
          />
          <TouchableOpacity>
            <Text>등록</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default PostPage;
