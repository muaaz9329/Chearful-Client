import { Pressable, StyleSheet, Text, View, TextInput } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import FormLabel from '@app/common/components/Inputs/FormLabel';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import { Mulish } from '@app/helper/FontWeight';
import { Wp } from '@app/helper/CustomResponsive';
import { AppColors } from '@app/constants/app-colors';
import { countries } from './countryInput/countries';
import { ICountrySelection } from '../views/mobile-view';
import Country from './countryInput/Country-Selection/Country';
import ActionSheet from 'react-native-actions-sheet';
import { DeviceType } from '../../../../../context/Device-Type/DeviceTypeProvider';
import ModelLayout from '@app/common/Models/Model-Layout';

const MobileInput = ({
  handleFunc,
  deviceType = 'mobile',
}: {
  handleFunc: (text: string, name: string) => void;
  deviceType?: DeviceType;
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
      <FormLabel label="Mobile Number" deviceType={deviceType}>
        <View
          style={{
            flexDirection: 'row',
          }}
        >
          <Pressable
            onPress={() => {
              deviceType === 'mobile'
                ? //@ts-ignore
                  ActionSheetRef2.current.show()
                : setVisible(true);
            }}
            style={[
              styles.MobileNoCont,
              deviceType === 'tablet' && {
                width: Wp(28),
                height: Wp(28),
                borderRadius: Wp(4),
              },
            ]}
          >
            <Text
              style={[
                styles.MobileText,
                deviceType === 'tablet' && {
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
              deviceType === 'tablet' && {
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
                  width:
                    deviceType === 'mobile'
                      ? widthPercentageToDP(60)
                      : widthPercentageToDP(30),
                  fontFamily: Mulish(400),
                  fontSize: deviceType === 'tablet' ? Wp(8) : Wp(14),
                },
              ]}
              placeholder="Enter Mobile Number"
              keyboardType="number-pad"
              onChangeText={(text) => handleFunc(text, 'phoneNumber')}
            />
          </View>
        </View>
      </FormLabel>
      {deviceType === 'mobile' && (
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
      {deviceType === 'tablet' && (
        <ModelLayout visible={visible} setVisible={setVisible}>
          <Country
            setFlag={setDialCode}
            sheetClose={() => setVisible(false)}
            showDialCode={true}
            deviceType={'tablet'}
          />
        </ModelLayout>
      )}
    </>
  );
};

export default MobileInput;

const styles = StyleSheet.create({
  MobileText: {
    fontFamily: Mulish(700),
    fontSize: Wp(14),
    color: AppColors.Primary,
  },
  MobileNoCont: {
    width: Wp(50),
    height: Wp(50),
    borderRadius: Wp(8),
    backgroundColor: AppColors.InputBg,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  countryCont: {
    paddingHorizontal: Wp(5),
    backgroundColor: AppColors.InputBg,
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
