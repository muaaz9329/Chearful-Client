import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { IsTablet, LinkingText, Wp } from '@app/utils';
import { Colors, Fonts } from '@app/constants';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { BouncyCheckBox } from '@app/components';

const LisenseAndAgreement = ({
  handleFunc,
}: {
  handleFunc: (text: string, name: string) => void;
}) => {
  const [check, setCheck] = React.useState(false);
  useEffect(() => {
    if (check) {
      handleFunc('1', 'lisenseAgreement');
    } else {
      handleFunc('0', 'lisenseAgreement');
    }
  }, [check]);
  return (
    <BouncyCheckBox onPress={setCheck}>
      <View>
        <Text
          style={[
            styles.AgreementText,
            IsTablet && {
              fontSize: Wp(8),
              width: widthPercentageToDP(60),
            },
          ]}
        >
          Agree To Chearful's{' '}
          <Text
            style={styles.linkingText}
            onPress={() => {
              LinkingText('https://chearful.com/policies');
            }}
          >
            Terms & Conditions, Privacy Policy{' '}
          </Text>{' '}
          and{' '}
          <Text
            style={styles.linkingText}
            onPress={() => {
              LinkingText('https://chearful.com/counseling-agreement');
            }}
          >
            {' '}
            Chearful Client Agreement
          </Text>{' '}
        </Text>
      </View>
    </BouncyCheckBox>
  );
};

export default LisenseAndAgreement;

const styles = StyleSheet.create({
  AgreementText: {
    fontSize: Wp(14),
    fontFamily: Fonts.Mulish['400'],
    color: Colors.black,
    width: widthPercentageToDP(80),

    marginLeft: Wp(10),
  },
  linkingText: {
    color: Colors.primary,
    textDecorationLine: 'underline',
  },
});
