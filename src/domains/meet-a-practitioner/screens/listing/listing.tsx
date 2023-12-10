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

export default function Listing() {
  return (
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
      <View>
        <FlatList
          data={[1]}
          renderItem={({ item }) => {
            return <PractitionerCard />;
          }}
          style={ms(['topMargin','h-full'])}

        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
