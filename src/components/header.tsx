import { Pressable, StyleSheet, View } from 'react-native';
import React, { ReactNode } from 'react';
import { IconComponent } from '@app/types';
import { ChevronLeft } from '@app/assets/svgs/';
import { IsPhone, IsTablet, Wp } from '@app/utils';
import { Colors } from '@app/constants';
import { useNavigation } from '@react-navigation/native';

interface HeaderProps {
  Icon?: IconComponent;
  children?: ReactNode;
  navigation?: any;
  pram: string;
  setVisible?: (State: boolean) => void;
  visible?: boolean;
  RightIcon?: any;
  showRightIcon?: boolean;
  justifyContent?:
    | 'space-between'
    | 'center'
    | 'flex-start'
    | 'flex-end'
    | 'space-around'
    | 'space-evenly';
  headerType?: 'New' | 'Old';
}

const Header = ({
  Icon = ChevronLeft as IconComponent,
  RightIcon = null,
  children,
  navigation,
  pram,
  setVisible,
  visible,
  showRightIcon = false,
  justifyContent = 'space-between',
  headerType = 'Old',
}: HeaderProps) => {
  const navi = useNavigation();

  navigation = navigation ?? navi;

  const handleNavigation = () => {
    if (pram === 'back') {
      navigation.goBack();
    } else if (pram === 'model') {
      setVisible?.(!visible);
    } else {
      navigation.navigate(pram);
    }
  };

  return headerType === 'Old' ? (
    <View style={[styles.HeaderCont, { justifyContent: justifyContent }]}>
      <View>
        <Pressable
          style={[
            styles.HeaderIconStyles,
            IsTablet && styles.HeaderIconStyles_tablet,
          ]}
          onPress={handleNavigation}
        >
          <Icon
            width={IsPhone ? Wp(20) : Wp(15)}
            height={IsPhone ? Wp(20) : Wp(15)}
            color={Colors.primary}
          />
        </Pressable>
      </View>

      <View>{children}</View>
      {showRightIcon == false ? (
        <View style={styles.HeaderIconStyle2}>
          <View style={styles.box} />
        </View>
      ) : (
        RightIcon
      )}
    </View>
  ) : (
    <View style={[styles.HeaderCont]}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <Pressable
          style={[
            styles.HeaderIconStyles,
            {
              marginRight: Wp(10),
              borderRadius: Wp(10),
            },
            IsTablet && styles.HeaderIconStyles_tablet,
          ]}
          onPress={handleNavigation}
        >
          <Icon
            width={IsPhone ? Wp(20) : Wp(15)}
            height={IsPhone ? Wp(20) : Wp(15)}
            color={Colors.primary}
          />
        </Pressable>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: justifyContent,

            flex: 1,
          }}
        >
          {children}
        </View>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  HeaderIconStyles_tablet: {
    padding: Wp(8),
    borderRadius: Wp(8),
    marginRight: Wp(6),
  },
  HeaderCont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  HeaderIconStyles: {
    padding: Wp(14),
    backgroundColor: Colors.placeholder,
    borderRadius: Wp(14),
  },
  HeaderIconStyle2: {
    padding: Wp(14),
  },
  box: {
    width: Wp(20),
    height: Wp(20),
  },
});
