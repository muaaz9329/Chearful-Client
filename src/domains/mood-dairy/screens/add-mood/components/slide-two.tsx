import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { AppText, Badge, Heading } from '@app/components';
import ms from '@app/assets/master-styles';
import BadgeSelect from '@app/components/ui/badge-select';

type Props = {};
const feeling: string[] = [
  'surprised',
  'happy',
  'sad',
  'angry',
  'peaceful',
  'neutral',
  'pleasant',
  'upbeat',
  'relaxed',
  'tired',
  'sleepy',
  'bored',
  'stressed',
  'anxious',
  'depressed',
  'frustrated',
  'confused',
  'excited',
  'energetic',
  'calm',
  'content',
  'joyful',
  'satisfied',
  'gloomy',
  
];
const SlideTwo = (props: Props) => {
  const [selected, setSelected] = React.useState<string[]>([]);

  useEffect(() => {
    console.log(selected);
  }
  , [selected]);

  const handleSelect = (item: string) => {
    if (selected.includes(item)) {
      setSelected(selected.filter((i) => i !== item));
    } else {
      setSelected([...selected, item]);
    }
  }
  return (
    <View style={ms(['alignCenter', 'flex1', 'mt:40','px_20'])}>
      <Heading size="xl" style={ms(['nunito_500'])}>
        Describe how you feel
      </Heading>
      
      <ScrollView
        contentContainerStyle={ms(['flexRow', 'flexWrap', 'justifyAround', 'mt_15'])}
        style={ms(['w-full' , 'mt_15' , 'h-full'])}
        showsVerticalScrollIndicator={false}
      >
        {feeling.map((item, index) => {
          return (
            <BadgeSelect key={index} item={item} handleSelect={handleSelect} selected={selected} />
          );
        })}
      </ScrollView>
    </View>
  );
};

export default SlideTwo;
