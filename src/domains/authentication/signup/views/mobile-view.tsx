import { StyleSheet, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { EmailFieldIcon } from '@app/assets/svgs/';
import { IconComponent } from '@app/types';
import { IconLock, IconMail } from 'tabler-icons-react-native';
import Layout from '../components/layout';
import { Wp } from '@app/utils';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import NextBtn from '../components/next-btn';
import { Colors, Fonts } from '@app/constants';
import Carousel from 'react-native-reanimated-carousel';
import DateInput from '../components/date-input';
import GenderSelection from '../components/gender-selection';
import OtpInput from '../components/otp-input';
import CountrySelection from '../components/country-selection';
import MobileInput from '../components/mobile-input';
import LisenseAndAgreement from '../components/license-agreement';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import useSignupStore from '../hooks/use-signup-store';
import { FormInput, FormLabel } from '@app/components';

type Props = {
  handleForm: (text: string, name: string) => void;
};

function FirstSlide({
  handleForm,
}: {
  handleForm: (text: string, name: string) => void;
}) {
  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          width: wp(87),
          justifyContent: 'space-between',
        }}
      >
        <FormInput
          showIcon={false}
          showLabel={true}
          label="First name"
          Icon={EmailFieldIcon as IconComponent}
          placeholder="Enter First Name"
          name="firstName"
          onChangeText={handleForm}
          width={40}
        />
        <FormInput
          showIcon={false}
          showLabel={true}
          label="Last name"
          Icon={EmailFieldIcon as IconComponent}
          placeholder="Enter Last Name"
          name="lastName"
          onChangeText={handleForm}
          width={40}
        />
      </View>

      <View style={styles.InputCont}>
        <FormInput
          showIcon={true}
          showLabel={true}
          label="Email"
          Icon={IconMail}
          placeholder="Enter Email Address"
          name="email"
          onChangeText={handleForm}
          width={85}
        />
      </View>
      <View style={styles.InputCont}>
        <FormInput
          showIcon={true}
          showLabel={true}
          label="Password"
          Icon={IconLock}
          placeholder="Enter Password"
          name="password"
          onChangeText={handleForm}
          width={85}
          Protected={true}
        />
      </View>

      <View style={styles.InputCont}>
        <FormLabel label="Date Of Birth">
          <DateInput handleForm={handleForm} />
        </FormLabel>
      </View>
    </View>
  );
}

export interface ICountrySelection {
  name: string;
  code: string;
  flag: Required<string>;
  dail_code: string;
  id: number;
}

function SecondSlide(props: {
  handleForm: (text: string, name: string) => void;
}) {
  return (
    <View>
      <View>
        <CountrySelection handleForm={props.handleForm} />
      </View>
      <View style={styles.InputCont}>
        <MobileInput handleFunc={props.handleForm} />
      </View>

      <View style={styles.InputCont}>
        <FormLabel label="Select Gender">
          <View
            style={{
              width: wp(85),
            }}
          >
            <GenderSelection HandleForm={props.handleForm} />
          </View>
        </FormLabel>
      </View>
      <LisenseAndAgreement handleFunc={props.handleForm} />
    </View>
  );
}

function MobileView({ handleForm }: Props) {
  const CoursalRef = useRef(null);

  const { moveNextSlide } = useSignupStore();

  const [index, setIndex] = useState<number>(0);
  const [enable, setEnable] = useState<boolean>(true);
  const [data, setData] = useState(false);
  const NextBtnRef = useRef(null);

  const HandleFunction = () => {
    if (CoursalRef.current) {
      //@ts-ignore
      CoursalRef.current.next();
    }
  };

  useEffect(() => {
    if (moveNextSlide) {
      // asking if the it should move to the next slide . if yes(true) then it will move to the next slide
      setData(true);
      setTimeout(() => {
        HandleFunction();
      }, 1000);
    }
  }, [moveNextSlide]); // Only re-run the effect if count changes
  // using for validation and moving the screen to otp if it is valid

  const handleSlide = (index: number) => {
    //@ts-ignore
    NextBtnRef.current?.onMoveNext(index);
  };

  return (
    <Layout>
      <KeyboardAwareScrollView enableOnAndroid={true}>
        <View style={styles.Cont}>
          <Carousel
            width={wp(92)}
            data={data ? [1, 2, 3] : [1, 2]}
            loop={false}
            style={{
              flex: 1,
            }}
            autoPlay={false}
            onSnapToItem={(i) => {
              handleSlide(i);
              setIndex(i);
              if (i === 2) {
                setEnable(false);
              }
            }}
            enabled={enable}
            scrollAnimationDuration={500}
            ref={CoursalRef}
            renderItem={({ item, index }) => {
              if (index === 0) {
                return <FirstSlide {...{ handleForm }} />;
              } else if (index === 1) {
                return <SecondSlide {...{ handleForm }} />;
              } else {
                return (
                  <View>
                    <OtpInput />
                  </View>
                );
              }
            }}
          />
        </View>

        <View style={styles.btnCont}>
          <NextBtn
            percentage={25}
            radius={wp(2.45 * 4.5)}
            color={Colors.primary}
            HandleFunction={HandleFunction}
            index={index}
            ref={NextBtnRef}
          />
        </View>
      </KeyboardAwareScrollView>
    </Layout>
  );
}

export default MobileView;

const styles = StyleSheet.create({
  InputCont: {
    marginTop: Wp(15),
  },
  Cont: {
    // height: wp(100),
  },
  btnCont: {
    alignSelf: 'center',
    marginTop: hp(10),
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
    fontFamily: Fonts.Mulish['700'],
    color: Colors.primary,
  },
  FlagImgDesign: {
    width: Wp(28),
    height: Wp(20),
    borderRadius: Wp(1.3),
  },
  countryCont: {
    paddingHorizontal: Wp(5),
    backgroundColor: Colors.placeholder,
    width: wp(85),
    borderRadius: Wp(12),
  },
});
