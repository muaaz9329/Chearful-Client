import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  FlatList,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { countries } from '../countries';
import CountryItem from './country-item';
import { Hp, Wp } from '@app/utils';
import { SearchIcon } from '@app/assets/svgs';
import { Colors, Fonts } from '@app/constants';
import { IsPhone, IsTablet } from '@app/utils';

const Country = ({
  setFlag,
  sheetClose,
  showDialCode,
  deviceType = 'mobile',
}) => {
  const [query, setQuery] = useState('');

  const [btnShow, setBtnShow] = useState(false);
  const heandlerSearch = (text) => {
    setQuery(text);
    if (text === '') {
      setBtnShow(false);
    }
  };
  const filterdData = countries.filter(({ name }) => {
    return name.includes(query);
  });
  const handerCountry = (item) => {
    setQuery(item?.name);
    setBtnShow(true);
    setFlag(item);
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <View
            style={[
              styles.searchButton,
              IsTablet && {
                height: Wp(15),
                width: Platform.OS === 'ios' ? wp(4) : wp(3.5),
                borderTopLeftRadius: Hp(14),
                borderBottomLeftRadius: Hp(14),
                paddingLeft: Wp(6),
              },
            ]}
          >
            <SearchIcon
              width={IsPhone ? Wp(20) : Wp(10)}
              height={IsPhone ? Wp(20) : Wp(10)}
              color={Colors.primary}
            />
          </View>

          <TextInput
            value={query}
            onChangeText={(text) => heandlerSearch(text)}
            placeholder="Search"
            style={[
              styles.input,
              IsTablet && {
                height: Wp(15),
                width: wp(35),
                padding: Wp(2),
                borderTopRightRadius: Hp(14),
                borderBottomRightRadius: Hp(14),
                fontFamily: Fonts.Mulish['400'],
                fontSize: Wp(8),
                paddingHorizontal: Wp(4),
                paddingVertical: Wp(2),
              },
            ]}
          />
        </View>
        <View
          style={[
            {
              height: Platform.OS === 'ios' ? hp(27) : hp(35),
              marginBottom: hp(1),
            },

            IsTablet && {
              height: hp(23),
            },
          ]}
        >
          <FlatList
            data={filterdData}
            renderItem={({ item }) => (
              <CountryItem
                item={item}
                handerData={handerCountry}
                ShowDialCode={showDialCode}
                devicetype={deviceType}
              />
            )}
            keyExtractor={(item) => item.name}
          />
        </View>
        {btnShow ? (
          <View>
            <TouchableOpacity onPress={() => sheetClose()}>
              <View
                style={[
                  styles.contBtn,
                  IsTablet && {
                    padding: Wp(6),
                  },
                ]}
              >
                <Text
                  style={[
                    styles.btnText,
                    IsTablet && {
                      fontSize: Wp(8),
                    },
                  ]}
                >
                  Continue
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        ) : (
          ''
        )}
      </View>
    </SafeAreaView>
  );
};

export default Country;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    padding: hp(3),
  },
  input: {
    backgroundColor: '#EFF3F2',
    height: Platform.OS === 'ios' ? hp(6) : hp(1.5 * 6),
    width: wp(75),
    padding: hp(2),
    borderTopRightRadius: Hp(14),
    borderBottomRightRadius: Hp(14),
    fontFamily: Fonts.Mulish['700'],
    fontSize: Wp(14),
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchButton: {
    flexDirection: 'row',
    backgroundColor: '#EFF3F2',
    justifyContent: 'center',
    alignItems: 'center',
    height: Platform.OS === 'ios' ? hp(6) : hp(1.5 * 6),
    width: Platform.OS === 'ios' ? wp(9) : wp(8),
    borderTopLeftRadius: Hp(14),
    borderBottomLeftRadius: Hp(14),
    paddingLeft: Wp(12),
  },
  contBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1E5542',
    padding: Wp(16),
    borderRadius: hp(4),
  },
  btnText: {
    color: '#fff',
    fontSize: Wp(16),
    fontFamily: Fonts.Mulish['700'],
  },
});
