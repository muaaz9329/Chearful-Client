import { Text, View } from 'react-native';
import React from 'react';

import MoodDiaryCont from './mood-dairy-cont';

type Props = {};

const LoggedInFeaturesCont = (props: Props) => {
  return (
    <View>
      <MoodDiaryCont/>
      
    </View>
  );
};

export default LoggedInFeaturesCont;

