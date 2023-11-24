import 'react-native-gesture-handler';

import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// import AppNavigation from '@app/navigation/app-navigation';
import { AppToastsConfig } from '@app/components/toasts';
import {
  MD3LightTheme as defaultTheme,
  Provider as PaperProvider,
} from 'react-native-paper';
import { Colors } from '@app/constants';

import AppNavigation from '@app/navigation';

const RNPaperTheme = {
  ...defaultTheme,
  colors: {
    ...defaultTheme.colors,
    primary: Colors.primary,
    secondary: 'yellow',
  },
};

function App(): JSX.Element {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer>
          <PaperProvider theme={RNPaperTheme}>
            <AppNavigation />
          </PaperProvider>
        </NavigationContainer>
        <Toast config={AppToastsConfig} />
        <StatusBar barStyle="dark-content" />
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

export default App;
