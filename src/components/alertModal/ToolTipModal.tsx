import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {HomeIcon} from '@/assets/icons/home/HomeIcon';
import AlertModalStyle from './AlertModalStyle';

type TextList = {
  text: string;
  isBold: boolean;
};

type ToolTipModalProps = {
  visible: boolean;
  position: {top: number; right: number};
  text: TextList[];
  onCancel: () => void;
};

// 툴팁 모달
const ToolTipModal: React.FC<ToolTipModalProps> = ({
  visible,
  position,
  text,
  onCancel,
}) => {
  if (!visible) return null;

  return (
    <View
      style={[
        AlertModalStyle.containerReviewModal,
        {top: position.top, right: position.right},
      ]}>
      <View style={AlertModalStyle.triangle} />
      <View style={AlertModalStyle.reviewModal}>
        {text.map((part, index) => (
          <Text
            key={index}
            style={
              part.isBold
                ? [
                    AlertModalStyle.textReviewModal,
                    {fontFamily: 'Pretendard-Bold'},
                  ]
                : AlertModalStyle.textReviewModal
            }>
            {part.text}
          </Text>
        ))}
        <TouchableOpacity onPress={onCancel}>
          <SvgXml xml={HomeIcon.modalCancel} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ToolTipModal;
