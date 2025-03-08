import React, {useState} from 'react';
import {
  View,
  Text,
  Modal,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {DashboardIcon} from '@/assets/icons/dashboard/DashboardIcon';
import Colors from '@/assets/colors/Colors';
import ModalCategoryStyles from './ModalCategoryStyles';
import {ScrollView} from 'react-native-gesture-handler';

type ModalCategoryProps = {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  categoryList: string[];
  modalTitle: string;
  onSelect: (selectedItem: string) => void;
};

// 게시판 작성 페이지 내 카테고리 선택 시 뜨는 모달
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
      <View style={ModalCategoryStyles.overlay}>
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={ModalCategoryStyles.background} />
        </TouchableWithoutFeedback>
        <View style={ModalCategoryStyles.container}>
          <TouchableOpacity
            style={ModalCategoryStyles.iconCancel}
            onPress={closeModal}>
            <SvgXml xml={DashboardIcon.cancel} />
          </TouchableOpacity>
          <View style={ModalCategoryStyles.containerTitle}>
            <Text style={ModalCategoryStyles.textTitle}>{modalTitle}</Text>
          </View>
          <ScrollView>
            {categoryList.map(item => (
              <TouchableOpacity
                key={item}
                style={[
                  ModalCategoryStyles.containerList,
                  selectedItem === item && {backgroundColor: Colors.gray_03},
                ]}
                onPress={() => handleSelect(item)}>
                <Text
                  style={[
                    ModalCategoryStyles.textList,
                    selectedItem === item && {color: Colors.gray_12},
                  ]}>
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <TouchableOpacity
            style={ModalCategoryStyles.buttonCheck}
            onPress={handleConfirm}>
            <Text style={ModalCategoryStyles.textButton}>확인</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ModalCategory;
