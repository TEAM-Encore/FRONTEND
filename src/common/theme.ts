interface ISystemColor {
  primary_07: string;
  primary_06: string;
  primary_05: string;
  primary_04: string;
  primary_03: string;
  primary_02: string;
  primary_01: string;

  sub_05: string;
  sub_04: string;
  sub_03: string;
  sub_02: string;
  sub_01: string;

  wireframe_950: string;
  wireframe_800: string;
  wireframe_700: string;
  wireframe_500: string;
  wireframe_400: string;
  wireframe_200: string;

  white: string;
  black: string;
}

interface IGrayColor {
  gray_12: string;
  gray_11: string;
  gray_10: string;
  gray_09: string;
  gray_08: string;
  gray_07: string;
  gray_06: string;
  gray_05: string;
  gray_04: string;
  gray_03: string;
  gray_02: string;
  gray_01: string;
}

export interface IAppTheme {
  system: ISystemColor;
  gray: IGrayColor;
}

const appTheme: IAppTheme = {
  system: {
    primary_07: '#26000A',
    primary_06: '#36000E',
    primary_05: '#560116',
    primary_04: '#77001E',
    primary_03: '#A1022A',
    primary_02: '#DA093E',
    primary_01: '#DA093E',

    sub_05: '#FFB200',
    sub_04: '#FFDD56',
    sub_03: '#FEE892',
    sub_02: '#FFF1BB',
    sub_01: '#FFF8DB',

    wireframe_950: '#262626',
    wireframe_800: '#454545',
    wireframe_700: '#4F4F4F',
    wireframe_500: '#6D6D6D',
    wireframe_400: '#878787',
    wireframe_200: '#D1D1D1',

    white: '#FFFFFF',
    black: '#000000',
  },
  gray: {
    gray_12: '#171717',
    gray_11: '#242424',
    gray_10: '#333333',
    gray_09: '#3D3D3D',
    gray_08: '#6F6F6F',
    gray_07: '#8B8B8B',
    gray_06: '#A5A5A5',
    gray_05: '#C1C1C1',
    gray_04: '#DFDFDF',
    gray_03: '#F2F2F2',
    gray_02: '#F7F7F7',
    gray_01: '#FBFBFB',
  },
};

export default appTheme;
