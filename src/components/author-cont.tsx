import React from 'react';
import { Colors } from '@app/constants';
import { IsPhone, IsTablet, Nunito, Wp } from '@app/utils';
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
} from 'react-native';

type Props = {
  name?: string;
  date?: string;
  image?: ImageSourcePropType;
  TextColor?: 'white' | 'black';
};

const AuthorCont = ({
  name = 'Priya Cima',
  date = '12 Jun',
  image = { uri: 'https://www.w3schools.com/w3images/avatar2.png' },
  TextColor = 'black',
}: Props) => {
  return (
    <View
      style={[
        styles.TitleCont,
        {
          flexDirection: 'row',
          alignItems: 'center',
        },
      ]}
    >
      <Image
        source={image}
        style={{
          width: IsPhone ? Wp(40) : Wp(30),
          height: IsPhone ? Wp(40) : Wp(30),
          borderRadius: IsPhone ? Wp(20) : Wp(15),
          marginRight: IsPhone ? Wp(10) : Wp(5),
        }}
      />
      <View>
        <Text
          style={[
            styles.TitleText,
            IsTablet && styles.TitleText_Tablet,
            { color: TextColor === 'white' ? Colors.white : Colors.black },
          ]}
        >
          {name}
        </Text>
        <Text
          style={[
            styles.subTitleText,
            IsTablet && styles.subTitleText_Tablet,
            { color: TextColor === 'white' ? Colors.white : Colors.black },
          ]}
        >
          {date}
        </Text>
      </View>
    </View>
  );
};

export default AuthorCont;

const styles = StyleSheet.create({
  subTitleText_Tablet: {
    fontSize: Wp(7.5),
  },
  subTitleText: {
    fontFamily: Nunito(400),
    fontSize: Wp(14),
    color: Colors.black,
  },
  TitleText_Tablet: {
    fontSize: Wp(8),
  },
  TitleText: {
    fontFamily: Nunito(700),
    fontSize: Wp(16),
    color: Colors.black,
  },
  TabCont: {
    paddingHorizontal: Wp(30),
  },
  TitleCont: {
    marginVertical: Wp(10),
  },
  TitleStyle_Tablet: {
    fontSize: Wp(16),
    textAlign: 'center',
  },
});
