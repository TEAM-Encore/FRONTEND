import HomeStyles from '@/app/home/HomeScreen/style';
import {HomeIcon} from '@/assets/icons/home/HomeIcon';
import ToolTipModal from '@/components/alertModal/ToolTipModal';
import Typo from '@/components/Typo';
import useTicketBookList from '@/features/ticket_book/hooks/useTicketBookList';
import DateUtil from '@/util/DateUtil';
import React, {useEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {SvgXml} from 'react-native-svg';
import styled, {useTheme} from 'styled-components/native';

function LatestMusical() {
  const theme = useTheme();

  const {ticketBookList} = useTicketBookList();
  const [isVisibleTooltip, setVisibleTooltip] = useState(false);

  const latest = ticketBookList
    .sort(
      (a, b) =>
        new Date(b.viewed_date).getTime() - new Date(a.viewed_date).getTime(),
    )
    .at(0);

  useEffect(() => {
    if (!latest) return;
    setVisibleTooltip(!latest.has_review);
  }, [latest]);

  if (!latest) return <></>;

  return (
    <Root>
      <Header>
        <Typo.Headline>최근 관람한 공연</Typo.Headline>

        <TouchableOpacity>
          <WriteReview>리뷰쓰기 {'>'}</WriteReview>
        </TouchableOpacity>
      </Header>

      {isVisibleTooltip && (
        <ToolTipModal
          visible={isVisibleTooltip}
          position={{top: 50, right: 0}}
          text={[
            {text: '리뷰 작성하고', isBold: false},
            {text: '20포인트', isBold: true},
            {text: '받아가세요!', isBold: false},
          ]}
          onCancel={() => setVisibleTooltip(false)}
        />
      )}

      <View style={{alignItems: 'center'}}>
        <TicketSection>
          <TicketBody>
            <View style={HomeStyles.containerTicketText}>
              <Text
                style={HomeStyles.textTicketTitle}
                numberOfLines={1}
                ellipsizeMode="tail">
                {latest.musical_title}
              </Text>
              <View style={[HomeStyles.containerRow, {marginBottom: 4}]}>
                <SvgXml xml={HomeIcon.season} />
                <Text
                  style={HomeStyles.textTicketDateActor}
                  numberOfLines={1}
                  ellipsizeMode="tail">
                  {latest.series}
                </Text>
              </View>
              <View style={[HomeStyles.containerRow, {marginBottom: 4}]}>
                <SvgXml xml={HomeIcon.date} />
                <Text
                  style={HomeStyles.textTicketDateActor}
                  numberOfLines={1}
                  ellipsizeMode="tail">
                  {DateUtil.formatDot(latest.viewed_date)}
                </Text>
              </View>
              <View style={[HomeStyles.containerRow, {marginBottom: 4}]}>
                <SvgXml xml={HomeIcon.place} />
                <Text
                  style={HomeStyles.textTicketDateActor}
                  numberOfLines={1}
                  ellipsizeMode="tail">
                  {latest.location} {latest.seat}
                </Text>
              </View>
              <View style={HomeStyles.containerRow}>
                <SvgXml xml={HomeIcon.actor} />
                <Text
                  style={HomeStyles.textTicketDateActor}
                  numberOfLines={1}
                  ellipsizeMode="tail">
                  {latest.actors}
                </Text>
              </View>
            </View>
          </TicketBody>

          <SvgXml xml={HomeIcon.line} style={{alignSelf: 'center'}} />

          <TicketTail>
            {latest.has_review && latest.rating ? (
              <>
                <View style={{flexDirection: 'row'}}>
                  {Array.from({length: 5}).map((_, index) => (
                    <SvgXml
                      key={index}
                      color={theme.gray.gray_12}
                      xml={
                        latest.rating!.total_rating >= index
                          ? HomeIcon.fullStar
                          : HomeIcon.star
                      }
                    />
                  ))}
                </View>
                <Text style={HomeStyles.textReview}>
                  총평 {latest.rating.total_rating}
                </Text>
              </>
            ) : (
              <>
                <View style={{flexDirection: 'row'}}>
                  {Array.from({length: 5}).map((_, index) => (
                    <SvgXml key={index} xml={HomeIcon.star} />
                  ))}
                </View>
                <Text style={HomeStyles.textReview}>
                  아직 남겨주신{'\n'}리뷰가 없어요
                </Text>
              </>
            )}
          </TicketTail>
        </TicketSection>
      </View>
    </Root>
  );
}

export default LatestMusical;

const Root = styled.View`
  gap: 20px;
  padding: 20px;
`;

const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const WriteReview = styled(Typo.Body01)`
  color: ${p => p.theme.gray.gray_08};
`;

const TicketSection = styled.View`
  flex-direction: row;
`;

const TicketBody = styled.View`
  flex: 1;
  border-radius: 8px;
  background-color: ${p => p.theme.gray.gray_03};
`;

const TicketTail = styled.View`
  width: 84px;
  align-items: center;
  justify-content: center;
  gap: 10px;
  border-radius: 8px;
  background-color: ${p => p.theme.system.sub_03};
`;
