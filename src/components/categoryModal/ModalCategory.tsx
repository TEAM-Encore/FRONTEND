import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Animated,
  Dimensions,
} from 'react-native';
import {SvgXml} from 'react-native-svg';

import {DashboardIcon} from '@/assets/icons/dashboard/DashboardIcon';
import Colors from '@/assets/colors/Colors';
import {typography} from '../../styles/typography';

const {headline, body02, caption} = typography;

type ModalCategoryProps = {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  categoryList: string[];
  modalTitle: string;
  onSelect: (selectedItem: string) => void;
};

const ModalCategory: React.FC<ModalCategoryProps> = ({
  modalVisible,
  setModalVisible,
  categoryList,
  modalTitle,
  onSelect,
}) => {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const handleSelect = (item: string) => {
    setSelectedItem(item);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleConfirm = () => {
    if (selectedItem) {
      onSelect(selectedItem); // 부모 컴포넌트로 선택한 항목 전달
      // console.log('선택된 항목:', selectedItem);
    }
    closeModal();
  };

  return (
    <Modal
      visible={modalVisible}
      animationType={'fade'}
      transparent
      statusBarTranslucent>
      <View style={styles.overlay}>
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.background} />
        </TouchableWithoutFeedback>
        <View style={styles.container}>
          <TouchableOpacity style={styles.iconCancel} onPress={closeModal}>
            <SvgXml xml={DashboardIcon.cancel} />
          </TouchableOpacity>
          <View style={styles.containerTitle}>
            <Text style={styles.textTitle}>{modalTitle}</Text>
          </View>
          {categoryList.map(item => (
            <TouchableOpacity
              key={item}
              style={[
                styles.containerList,
                selectedItem === item && {backgroundColor: Colors.gray_03},
              ]}
              onPress={() => handleSelect(item)}>
              <Text
                style={[
                  styles.textList,
                  selectedItem === item && {color: Colors.gray_12},
                ]}>
                {item}
              </Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity style={styles.buttonCheck} onPress={handleConfirm}>
            <Text style={styles.textButton}>확인</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  background: {
    flex: 1,
  },
  container: {
    width: '100%',
    height: 'auto',
    justifyContent: 'center',
    borderTopStartRadius: 25,
    borderTopEndRadius: 25,
    backgroundColor: Colors.gray_01,
  },
  containerTitle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  textTitle: {
    ...headline,
  },
  iconCancel: {
    position: 'absolute',
    top: 26.5,
    right: 20,
  },
  containerList: {
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textList: {
    ...body02,
    color: Colors.gray_07,
  },
  buttonCheck: {
    height: 51,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: Colors.sub_04,
    marginHorizontal: 20,
    marginTop: 19,
    marginBottom: 33,
  },
  textButton: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 18,
    lineHeight: 24,
    letterSpacing: -0.3,
  },
});

export default ModalCategory;
