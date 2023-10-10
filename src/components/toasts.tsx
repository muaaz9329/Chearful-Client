/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import {
  IconAlertCircle,
  IconAlertTriangle,
  IconCircleCheck,
  IconX,
  TablerIcon,
} from 'tabler-icons-react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { IsPhone, IsTablet, Mulish, Wp } from '@src/utils';
import { Colors } from '@src/constants/app-theme';
import { ToastConfigParams } from 'react-native-toast-message';

export type ToastComponentProps = ToastConfigParams<any> & {
  leftIcon: TablerIcon;
  containerBg: string;
  titleColor: string;
  descriptionColor?: string;
};

const ToastComponent: React.FC<ToastComponentProps> = ({
  leftIcon: LeftIcon,
  containerBg,
  text1 = '',
  titleColor,
  text2 = '',
  descriptionColor,
  hide,
  ...props
}) => {
  return (
    <View
      style={[
        {
          width: IsTablet ? wp(60) : wp(95),
          backgroundColor: containerBg,
          borderRadius: IsPhone ? Wp(12) : Wp(10),
          paddingVertical: IsPhone ? Wp(10) : Wp(8),
          paddingHorizontal: IsPhone ? Wp(10) : Wp(8),
        },
      ]}
    >
      <View
        style={[
          {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          },
        ]}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ padding: IsPhone ? Wp(10) : Wp(6) }}>
            <LeftIcon
              size={IsPhone ? Wp(20) : Wp(15)}
              color={titleColor}
              stroke={3}
            />
          </View>
          <View>
            <Text
              style={[
                {
                  color: titleColor,
                  fontSize: text1.length > 32 ? Wp(12) : Wp(16),
                  fontFamily: Mulish(700),
                },
                IsTablet && {
                  fontSize: text1.length > 32 ? Wp(8) : Wp(10),
                },
              ]}
            >
              {text1}
            </Text>
            {text2 && (
              <Text
                style={{
                  color: descriptionColor,
                  fontSize: IsPhone ? Wp(12) : Wp(8),
                  fontFamily: Mulish(400),
                }}
              >
                {text2}
              </Text>
            )}
          </View>
        </View>
        <Pressable
          onPress={() => hide()}
          style={{
            padding: IsPhone ? Wp(10) : Wp(6),
            borderRadius: IsPhone ? Wp(12) : Wp(7),
            backgroundColor: '#fff',
          }}
        >
          <IconX
            color={Colors.primary}
            size={IsPhone ? Wp(20) : Wp(15)}
            stroke={3}
          />
        </Pressable>
      </View>
    </View>
  );
};

export const SuccessToast = (props: ToastConfigParams<any>) => (
  <ToastComponent
    titleColor={Colors.primary}
    containerBg="#BDD79D"
    leftIcon={IconCircleCheck}
    {...props}
  />
);

export const ErrorToast = (props: ToastConfigParams<any>) => (
  <ToastComponent
    titleColor="white"
    descriptionColor="white"
    containerBg="tomato"
    leftIcon={IconAlertCircle}
    {...props}
  />
);

export const WarningToast = (props: ToastConfigParams<any>) => (
  <ToastComponent
    titleColor="white"
    descriptionColor="white"
    containerBg="#F4A417"
    leftIcon={IconAlertTriangle}
    {...props}
  />
);

export default ToastComponent;
