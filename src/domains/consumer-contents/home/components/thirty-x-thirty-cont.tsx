import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { AppText, Heading, MyButton } from '@app/common/components'
import Animated, { FadeInDown } from 'react-native-reanimated'
import { Wp, wp } from '@app/helper/CustomResponsive'
import { AppColors, IsTablet } from '@app/constants'
import useAppState from '@app/hooks/use-app-state'


const ThirtyXThirtyCont = () => {

    const {isUserLoggedIn} = useAppState()

    const handleNavigation = () => {

    }

  return (
    <View>
      <Animated.View
          entering={FadeInDown.springify()}
          style={[styles.sectionPadding, IsTablet && styles.tabletSection]}
        >
          <Heading
            size="xl"
            style={{
              textAlign: "center",
            }}
          >
            The <Text style={styles.orangeText}>30/30</Text> Mental Fitness{" "}
            <Text style={styles.orangeText}>Challenge</Text>
          </Heading>

          <AppText
            style={{
              textAlign: "center",
              color: "#7F9090",
              marginVertical: wp(3),
            }}
          >
            Chearful’s Mental Fitness Challenge Will Help You take Your
            Well-being to the Next Level - Practice Every Day & Find Your
            Strength!
          </AppText>

          <MyButton
            title={isUserLoggedIn ? "Start Now" : "Register Now"}
            onPress={handleNavigation}
            style={{width: wp(50),alignSelf: "center",borderRadius: Wp(12)}}
          />
        </Animated.View>
    </View>
  )
}

export default ThirtyXThirtyCont

const styles = StyleSheet.create({
    orangeText: {
        color: AppColors.orange,
      },
      sectionPadding: {
        paddingVertical: wp(5),
      },
      tabletSection: {
        width: wp(70),
        alignSelf: "center",
      },
})