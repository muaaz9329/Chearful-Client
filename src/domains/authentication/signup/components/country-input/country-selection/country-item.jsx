import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Wp } from '@utils';
import { Mulish } from '@helper/FontWeight';
import { Colors as Colors } from '@constants';
const CountryItem = ({
  item,
  handerData,
  ShowDialCode = false,
  devicetype = 'mobile',
}) => {
  return (
    <View style={styles.wrapper}>
      <TouchableOpacity
        onPress={() => {
          handerData(item);
        }}
      >
        <View
          style={[
            styles.itemContainer,
            devicetype === 'tablet' && {
              paddingVertical: Wp(10),
              paddingHorizontal: Wp(7),
            },
          ]}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image
              source={item.flag}
              style={[
                styles.FlagImgDesign,
                devicetype === 'tablet' && {
                  width: Wp(18),
                  height: Wp(12),
                },
              ]}
            />
            <Text
              style={[
                styles.itemText,
                devicetype === 'tablet' && {
                  marginLeft: Wp(10),
                  fontSize: Wp(6),
                },
              ]}
            >
              {ShowDialCode === false
                ? item.name
                : item.name.length > 15
                ? item.name.slice(0, 15) + '...'
                : item.name}
            </Text>
          </View>
          {ShowDialCode && <Text>{item.dail_code}</Text>}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default CountryItem;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  itemContainer: {
    flexDirection: 'row',
    paddingVertical: Wp(20),
    paddingHorizontal: Wp(15),
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemText: {
    marginLeft: hp(2),
    fontSize: Wp(14),
    fontFamily: Mulish(700),
    color: Colors.primary,
  },
  FlagImgDesign: {
    width: Wp(28),
    height: Wp(20),
    borderRadius: Wp(1.3),
  },
});
