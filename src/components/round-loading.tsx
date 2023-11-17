import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import LoadingScreen from '@app/modules/loading-screen';

type Props = {};


const RoundLoading = ({ children, loading }: { loading: boolean; children?: React.ReactNode }) => {
  const RenderChild = () => {
    return loading ? <LoadingScreen /> : children;
  };

  return <RenderChild />;
};

export default RoundLoading;

const styles = StyleSheet.create({});