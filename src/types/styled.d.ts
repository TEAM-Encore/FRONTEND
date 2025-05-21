import {IAppTheme} from '@/common/theme';
import 'styled-components';
import 'styled-components/native';

declare module 'styled-components' {
  export interface DefaultTheme extends IAppTheme {}
}

declare module 'styled-components/native' {
  export interface DefaultTheme extends IAppTheme {}
}
