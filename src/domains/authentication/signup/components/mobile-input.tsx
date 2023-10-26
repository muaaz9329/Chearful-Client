import { Pressable, StyleSheet, Text, View, TextInput } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import { IsPhone, IsTablet, Wp } from '@app/utils';
import { Colors, Fonts } from '@app/constants';
import { countries } from './country-input/countries';
import { ICountrySelection } from '../views/mobile-view';
import Country from './country-input/Country-Selection/Country';
import ActionSheet from 'react-native-actions-sheet';
import { FormLabel, ModalLayout } from '@app/components';

const MobileInput = ({
  handleFunc,
}: {
  handleFunc: (text: string, name: string) => void;
}) => {
  const [dialcode, setDialCode] = useState<ICountrySelection>(countries[0]);
  const [visible, setVisible] = useState(false);
  const ActionSheetRef2 = useRef(null);
  const bottomSheetClose2 = () => {
    //@ts-ignore
    ActionSheetRef2.current?.hide();
  };

  useEffect(() => {
    handleFunc(dialcode.dail_code, 'countryCode');
  }, [dialcode]);
  useEffect(() => {
    handleFunc(dialcode.dail_code, 'countryCode');
  }, []);

  return (
    <>
      <FormLabel label="Mobile Number">
        <View
          style={{
            flexDirection: 'row',
          }}
        >
          <Pressable
            onPress={() => {
              IsPhone
                ? //@ts-ignore
                  ActionSheetRef2.current.show()
                : setVisible(true);
            }}
            style={[
              styles.MobileNoCont,
              IsTablet && {
                width: Wp(28),
                height: Wp(28),
                borderRadius: Wp(4),
              },
            ]}
          >
            <Text
              style={[
                styles.MobileText,
                IsTablet && {
                  fontSize: Wp(8),
                },
              ]}
            >
              {dialcode.dail_code}
            </Text>
          </Pressable>
          <View
            style={[
              styles.countryCont,
              styles.inputCont,
              IsTablet && {
                width: widthPercentageToDP(30),
                marginLeft: Wp(5),

                paddingLeft: Wp(10),
                borderRadius: Wp(8),
              },
            ]}
          >
            <TextInput
              style={[
                {
                  width: IsPhone
                    ? widthPercentageToDP(60)
                    : widthPercentageToDP(30),
                  fontFamily: Fonts.Mulish['400'],
                  fontSize: IsTablet ? Wp(8) : Wp(14),
                },
              ]}
              placeholder="Enter Mobile Number"
              keyboardType="number-pad"
              onChangeText={(text) => handleFunc(text, 'phoneNumber')}
            />
          </View>
        </View>
      </FormLabel>
      {IsPhone && (
        <ActionSheet
          containerStyle={{
            height: heightPercentageToDP(50),
            paddingVertical: Wp(20),
            borderTopRightRadius: Wp(20),
            borderTopLeftRadius: Wp(20),
          }}
          ref={ActionSheetRef2}
        >
          <Country
            setFlag={setDialCode}
            sheetClose={bottomSheetClose2}
            showDialCode={true}
            deviceType={'mobile'}
          />
        </ActionSheet>
      )}
      {IsTablet && (
        <ModalLayout visible={visible} setVisible={setVisible}>
          <Country
            setFlag={setDialCode}
            sheetClose={() => setVisible(false)}
            showDialCode={true}
            deviceType={'tablet'}
          />
        </ModalLayout>
      )}
    </>
  );
};

export default MobileInput;

const styles = StyleSheet.create({
  MobileText: {
    fontFamily: Fonts.Mulish['700'],
    fontSize: Wp(14),
    color: Colors.primary,
  },
  MobileNoCont: {
    width: Wp(50),
    height: Wp(50),
    borderRadius: Wp(8),
    backgroundColor: Colors.placeholder,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  countryCont: {
    paddingHorizontal: Wp(5),
    backgroundColor: Colors.placeholder,
    width: widthPercentageToDP(85),
    borderRadius: Wp(12),
  },
  inputCont: {
    width: widthPercentageToDP(70),
    marginLeft: Wp(10),
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingLeft: Wp(20),
  },
});
