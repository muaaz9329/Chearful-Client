import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import DatePicker from 'react-native-date-picker';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  IsPhone,
  IsTablet,
  Wp,
  calculate18YearsBefore,
  capitalizeFirstLetter,
} from '@app/utils';
import { Fonts } from '@app/constants';
import { CalenderIcon } from '@app/assets/svgs';

const DateInput = ({
  handleForm,
}: {
  handleForm: (text: string, name: string) => void;
}) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string>();
  const [dateString, setDateString] = useState('Select');

  useEffect(() => {
    if (value !== 'Select') {
      handleForm(value as string, 'Dob');
    }
  }, [value]);

  const DateConstrctor = (date: Date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const formattedDate = `${day}-${month}-${year}`;
    setValue(formattedDate);
    const stringMonth = String(date).slice(4, 7).toLowerCase();

    const stringDay = String(date).slice(8, 10);
    const stringYear = String(date).slice(11, 15);
    const dateString = `${stringDay} ${capitalizeFirstLetter(
      stringMonth,
    )}, ${stringYear}`;
    setDateString(dateString);
  };

  return (
    <>
      <Pressable
        style={[
          styles.mainCont,
          IsTablet && {
            width: wp(30),
            paddingVertical: Wp(6),
            paddingHorizontal: Wp(10),

            borderRadius: 14,
            backgroundColor: '#EFF3F2',
          },
        ]}
        onPress={() => setOpen(true)}
      >
        <View>
          <Text
            style={[
              styles.DateCont,
              {
                fontFamily: Fonts.Mulish['700'],
                fontSize: IsPhone ? Wp(14) : Wp(8),
              },
            ]}
          >
            {String(dateString)}
          </Text>
        </View>
        <View>
          <CalenderIcon
            width={IsPhone ? Wp(24) : Wp(15)}
            height={IsPhone ? Wp(24) : Wp(15)}
            color={'#1E5542'}
          />
        </View>
      </Pressable>
      <DatePicker
        mode="date"
        modal
        open={open}
        date={new Date()}
        onConfirm={(date) => {
          setOpen(false);
          DateConstrctor(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
        androidVariant={'iosClone'}
        maximumDate={calculate18YearsBefore()}
      />
    </>
  );
};
export default DateInput;

const styles = StyleSheet.create({
  mainCont: {
    width: wp(85),
    paddingVertical: hp(1.45 * 1.5),
    paddingHorizontal: wp(2.45 * 1.5),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 14,
    backgroundColor: '#EFF3F2',
  },
  DateCont: {
    color: '#1E5542',
    fontWeight: '700',
  },
});
