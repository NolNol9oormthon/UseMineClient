import { DefaultTheme } from 'styled-components';

const colors = {
  white: '#FFFFFF',
  gray50: '#F7F8F9',
  gray100: '#EFF0F1',
  gray200: '#E4E5E6',
  gray300: '#D3D4D5',
  gray400: '#AEAFB0',
  gray500: '#8E8F90',
  gray600: '#666768',
  gray700: '#535455',
  gray800: '#353637',
  gray900: '#151617',
  Black: '#121212',
  tam_blue500: '#5566FF',
  tam_blue400: '#6675FF',
  tam_blue300: '#97A1FF',
  tam_blue200: '#CED3FF',
  tam_blue100: '#DBDFFF',
  tam_blue50: '#F9F9FF',
  tam_Orange500: '#FF820F',
  tam_Orange400: '#FF932F',
  tam_Orange300: '#FFAA5C',
  tam_Orange200: '#FEC58F',
  tam_Orange100: '#FEDFC2',
  tam_Orange50: '#FFF8F6',
  kakao_yellow: '#FFED4D',
  kakao_black: '#181600',
};

export type ColorsTypes = typeof colors;

export const theme: DefaultTheme = {
  colors,
};
