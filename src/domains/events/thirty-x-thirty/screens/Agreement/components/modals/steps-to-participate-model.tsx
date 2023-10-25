import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import globalStyles from '@app/assets/global-styles';
import { Heading, ModalLayout } from '@app/components';
import { Colors } from '@app/constants';
import { IsTablet, Wp } from '@app/utils';
import { ModuleImg } from '@app/domains/events/thirty-x-thirty/assets';

function Steps({
  step = 'Step : 1',
  title = 'Thank You for Registering',
  image = ModuleImg.modelImg1,
  description,
}: {
  step?: string;
  title?: string;
  image?: any;
  description?: string;
  isTablet?: boolean;
}) {
  return (
    <View style={[globalStyles.mt_18, IsTablet && globalStyles.mt_10]}>
      <View style={[globalStyles.flexRow, globalStyles.alignCenter]}>
        <Image
          source={image}
          style={[styles.images, IsTablet && styles.images_tablet]}
        />
        <View>
          <Text
            style={[
              globalStyles.mulish_700,
              globalStyles.fs_14,
              globalStyles.textMuted,
              IsTablet && globalStyles.fs_8,
            ]}
          >
            {step}
          </Text>
          <Text
            style={[
              globalStyles.textPrimary,
              globalStyles.nunito_600,
              globalStyles.fs_18,

              {
                width: IsTablet ? Wp(200) : Wp(230),
              },
              IsTablet && globalStyles.fs_14,
            ]}
          >
            {title}
          </Text>
          {description && (
            <Text
              style={[
                globalStyles.textMuted,
                globalStyles.nunito_700,
                globalStyles.fs_14,
                { width: IsTablet ? Wp(200) : Wp(240) },
                IsTablet && globalStyles.fs_8,
              ]}
            >
              {description}
            </Text>
          )}
        </View>
      </View>
    </View>
  );
}

const StepsToParticipateModel = ({
  visible,
  setVisible,
}: {
  visible?: boolean;
  setVisible?: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const hideModal = () => setVisible!(false);

  return (
    <ModalLayout
      visible={visible!}
      setVisible={setVisible!}
      MobileHeight={430}
      TabletHeight={280}
      TabletWidth={270}
    >
      {/* <Text
        style={[
          globalStyles.fs_20,
          globalStyles.nunito_700,
          globalStyles.textPrimary,
          isTablet && globalStyles.fs_14,
        ]}
      >
        Steps To Participate
      </Text> */}

      <View
        style={{
          paddingHorizontal: Wp(10),
        }}
      >
        <Heading size="lg">Steps To Participate</Heading>
      </View>

      <View
        style={{
          paddingHorizontal: Wp(10),
        }}
      >
        <Steps
          step="Step : 1"
          title="Thank You for Registering"
          image={ModuleImg.modelImg1}
        />
        <Steps
          step="Step : 2"
          title="Check Your Current Mental Fitness"
          image={ModuleImg.modelImg2}
          description="Take Your Mental Health Screener Now, It’ll Take You Just 5 Min!"
        />
        <Steps
          step="Step : 3"
          title="Start Your 30 x 30 Mental Fitness Challenge now!"
          image={ModuleImg.modelImg3}
        />
      </View>

      <TouchableOpacity
        style={[styles.btnStyles, IsTablet && styles.btnStyles_tablet]}
        onPress={hideModal}
      >
        <Text
          style={[
            globalStyles.nunito_700,
            globalStyles.fs_16,
            globalStyles.textWhite,
            globalStyles.textCenter,
            IsTablet && globalStyles.fs_14,
          ]}
        >
          [Start]
        </Text>
      </TouchableOpacity>
    </ModalLayout>
  );
};

export default StepsToParticipateModel;

const styles = StyleSheet.create({
  btnStyles_tablet: {
    paddingVertical: Wp(8),
    width: Wp(60),
    marginTop: Wp(8),
    borderRadius: Wp(10),
  },
  images_tablet: {
    width: Wp(40),
    height: Wp(40),
    marginRight: Wp(6),
  },
  btnStyles: {
    backgroundColor: Colors.primary,
    width: Wp(100),
    alignSelf: 'center',
    paddingVertical: Wp(12),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Wp(14),
    borderRadius: Wp(16),
  },
  images: {
    width: Wp(60),
    height: Wp(60),
    marginRight: Wp(8),
  },
});
