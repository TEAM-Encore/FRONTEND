import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from './RootStack';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AuthStackParamList} from './auth/AuthStack';

type NavigationProps = RootStackParamList & AuthStackParamList;

const useAppNavigation = useNavigation<
  NativeStackNavigationProp<NavigationProps>
>;

export default useAppNavigation;
