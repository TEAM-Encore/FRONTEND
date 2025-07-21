import {RouteProp, useRoute} from '@react-navigation/native';
import {NavigationProps} from '../types/navigationProps';

type RootRouteName = keyof NavigationProps;

export default function useAppRoute<RouteName extends RootRouteName>(
  _name: RouteName,
) {
  return useRoute<RouteProp<NavigationProps, RouteName>>();
}
