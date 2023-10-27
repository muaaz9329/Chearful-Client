import { Linking, TouchableOpacity } from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';

/**
 * A touchable button that opens the given url in browser.
 * @description Used in bottom tab
 */
export const WebLinkTabButton = ({
  url,
  iconName,
  icon: Icon = IonIcon,
  color,
}: {
  url: string;
  iconName: string;
  color: string;
  icon?: any;
}) => (
  <TouchableOpacity onPress={() => Linking.openURL(url)}>
    <Icon name={iconName} size={30} color={color} />
  </TouchableOpacity>
);
