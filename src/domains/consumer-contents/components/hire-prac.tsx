import { Colors, Fonts } from '@app/constants';
import { Hp, IsTablet, LinkingText, Wp, wp } from '@app/utils';
import { Pressable, StyleSheet, Text } from 'react-native';
import { s } from 'react-native-size-matters';

const HirePrac = ({
  position = 'absolute',
}: {
  position?: 'absolute' | 'relative';
}) => {
  return (
    <Pressable
      style={[
        styles.Signupbtn,
        IsTablet && styles.SignupbtnTablet,
        {
          position: position,
          bottom: position === 'absolute' ? Wp(20) : 0,
        },
      ]}
      onPress={() => {
        LinkingText('https://chearful.com/meet-practitioners');
      }}
    >
      <Text style={[styles.btnText, IsTablet && styles.btnText_tablet]}>
        Schedule a Session Now
      </Text>
    </Pressable>
  );
};

export default HirePrac;

const styles = StyleSheet.create({
  Signupbtn: {
    backgroundColor: Colors.primary,
    width: wp(85),
    paddingVertical: Wp(15),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: Wp(16),
    marginTop: Wp(20),
    height: Wp(56),
    position: 'absolute',
    bottom: Wp(20),
    alignSelf: 'center',
  },
  btnText: {
    fontFamily: Fonts.Nunito['400'],
    fontSize: Wp(16),
    color: Colors.white,
  },
  SignupbtnTablet: {
    width: wp(70),
    height: Hp(45),
    borderRadius: Wp(10),
    paddingVertical: Wp(0),
  },
  btnText_tablet: {
    fontSize: s(10),
  },
});
