import {extendTheme} from 'native-base';
import {fontFamily} from '../../app.json';
import {Dimensions} from 'react-native';
export const screenWidth = Dimensions.get('window').width;
export const screenHeight = Dimensions.get('window').height;
export const COLORS = {
  primary: {
    50: '#F5F5F5',
    100: '#E0E0E0',
    200: '#BDBDBD',
    300: '#9E9E9E',
    400: '#757575',
    500: '#616161',
    600: '#424242',
    700: '#303030',
    800: '#212121',
    900: '#111111',
    950: '#000000',
  },
  secondary: {
    50: '#F5F1EB',
    100: '#ECE2D4',
    200: '#E3D2BD',
    300: '#DAC3A6',
    400: '#D2B391',
    500: '#D5BD96',
    600: '#C9A674',
    700: '#BD9453',
    800: '#B18332',
    900: '#A57211',
    950: '#8D5C0F',
  },
  theme: {
    50: '#FFFFFF',
    100: '#FDFDFE',
    200: '#FAFBFC',
    300: '#F8FAFC',
    400: '#F5F7FA',
    500: '#F3F6F9',
    600: '#F0F4F8',
    700: '#EDEFF3',
    800: '#EBECF1',
    900: '#E8EAF0',
    950: '#E5E7EB',
  },
};

const CustomTheme = extendTheme({
  colors: COLORS,
  fontConfig: {
    [fontFamily]: {
      100: {
        normal: `${fontFamily}-Light`,
        italic: `${fontFamily}-LightItalic`,
      },
      200: {
        normal: `${fontFamily}-ExtraLight`,
        italic: `${fontFamily}-ExtraLightItalic`,
      },
      300: {
        normal: `${fontFamily}-Regular`,
        italic: `${fontFamily}-Italic`,
      },
      400: {
        normal: `${fontFamily}-Medium`,
        italic: `${fontFamily}-MediumItalic`,
      },
      500: {
        normal: `${fontFamily}-SemiBold`,
        italic: `${fontFamily}-SemiBoldItalic`,
      },
      600: {
        normal: `${fontFamily}-Bold`,
        italic: `${fontFamily}-BoldItalic`,
      },
      700: {
        normal: `${fontFamily}-ExtraBold`,
        italic: `${fontFamily}-ExtraBoldItalic`,
      },
      800: {
        normal: `${fontFamily}-Black`,
        italic: `${fontFamily}-BlackItalic`,
      },
      900: {
        normal: `${fontFamily}-Black`,
        italic: `${fontFamily}-BlackItalic`,
      },
    },
    fonts: {
      heading: `${fontFamily}`,
      body: `${fontFamily}`,
      mono: `${fontFamily}`,
    },
  },
});

export default CustomTheme;
