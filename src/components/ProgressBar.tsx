import React, {useState} from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import Colors from '@/assets/colors/Colors';

interface ProgressBarProps {
  total?: number;
  onScoreChange: (score: number) => void;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  total = 5,
  onScoreChange,
}) => {
  const [filled, setFilled] = useState(0);

  const handlePress = (score: number) => {
    setFilled(score);
    onScoreChange(score); // 점수 변경 시 부모 컴포넌트로 전달
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        width: 174,
        height: 11,
        borderRadius: 3,
        overflow: 'hidden',
      }}>
      {[...Array(total)].map((_, i) => (
        <TouchableOpacity
          key={i}
          style={[
            styles.bar,
            i < filled && styles.filledBar,
            i !== total - 1 && styles.barWithBorder,
          ]}
          onPress={() => handlePress(i + 1)}
          activeOpacity={0.7}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: 174,
    height: 11,
    borderRadius: 3,
    overflow: 'hidden',
  },
  bar: {
    flex: 1,
    backgroundColor: Colors.gray_06,
  },
  filledBar: {
    backgroundColor: Colors.sub_04,
  },
  barWithBorder: {
    borderRightWidth: 1,
    borderColor: Colors.gray_07,
  },
});

export default ProgressBar;
