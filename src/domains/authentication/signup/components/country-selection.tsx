import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { Image } from 'react-native-animatable';
import { IsPhone, IsTablet, Wp } from '@app/utils';
import {
  heightPercentageToDP,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { Colors, Fonts } from '@app/constants';
import Country from './country-input/Country-Selection/Country';
import ActionSheet from 'react-native-actions-sheet';
import { ICountrySelection } from '../views/mobile-view';
import { countries } from './country-input/countries';
import { FormLabel, ModalLayout } from '@app/components';

type Props = {
  handleForm: (text: string, name: string) => void;
};

const CountrySelection = ({ handleForm }: Props) => {
  const ActionSheetRef = useRef(null);
  const [countryFlag, setcountryFlag] = useState<ICountrySelection>(
    countries[0],
  );
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // @ts-ignore
    handleForm(countryFlag.id, 'countryName');
  }, [countryFlag]);

  const bottomSheetClose = () => {
    //@ts-ignore
    ActionSheetRef.current?.hide();
  };

  return (
    <>
      <FormLabel label="Select Country">
        <Pressable
          style={[
            styles.countryCont,
            IsTablet && {
              paddingHorizontal: Wp(3),
              backgroundColor: Colors.placeholder,
              width: wp(30),
              borderRadius: Wp(7),
            },
          ]}
          onPress={() => {
            IsPhone
              ? //@ts-ignore
                ActionSheetRef.current?.show()
              : setVisible(true);
          }}
        >
          <View
            style={[
              styles.itemContainer,
              IsTablet && {
                paddingVertical: Wp(8),
                paddingHorizontal: Wp(6),
              },
            ]}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Image // @ts-ignore
                source={countryFlag.flag}
                style={[
                  styles.FlagImgDesign,
                  IsTablet && {
                    width: Wp(18),
                    height: Wp(12),
                    borderRadius: Wp(1.3),
                  },
                ]}
              />
              <Text
                style={[
                  styles.itemText,
                  IsTablet && {
                    marginLeft: Wp(10),
                    fontSize: Wp(6),
                  },
                ]}
              >
                {countryFlag.name}
              </Text>
            </View>
          </View>
        </Pressable>
      </FormLabel>

      {IsPhone && (
        <ActionSheet
          containerStyle={{
            height: heightPercentageToDP(50),
            paddingVertical: Wp(20),
            borderTopRightRadius: Wp(20),
            borderTopLeftRadius: Wp(20),
          }}
          ref={ActionSheetRef}
        >
          <Country
            setFlag={setcountryFlag}
            sheetClose={bottomSheetClose}
            showDialCode={false}
            deviceType={'mobile'}
          />
        </ActionSheet>
      )}
      {IsTablet && (
        <ModalLayout visible={visible} setVisible={setVisible}>
          <Country
            setFlag={setcountryFlag}
            sheetClose={() => setVisible(false)}
            showDialCode={false}
            deviceType={'tablet'}
          />
        </ModalLayout>
      )}
    </>
  );
};

export default CountrySelection;

const styles = StyleSheet.create({
  countryCont: {
    paddingHorizontal: Wp(5),
    backgroundColor: Colors.placeholder,
    width: wp(85),
    borderRadius: Wp(12),
  },
  itemContainer: {
    flexDirection: 'row',
    paddingVertical: Wp(20),
    paddingHorizontal: Wp(15),
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  FlagImgDesign: {
    width: Wp(28),
    height: Wp(20),
    borderRadius: Wp(1.3),
  },
  itemText: {
    marginLeft: Wp(20),
    fontSize: Wp(14),
    fontFamily: Fonts.Mulish['700'],
    color: Colors.primary,
  },
});
