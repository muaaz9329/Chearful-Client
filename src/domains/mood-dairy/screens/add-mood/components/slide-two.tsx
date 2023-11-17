import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { Dispatch, SetStateAction, useEffect, useMemo } from 'react';
import { AppText, Badge, Heading } from '@app/components';
import ms from '@app/assets/master-styles';
import BadgeSelect from '@app/components/ui/badge-select';

const SlideTwo = ({
  tags,
  handleValue,
  value,
}: {
  tags: SlideTags;
  handleValue: Dispatch<SetStateAction<MoodDiaryEntry>>;
  value: MoodDiaryEntry;
}) => {
  const [selected, setSelected] = React.useState<string[]>([]);



  const handleSelect = (item: string) => {
    if (selected.includes(item)) {
      setSelected(selected.filter((i) => i !== item));
    } else {
      setSelected([...selected, item]);
    }

    
  };

  useEffect(()=>{
    let newObj: any = {};

    selected.map((item, index) => {
      const Id = tags.find(
        (i) => i.title.toLowerCase() === item.toLocaleLowerCase(),
      )?.id;
      newObj[index] = Id;
    });
    handleValue((prev) => ({
      ...prev,
      howYouFeelIds: newObj,
    }));
  },[selected])
  return (
    <View style={ms(['alignCenter', 'flex1', 'mt:40', 'px_20'])}>
      <Heading size="xl" style={ms(['nunito_500'])}>
        Describe how you feel
      </Heading>

      <ScrollView
        contentContainerStyle={ms([
          'flexRow',
          'flexWrap',
          'justifyAround',
          'mt_15',
        ])}
        style={ms(['w-full', 'mt_15', 'h-full'])}
        showsVerticalScrollIndicator={false}
      >
        {tags &&
          tags.map((item, index) => {
            return (
              <BadgeSelect
                key={index}
                item={item.title}
                handleSelect={handleSelect}
                selected={selected}
              />
            );
          })}
      </ScrollView>
    </View>
  );
};

export default SlideTwo;
