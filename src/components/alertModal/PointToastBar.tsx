import React from 'react';
import {View, Text} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {SvgXml} from 'react-native-svg';
import AlertModalStyle from './AlertModalStyle';
import {PremiumIcon} from '@/assets/icons/premium/PremiumIcon';

type ToastBarProps = {
  visible: boolean;
  message: string;
  showIcon?: boolean;
  onClose?: () => void;
};

const PointToastBar: React.FC<ToastBarProps> = ({
  visible,
  message,
  showIcon = true,
  onClose,
}) => {
  if (!visible) return null;

  return (
    <View style={AlertModalStyle.toastBarcontainer}>
      <View style={AlertModalStyle.toastBarBox}>
        <Text style={AlertModalStyle.toastBarmessage}>{message}</Text>
        {showIcon && onClose && (
          <TouchableOpacity onPress={onClose}>
            <SvgXml xml={PremiumIcon.pointCheck} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default PointToastBar;
