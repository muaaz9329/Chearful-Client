import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { MeetPractitionerImages } from '../assets';
import ms from '@app/assets/master-styles';
import { AppText, Heading } from '@app/components';

const imgSizes = {
  xs: {
    image: 50,
    verifyLogo: 15,
  },
  sm: {
    image: 65,
    verifyLogo: 18,
  },
  md: {
    image: 100,
    verifyLogo: 25,
  },
  lg: {
    image: 150,
    verifyLogo: 35,
  },
  xl: {
    image: 200,
    verifyLogo: 45,
  },
};

type sizes = keyof typeof imgSizes;

const PractitionerImage = ({
  size = 'sm',
  source,
}: {
  size?: sizes;
  source?: string;
}) => {
  return (
    <View>
      <ImageBackground
        source={source ? { uri: source } : MeetPractitionerImages.user}
        style={ms([
          `W:${imgSizes[size].image}`,
          `H:${imgSizes[size].image}`,
          
          {
            overflow: 'hidden',
            borderRadius: 50,
            
          }
        ])}
      >
       
      </ImageBackground>
      <View
          style={ms([
            styles.verifyLogoStyles,
            'bg_white',
            'py:2',
            'px:2',
            'alignCenter',
            'justifyCenter',
            {
              zIndex: 1,
              
            }
          ])}
        >
          <Image
            source={MeetPractitionerImages.verified}
            style={ms([
              `W:${imgSizes[size].verifyLogo}`,
              `H:${imgSizes[size].verifyLogo}`,
            ])}
          />
        </View>
    </View>
  );
};

export default PractitionerImage;

const styles = StyleSheet.create({
  verifyLogoStyles: {
    position: 'absolute',
    bottom: 0,
    right: 0,

    borderRadius: 50,
  },
});
