import styled from 'styled-components/native';

const BaseText = styled.Text.attrs({
  lineBreakStrategyIOS: 'hangul-word',
  textBreakStrategy: 'balanced',
})`
  color: ${props => props.theme.system.black};
`;

// --- Title & Display ---
const Display05 = styled(BaseText)`
  font-family: 'Pretendard-Bold';
  font-size: 40px;
  line-height: 52px;
  letter-spacing: -0.3px;
`;

const Display04 = styled(BaseText)`
  font-family: 'Pretendard-Bold';
  font-size: 36px;
  line-height: 46px;
  letter-spacing: -0.3px;
`;

const Display03 = styled(BaseText)`
  font-family: 'Pretendard-Bold';
  font-size: 32px;
  line-height: 42px;
  letter-spacing: -0.3px;
`;

const Display02 = styled(BaseText)`
  font-family: 'Pretendard-Bold';
  font-size: 28px;
  line-height: 38px;
  letter-spacing: -0.3px;
`;

const Display01 = styled(BaseText)`
  font-family: 'Pretendard-Bold';
  font-size: 24px;
  line-height: 34px;
  letter-spacing: -0.3px;
`;

const Headline = styled(BaseText)`
  font-family: 'Pretendard-Bold';
  font-size: 20px;
  line-height: 28px;
  letter-spacing: -0.3px;
`;

// --- Subheads ---
const Subhead05 = styled(BaseText)`
  font-family: 'Pretendard-SemiBold';
  font-size: 20px;
  line-height: 28px;
  letter-spacing: -0.3px;
`;

const Subhead04 = styled(BaseText)`
  font-family: 'Pretendard-SemiBold';
  font-size: 18px;
`;

const Subhead03 = styled(BaseText)`
  font-family: 'Pretendard-SemiBold';
  font-size: 16px;
  line-height: 22px;
  letter-spacing: -0.3px;
`;

const SubheadLong03 = styled(BaseText)`
  font-family: 'Pretendard-Medium';
  font-size: 16px;
  line-height: 28px;
  letter-spacing: -0.3px;
`;

const Subhead02 = styled(BaseText)`
  font-family: 'Pretendard-SemiBold';
  font-size: 14px;
  line-height: 20px;
  letter-spacing: -0.3px;
`;

const SubheadLong02 = styled(BaseText)`
  font-family: 'Pretendard-Medium';
  font-size: 14px;
  line-height: 24px;
  letter-spacing: -0.3px;
`;

const Subhead01 = styled(BaseText)`
  font-family: 'Pretendard-SemiBold';
  font-size: 12px;
  line-height: 18px;
  letter-spacing: -0.3px;
`;

// --- Body ---
const Body02 = styled(BaseText)`
  font-family: 'Pretendard-Regular';
  font-size: 16px;
  line-height: 24px;
  letter-spacing: -0.3px;
`;

const BodyLong02 = styled(BaseText)`
  font-family: 'Pretendard-Regular';
  font-size: 16px;
  line-height: 28px;
  letter-spacing: -0.3px;
`;

const Body01 = styled(BaseText)`
  font-family: 'Pretendard-Regular';
  font-size: 14px;
  line-height: 20px;
  letter-spacing: -0.3px;
`;

const BodyLong01 = styled(BaseText)`
  font-family: 'Pretendard-Regular';
  font-size: 14px;
  line-height: 24px;
  letter-spacing: -0.3px;
`;

const Caption = styled(BaseText)`
  font-family: 'Pretendard-Regular';
  font-size: 12px;
  line-height: 18px;
  letter-spacing: -0.3px;
`;

// --- Export ---
const Typo = {
  Display05,
  Display04,
  Display03,
  Display02,
  Display01,
  Headline,
  Subhead05,
  Subhead04,
  Subhead03,
  SubheadLong03,
  Subhead02,
  SubheadLong02,
  Subhead01,
  Body02,
  BodyLong02,
  Body01,
  BodyLong01,
  Caption,
};

export default Typo;
