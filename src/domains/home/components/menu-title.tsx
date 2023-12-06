import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { IconArrowRight } from 'tabler-icons-react-native';
import { AppNavigator } from '@app/navigation';
import { ConsumerContentsNavigator } from '../../consumer-contents/navigation/consumer-contents-navigation';
import { IsPhone, IsTablet, Wp } from '@app/utils';
import { Colors, Fonts } from '@app/constants';

const MenuTitle = ({
  children,
  path,
  screenPath
}: {
  children: React.ReactNode;
  path?: ConsumerContentsNavigator;
  screenPath?: {
    module: string;
    screen: string;
  };
}) => {
  const navigation = useNavigation();

  const handleNavigation = () => {
    // @ts-ignore
    // navigation.navigate(path)
   if(path){
     // @ts-ignore
    navigation?.navigate(AppNavigator.ConsumerContents, {
      screen: path,
      // Pass the id as a parameter
    });
   }
    else if(screenPath){
       // @ts-ignore
      navigation?.navigate(screenPath.module, {
        screen: screenPath.screen,
      });
    }
  };
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Text
        style={[
          styles.titleTextStyles,
          IsTablet && {
            fontSize: Wp(12),
          },
        ]}
      >
        {children}
      </Text>
      <Pressable onPress={handleNavigation}>
        <IconArrowRight
          color={Colors.primary}
          size={IsPhone ? Wp(23) : Wp(16)}
        />
      </Pressable>
    </View>
  );
};

export default MenuTitle;

const styles = StyleSheet.create({
  titleTextStyles: {
    fontFamily: Fonts.Nunito['400'],
    fontSize: Wp(18),
    color: Colors.primary,
  },
});
