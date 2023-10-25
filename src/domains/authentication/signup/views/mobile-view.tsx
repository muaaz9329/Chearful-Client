import {
  Animated,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import FormInput from '@app/common/components/Inputs/FormInput';
import { EmailFieldIcon } from '@app/svgs/Index';
import { IconComponent } from '@app/types';
import { IconLock, IconMail } from 'tabler-icons-react-native';
import Layout from '../components/Layout';
import { DeviceType } from '@app/context/Device-Type/DeviceTypeProvider';
import { Wp } from '@app/helper/CustomResponsive';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import NextBtn from '../components/NextBtn';
import { AppColors } from '@app/constants/app-colors';
import Carousel from 'react-native-reanimated-carousel';
import FormLabel from '@app/common/components/Inputs/FormLabel';
import { Mulish } from '@app/helper/FontWeight';
import DateInput from '../components/DateInput';
import GenderSelection from '../components/GenderSelection';
import OtpInput from '../components/OtpInput';
import CountrySelection from '../components/CountrySelection';
import MobileInput from '../components/MobileInput';
import LisenseAndAgreement from '../components/LisenseAndAgreement';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import useSignupStore from '../hooks/use-signup-store';

type Props = {
  handleForm: (text: string, name: string) => void;
  deviceType: DeviceType;
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

  setCheck: (value: boolean) => void;
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

function MobileView({ deviceType, handleForm }: Props) {
  const CoursalRef = useRef(null);

  const { moveNextSlide } = useSignupStore();
  const [check, setCheck] = useState(false);
  const [otp, setOtp] = useState<string>('');

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
    console.log('moveNextSlide:', moveNextSlide);
  }, [moveNextSlide]); // Only re-run the effect if count changes
  // using for validation and moving the screen to otp if it is valid

  const handleSlide = (index: number) => {
    //@ts-ignore
    NextBtnRef.current?.onMoveNext(index);
  };

  return (
    <Layout deviceType={deviceType}>
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
            onSnapToItem={(index) => {
              handleSlide(index);
              setIndex(index);
              if (index === 2) {
                setEnable(false);
              }
            }}
            enabled={enable}
            scrollAnimationDuration={500}
            ref={CoursalRef}
            renderItem={({ item, index }) => {
              if (index === 0) {
                return <FirstSlide handleForm={handleForm} />;
              } else if (index === 1) {
                return (
                  <SecondSlide
                    handleForm={handleForm}
                    setCheck={setCheck}
                  ></SecondSlide>
                );
              } else {
                return (
                  <View>
                    <OtpInput setOtpValue={setOtp} />
                  </View>
                );
              }
            }}
          />
        </View>
      </KeyboardAwareScrollView>

      <View style={styles.btnCont}>
        <View>
          <NextBtn
            percentage={25}
            radius={wp(2.45 * 4.5)}
            color={AppColors.Primary}
            HandleFunction={HandleFunction}
            index={index}
            ref={NextBtnRef}
            deviceType={'mobile'}
          />
        </View>
      </View>
    </Layout>
  );
}

export default MobileView;

const styles = StyleSheet.create({
  InputCont: {
    marginTop: Wp(15),
  },
  Cont: {
    height: wp(100),
  },
  btnCont: {
    alignSelf: 'center',
    marginVertical: hp(2),
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
    color: AppColors.Primary,
  },
  FlagImgDesign: {
    width: Wp(28),
    height: Wp(20),
    borderRadius: Wp(1.3),
  },
  countryCont: {
    paddingHorizontal: Wp(5),
    backgroundColor: AppColors.InputBg,
    width: wp(85),
    borderRadius: Wp(12),
  },
});
