import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from './RootStack';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AuthStackParamList} from './onboarding/AuthStack';
import {MainTabsParamList} from './MainTabs';

type NavigationProps = RootStackParamList &
  MainTabsParamList &
  AuthStackParamList;

const useAppNavigation = useNavigation<
  NativeStackNavigationProp<NavigationProps>
>;

export default useAppNavigation;
