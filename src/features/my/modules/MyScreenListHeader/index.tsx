import React from 'react';
import styled from 'styled-components/native';
import MyScreenProfileCard from '@/features/my/modules/MyScreenProfileCard.tsx';

interface UserData {
  point: number;
  nickname: string;
  num_of_subscriber: number;
  num_of_write_post: number;
  preferred_keywords: [];
  viewing_frequency: string;
  email: string;
}

interface MyScreenListHeaderProps {
  userData: UserData;
}

export default function MyScreenListHeader({
  userData,
}: MyScreenListHeaderProps) {
  return (
    <Container>
      <MyScreenProfileCard userData={userData} />
    </Container>
  );
}

const Container = styled.View``;
