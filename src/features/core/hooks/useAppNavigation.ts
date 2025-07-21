import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {NavigationProps} from '../types/navigationProps';

const useAppNavigation = useNavigation<
  NativeStackNavigationProp<NavigationProps>
>;

export default useAppNavigation;
