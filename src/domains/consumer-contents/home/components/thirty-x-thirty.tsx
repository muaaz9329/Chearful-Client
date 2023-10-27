import { Image, Pressable, View } from 'react-native';
import { NavigationHelpers } from '@react-navigation/native';
import { AppText, Heading, ModalLayout, MyButton } from '@app/components';
import globalStyles, { globalStylesFunc } from '@app/assets/global-styles';
import { Colors } from '@app/constants';
import { Wp } from '@app/utils';
import { IconX } from 'tabler-icons-react-native';
import { AppNavigator } from '@app/navigation/app-navigation';
import { ThirtyXThirtyNavigator } from '@app/domains/events/thirty-x-thirty/navigation/thirty-x-thirty-navigation-stack';

const ThirtyXThirtyModel = ({
  navigation,
  visible = true,
  setVisible,
}: {
  navigation: NavigationHelpers<any, any>;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const hideModel = () => {
    setVisible(false);
  };
  return (
    <ModalLayout visible={visible} setVisible={setVisible}>
      <View style={[globalStyles.flexRow, globalStyles.justifyBetween]}>
        <Heading size="lg">Join Challenge</Heading>
        <Pressable
          style={[
            globalStyles.px_10,
            globalStyles.py_10,
            globalStyles.bg_cont,
            globalStylesFunc.br(12),
          ]}
          onPress={hideModel}
        >
          <IconX size={Wp(20)} color={Colors.primary} />
        </Pressable>
      </View>
      <Image
        source={require('../../imgs/model-img.png')}
        style={[
          {
            width: '100%',
            height: '50%',
            resizeMode: 'contain',
            marginTop: Wp(15),
          },
        ]}
      />
      <View>
        <AppText
          size="lg"
          style={[globalStyles.textCenter, globalStyles.mt_10]}
        >
          Dubai’s 30 Day Mental Fitness Challenge
        </AppText>
      </View>

      <MyButton
        textStyles={{
          fontSize: Wp(16),
        }}
        title="Join Now"
        style={[
          globalStyles.alignSelfCenter,
          globalStyles.mt_15,
          globalStylesFunc.br(10),
          globalStyles.px_15,
          globalStyles.py_10,
        ]}
        onPress={() => {
          // navigation set to thirty x thirty module
          navigation.navigate(AppNavigator.ThirtyXThirty, {
            screen: ThirtyXThirtyNavigator.LandingScreen,
          });

          hideModel();
        }}
      />
    </ModalLayout>
  );
};

export default ThirtyXThirtyModel;
