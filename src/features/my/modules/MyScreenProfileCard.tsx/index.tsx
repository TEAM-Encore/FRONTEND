import {View, Text, Image} from 'react-native';
import React from 'react';
import styled from 'styled-components/native';
import Typo from '@/components/Typo';
import {SvgXml} from 'react-native-svg';
import {MyPageIcon} from '@/assets/icons/myPage/MyPageIcon';
import theme from '@/common/theme';
import {IUser} from '@/api/users.api';

// TODO: 타입 정의 필요
type Props = {
  userData: IUser;
};

export default function MyScreenProfileCard({userData}: Props) {
  return (
    <Container>
      <TopContainer>
        <ProfileImage source={require('@/assets/images/myPage/profile.png')} />
        <ProfileInfoContainer>
          <RowContainer>
            <Typo.Subhead05>{userData.nickname}</Typo.Subhead05>
            <SvgXml xml={MyPageIcon.profileCheck} />
          </RowContainer>
          <SubInfoText>
            구독자 {userData.num_of_subscriber}명 • 작성글{' '}
            {userData.num_of_write_post}개
          </SubInfoText>
        </ProfileInfoContainer>
      </TopContainer>
      <BottomContainer>
        <Section>
          <RowContainer>
            <SvgXml xml={MyPageIcon.heartIcon} />
            <Title>선호하는 공연</Title>
          </RowContainer>
          {userData.preferred_keywords.length > 0 ? (
            <ChipRow>
              {userData.preferred_keywords.map(keyword => (
                <ChipContainer key={keyword}>
                  <ChipText>{keyword}</ChipText>
                </ChipContainer>
              ))}
            </ChipRow>
          ) : (
            <EmptyText>아직 선택된 키워드가 없습니다</EmptyText>
          )}
        </Section>
        <Section>
          <RowContainer>
            <SvgXml xml={MyPageIcon.calenderIcon} />
            <Title>뮤지컬 관람 빈도</Title>
          </RowContainer>
          <ChipRow>
            <ChipContainer>
              <ChipText>{userData.viewing_frequency}</ChipText>
            </ChipContainer>
          </ChipRow>
        </Section>
      </BottomContainer>
    </Container>
  );
}

const Container = styled.View``;

const TopContainer = styled.View`
  padding: 22px 20px;
  border-radius: 12px;
  background-color: ${p => p.theme.system.sub_03};
  flex-direction: row;
  align-items: center;
  gap: 16px;
`;

const ProfileImage = styled.Image`
  width: 70px;
  height: 70px;
`;

const ProfileInfoContainer = styled.View`
  flex-direction: column;
  gap: 2px;
`;

const SubInfoText = styled.Text`
  color: ${p => p.theme.gray.gray_09};
`;

const BottomContainer = styled.View`
  padding: 26px 20px;
  border-radius: 12px;
  border-width: 1px;
  border-color: ${p => p.theme.gray.gray_03};
  flex-direction: column;
  gap: 24px;
`;

const Section = styled.View`
  gap: 8px;
`;

const RowContainer = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 4px;
`;

const ChipRow = styled.View`
  flex-direction: row;
  gap: 4px;
  margin-left: 20px;
`;

const Title = styled(Typo.Subhead02)`
  color: ${p => p.theme.gray.gray_12};
`;

const ChipContainer = styled.View`
  padding: 2px 8px;
  background-color: ${p => p.theme.system.sub_04};
  border-radius: 66px;
`;

const ChipText = styled(Typo.Caption)`
  color: ${p => p.theme.gray.gray_12};
`;

const EmptyText = styled.Text`
  margin-left: 20px;
  color: ${p => p.theme.gray.gray_08};
`;
