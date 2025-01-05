import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {SvgXml} from 'react-native-svg';

import {HomeIcon} from '@/assets/icons/home/HomeIcon';
import Colors from '@/assets/colors/Colors';

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
        styles.containerReviewModal,
        {top: position.top, right: position.right},
      ]}>
      <View style={styles.triangle} />
      <View style={styles.reviewModal}>
        {text.map((part, index) => (
          <Text
            key={index}
            style={
              part.isBold
                ? [styles.textReviewModal, {fontFamily: 'Pretendard-Bold'}]
                : styles.textReviewModal
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

const styles = StyleSheet.create({
  containerReviewModal: {
    position: 'absolute',
    zIndex: 2,
    right: 0,
    marginRight: 19.8,
  },
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderBottomWidth: 10,
    bottom: -3,
    right: -172,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: Colors.gray_12,
  },
  reviewModal: {
    flexDirection: 'row',
    minHeight: 32,
    paddingHorizontal: 11.75,
    paddingVertical: 7.23,
    borderRadius: 8.14,
    backgroundColor: Colors.gray_12,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textReviewModal: {
    fontFamily: 'Pretendard-Regular',
    fontSize: 10.847,
    lineHeight: 16.271,
    letterSpacing: -0.271,
    color: Colors.gray_01,
    marginRight: 3.62,
  },
});

export default ToolTipModal;
