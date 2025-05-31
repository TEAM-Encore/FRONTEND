import {RouteProp, useRoute} from '@react-navigation/native';
import {RootStackParamList} from './RootStack';

type RootRouteName = keyof RootStackParamList;

export default function useAppRoute<RouteName extends RootRouteName>(
  _name: RouteName,
) {
  return useRoute<RouteProp<RootStackParamList, RouteName>>();
}
