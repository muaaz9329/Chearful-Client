import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  AppText,
  CategoryFilter,
  Header,
  Heading,
  SearchInput,
} from '@app/components';
import ms from '@app/assets/master-styles';
import PractitionerCard from './components/practitioner-card';
import useApi from './hooks/use-api';
import RoundLoading from '@app/components/round-loading';
import RequestFailure from '@app/components/request-failure';
import { useNavigation } from '@react-navigation/native';
import {
  MeetAPractitionerNavigation,
  MeetAPractitionerNavigator,
} from '../../navigaiton';

export default function Listing() {
  const { data, loading, reloadScreen, success } = useApi();
  const navigation = useNavigation();
  const onPressCard = (slug: string) => {
    // @ts-ignore
    navigation.navigate(MeetAPractitionerNavigator.Detail, {
      slug: slug,
    });
  };

  return (
    <RoundLoading loading={loading}>
      <RequestFailure success={success as boolean} reload={reloadScreen}>
        <SafeAreaView style={ms(['Wrapper'])}>
          <Header pram="back" headerType="New">
            <Heading style={ms(['ml:6'])}>Add Mood</Heading>
          </Header>
          <View style={ms(['topMargin'])}>
            <SearchInput
              placeholder="Search for a practitioner"
              searchBarStyles="new"
            />
          </View>
          <View style={ms(['topMargin'])}>
            <CategoryFilter showImg={true} />
          </View>

          <FlatList
            data={data?.practitioners}
            renderItem={({ item }) => {
              return <PractitionerCard {...item} handlePress={onPressCard} />;
            }}
            style={ms(['topMargin'])}
            keyExtractor={(item) => item.slug}
            showsVerticalScrollIndicator={false}
          />
        </SafeAreaView>
      </RequestFailure>
    </RoundLoading>
  );
}

const styles = StyleSheet.create({});
