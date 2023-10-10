import 'react-native-gesture-handler';

import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import AppNavigator from '@src/navigation/app-navigator';
import { SuccessToast, ErrorToast, WarningToast } from '@src/components/toasts';

function App(): JSX.Element {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
        <Toast
          config={{
            ...{ SuccessToast, ErrorToast, WarningToast },
          }}
        />
        <StatusBar barStyle="dark-content" />
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

export default App;
