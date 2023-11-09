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
  | 'H'}:${number}`;

type ShorthandStyleString = `${'bg' | 'text'}:${string}`;

/**
 *
 * @param styleNames enter the name of styles
 *
 * @returns array of objects consisting of styles
 * @functions | 'mt' | 'mb'| 'ml'| 'mr'| 'br'| 'bw'| 'px'| 'py'| 'pt'| 'pb'| 'mx'| 'my'| 'bg'
 * @function usecase 'mt:10' or 'bg:red'
 * @exapmple style={ms(['flex-row','flex1',{backgroundColor:'red'} , 'mt:10'])}
 */
const ms = (
  styleNames: (
    | GlobalStyleName
    | (ViewStyle & TextStyle)
    | ShorthandStyleNumbers
    | ShorthandStyleString
  )[],
): Array<object> => {
  // Initialize an array to store the corresponding styles
  const stylesArray: Array<object> = [];

  // Loop through the style names and add the corresponding styles to the array
  styleNames.forEach((styleItem) => {
    if (typeof styleItem === 'string') {
      if (styleItem.includes(':')) {
        const [key, value] = styleItem.split(':');
        // If it's a shorthand style, call the corresponding function in globalStylesFunc
        // and pass the value as an argument
        // @ts-ignore
        stylesArray.push(globalStylesFunc[key](value));
      } else {
        // If it's a string, treat it as a style name and look it up in globalStyles
        const style = globalStyles[styleItem as GlobalStyleName]; // Use 'as' to cast the value to GlobalStyleName

        if (style) {
          stylesArray.push(style);
        }
      }
    } else if (typeof styleItem === 'object') {
      // If it's an object, add it as an inline style
      stylesArray.push(styleItem);
    }
  });

  return stylesArray;
};
export default ms;
