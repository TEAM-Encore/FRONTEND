import React from 'react';
import styled from 'styled-components/native';
import MyScreenProfileCard from '@/features/my/modules/MyScreenProfileCard.tsx';
import {IUser} from '@/api/users.api';

interface MyScreenListHeaderProps {
  userData: IUser;
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
