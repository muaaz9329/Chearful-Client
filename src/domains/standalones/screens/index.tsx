// * this is temp screen will be remove in future

import { Image, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import HirePrac from '../../consumer-contents/components/hire-prac';
import { ChearfulLogo } from '@app/assets/svgs';
import { Colors } from '@app/constants';
import globalStyles from '@app/assets/global-styles';
import { IsPhone, IsTablet, Wp, colorWithOpacity, wp } from '@app/utils';
import { Header } from '@app/components';

const ScreenScheduleSession = ({ navigation }: { navigation: any }) => {
  return (
    <SafeAreaView
      style={[
        globalStyles.bodyWrapper,
        {
          paddingBottom: Wp(10),
        },
      ]}
      edges={['top', 'left', 'right']}
    >
      <Header navigation={navigation} pram="back">
        <View
          style={{
            alignSelf: 'center',
          }}
        >
          <ChearfulLogo color={Colors.primary} width={110} height={50} />
        </View>
      </Header>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={[
          {
            marginTop: IsTablet ? Wp(10) : Wp(20),
          },
          IsTablet && { width: wp(82), alignSelf: 'center' },
        ]}
      >
        <Text
          style={[
            globalStyles.fs_18,
            globalStyles.mulish_600,
            globalStyles.textPrimary,
            IsTablet && globalStyles.fs_12,
            { textAlign: 'center' },
          ]}
        >
          Connect with a credentialed & licensed practitioner to start your
          mental wellbeing journey!
        </Text>
        <View style={[globalStyles.alignCenter, globalStyles.justifyCenter]}>
          <HirePrac position="relative" />
        </View>
        <View
          style={[
            {
              marginTop: IsPhone ? Wp(30) : Wp(15),

              alignItems: 'center',
              borderRadius: Wp(16),
              overflow: 'hidden',
              backgroundColor: '#BEE887',
              flexDirection: 'row',
            },
            IsTablet && {
              width: wp(70),
              alignSelf: 'center',
              borderRadius: Wp(8),
            },
          ]}
        >
          <Image
            style={{
              width: IsPhone ? Wp(100) : Wp(70),
              height: IsPhone ? Wp(100) : Wp(55),
            }}
            source={require('../images/holding-hands.png')}
            resizeMode="cover"
          />

          <Text
            style={[
              {
                fontSize: IsPhone ? Wp(22) : Wp(14),
                marginLeft: Wp(5),
              },
              globalStyles.nunito_800,
              globalStyles.textPrimary,
            ]}
          >
            How we can help you
          </Text>
        </View>

        <View
          style={{
            marginTop: IsTablet ? Wp(15) : Wp(30),
          }}
        >
          <Text
            style={[
              globalStyles.nunito_700,
              globalStyles.fs_18,
              globalStyles.textPrimary,
              globalStyles.mt_12,
              globalStyles.mb_12,
              IsTablet && globalStyles.fs_12,
            ]}
          >
            Availability
          </Text>
          <Text
            style={[
              globalStyles.mulish_400,
              globalStyles.fs_16,
              IsTablet && globalStyles.fs_10,
              {
                color: colorWithOpacity(Colors.primary, 0.5),
              },
            ]}
          >
            Qualified & experienced practitioners who are multi-cultural,
            multi-lingual and ready to support you
          </Text>
          <Text
            style={[
              globalStyles.nunito_700,
              globalStyles.fs_18,
              globalStyles.textPrimary,
              globalStyles.mt_12,
              globalStyles.mb_12,
              IsTablet && globalStyles.fs_12,
            ]}
          >
            Affordability
          </Text>
          <Text
            style={[
              globalStyles.mulish_400,
              globalStyles.fs_16,
              IsTablet && globalStyles.fs_10,
              {
                color: colorWithOpacity(Colors.primary, 0.5),
              },
            ]}
          >
            In showcasing every practitioner’s choice of fees, we give you a
            greater chance to seek mental health services within your financial
            means
          </Text>
          <Text
            style={[
              globalStyles.nunito_700,
              globalStyles.fs_18,
              globalStyles.textPrimary,
              globalStyles.mt_12,
              globalStyles.mb_12,
              IsTablet && globalStyles.fs_12,
            ]}
          >
            Privacy
          </Text>
          <Text
            style={[
              globalStyles.mulish_400,
              globalStyles.fs_16,
              IsTablet && globalStyles.fs_10,
              {
                color: colorWithOpacity(Colors.primary, 0.5),
              },
            ]}
          >
            The added sense of confidentiality and safety, enabling you to
            connect from anywhere, without compromising your privacy
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ScreenScheduleSession;
