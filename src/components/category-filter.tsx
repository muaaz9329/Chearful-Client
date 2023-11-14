import React, { useEffect } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text } from 'react-native';
import { SvgUri } from 'react-native-svg';
import { IsTablet, Nunito, Wp, isSvg, wp } from '@app/utils';
import { Colors } from '@app/constants';

type Item = {
  id: number;
  title: string;
  image?: string;
  slug?: string;
};

interface Props {
  tags?: Item[];
  onChangeTag?: (tag: Item) => void;
  showImg?: boolean;
}

const DEFAULT_TAGS = [{ id: 0, title: 'All' }];

const CategoryFilter = ({
  tags = DEFAULT_TAGS,
  onChangeTag,
  showImg = true,
}: Props) => {
  const [selectedTag, setSelectedTag] = React.useState<Item>(tags[0]);

  const changeTagColor = (
    tag: Item,
  ): {
    tagColor: string;
    tagTextColor: string;
  } =>
    tag.id == selectedTag.id
      ? {
          tagColor: Colors.secondary,
          tagTextColor: Colors.primary,
        }
      : {
          tagColor: Colors.light,
          tagTextColor: Colors.black,
        };

  useEffect(() => {
    onChangeTag?.(selectedTag);
  }, [selectedTag]); // onChangeTag is useState function from parent component

  return (
    <ScrollView
      style={styles.TagCont}
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      {tags?.map((item, index) => {
        return (
          <Pressable
            key={index}
            style={[
              styles.tag,
              {
                backgroundColor: changeTagColor(item).tagColor,
              },
              IsTablet && styles.tag_tablet,
            ]}
            onPress={() => {
              setSelectedTag(item);
            }}
          >
            {showImg &&
              item.image &&
              (isSvg(item.image) ? (
                <SvgUri
                  width={IsTablet ? Wp(10) : Wp(18)}
                  height={IsTablet ? Wp(10) : Wp(18)}
                  uri={item.image}
                  style={[styles.tagImage]}
                />
              ) : (
                <Image
                  source={{ uri: item.image }}
                  style={[
                    styles.tagImage,
                    IsTablet && {
                      width: Wp(10),
                      height: Wp(10),
                    },
                  ]}
                />
              ))}
            <Text
              style={[
                styles.tagTextStyles,
                {
                  color: changeTagColor(item).tagTextColor,
                },
                IsTablet && styles.tagTextStyles_tablet,
              ]}
            >
              {item.title}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
};

export default CategoryFilter;

const styles = StyleSheet.create({
  tagImage: {
    width: Wp(18),
    height: Wp(18),
    marginRight: Wp(5),
    resizeMode: 'contain',
  },
  tagTextStyles_tablet: {
    fontSize: Wp(7),
  },

  TagCont: {
    minWidth: wp(100),
  },
  tag_tablet: {
    paddingVertical: Wp(7),
    paddingHorizontal: Wp(10),
    marginRight: Wp(3),
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Wp(15),
    paddingHorizontal: Wp(20),
    marginRight: Wp(4),
    borderRadius: Wp(70),
    backgroundColor: Colors.light,
  },
  tagTextStyles: {
    fontFamily: Nunito(600),
    fontSize: Wp(12),
    color: Colors.secondary,
  },
});
