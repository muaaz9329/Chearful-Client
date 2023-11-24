import { TextStyle, ViewStyle } from 'react-native';
import globalStyles, { globalStylesFunc } from './global-styles';
type ShorthandStyleNumbers = `${
  | 'mt'
  | 'mb'
  | 'ml'
  | 'mr'
  | 'br'
  | 'bw'
  | 'px'
  | 'py'
  | 'pt'
  | 'pb'
  | 'mx'
  | 'my'
  | 'W'
  | 'H'
  | 'flex'}:${number}`;

type ShorthandStyleString = `${'bg' | 'text'}:${string}`;

/**
 *
 * @param styleNames enter the name of styles
 *
 * @returns array of objects consisting of styles
 * @functions | 'mt' | 'mb'| 'ml'| 'mr'| 'br'| 'bw'| 'px'| 'py'| 'pt'| 'pb'| 'mx'| 'my'| 'bg'
 * @function usecase 'mt:10' or 'bg:red'
 * @example style={ms(['flex-row','flex1',{backgroundColor:'red'} , 'mt:10', ['mb:10','ml:10']']])}
 */

type StylesNameType =
  | GlobalStyleName
  | (ViewStyle & TextStyle)
  | ShorthandStyleNumbers
  | ShorthandStyleString
  | boolean;

const ms = (styleNames: (StylesNameType | (StylesNameType)[])[]): object[] => {
  const stylesArray: object[] = [];

  const processStyle = (styleItem: StylesNameType | (StylesNameType)[]) => {
    if (Array.isArray(styleItem)) {
      styleItem.forEach(innerItem => processStyle(innerItem));
    } else {
      if (typeof styleItem === 'string') {
        if (styleItem.includes(':')) {
          const [key, value] = styleItem.split(':');
          // @ts-ignore
          stylesArray.push(globalStylesFunc[key](value));
        } else {
          const style = globalStyles[styleItem as GlobalStyleName];
          if (style) {
            stylesArray.push(style);
          }
        }
      } else if (typeof styleItem === 'object') {
        stylesArray.push(styleItem);
      }
    }
  };

  styleNames.forEach(styleItem => processStyle(styleItem));

  return stylesArray;
};

export default ms;

