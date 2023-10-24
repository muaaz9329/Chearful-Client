import 'react-native-gesture-handler';

import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import AppNavigator from '@app/navigation/app-navigator';
import { AppToastsConfig } from '@app/components/toasts';

function App(): JSX.Element {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
        <Toast config={AppToastsConfig} />
        <StatusBar barStyle="dark-content" />
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

export default App;
