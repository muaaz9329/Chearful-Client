import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { Dispatch, SetStateAction, useEffect } from 'react';
import { AppText, Badge, Heading } from '@app/components';
import ms from '@app/assets/master-styles';
import BadgeSelect from '@app/components/ui/badge-select';

type Props = {};

const SlideThree = ({
  tags,
  handleValue,
  value,
}: {
  tags: SlideTags;
  handleValue: Dispatch<SetStateAction<MoodDiaryEntry>>;
  value: MoodDiaryEntry;
}) => {
  const [selected, setSelected] = React.useState<string[]>([]);

  useEffect(() => {
    console.log(selected);
  }, [selected]);

  const handleSelect = (item: string) => {
    if (selected.includes(item)) {
      setSelected(selected.filter((i) => i !== item));
    } else {
      setSelected([...selected, item]);
    }
  };

  useEffect(() => {
    let newObj: any = {};

    selected.map((item, index) => {
      const Id = tags.find(
        (i) => i.title.toLowerCase() === item.toLocaleLowerCase(),
      )?.id;
      newObj[index] = Id;
    });
    handleValue((prev) => ({
      ...prev,
      madeYouFeelIds: newObj,
    }));
  }, [selected]);
  return (
    <View style={ms(['alignCenter', 'flex1', 'mt:40', 'px_20'])}>
      <Heading size="xl" style={ms(['nunito_500'])}>
        What made you feel this way?
      </Heading>

      <ScrollView
        contentContainerStyle={ms([
          'flexRow',
          'flexWrap',
          'justifyAround',
          'mt_12',
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

export default SlideThree;
