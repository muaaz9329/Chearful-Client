import { TextStyle, ViewStyle } from 'react-native';
import globalStyles from './global-styles';

/**
 *
 * @param styleNames enter the name of styles
 *
 * @returns array of objects consisting of styles
 * @usecase style={ms(['flex-row','flex1',{backgroundColor:'red'}])}
 */

const ms = (
  styleNames: (GlobalStyleName | (ViewStyle & TextStyle))[],
): Array<object> => {
  // Initialize an array to store the corresponding styles
  const stylesArray: Array<object> = [];

  // Loop through the style names and add the corresponding styles to the array
  styleNames.forEach((styleItem) => {
    if (typeof styleItem === 'string') {
      // If it's a string, treat it as a style name and look it up in globalStyles
      const style = globalStyles[styleItem as GlobalStyleName]; // Use 'as' to cast the value to GlobalStyleName
      if (style) {
        stylesArray.push(style);
      }
    } else if (typeof styleItem === 'object') {
      // If it's an object, add it as an inline style
      stylesArray.push(styleItem);
    }
  });

  return stylesArray;
};
export default ms;
