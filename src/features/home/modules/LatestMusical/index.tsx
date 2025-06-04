import ToolTipModal from '@/components/alertModal/ToolTipModal';
import Typo from '@/components/Typo';
import useTicketBookList from '@/features/ticket_book/hooks/useTicketBookList';
import TicketBookItem from '@/features/ticket_book/modules/TicketBookItem';
import React, {useEffect, useState} from 'react';
import {TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';

function LatestMusical() {
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

      <TicketBookItem ticket={latest} />
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
