import 'react-native-gesture-handler';

import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';
import Toast from 'react-native-toast-message';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
  MD3LightTheme as defaultTheme,
  Provider as PaperProvider,
} from 'react-native-paper';

import AppNavigation from '@app/navigation/app-navigation';
import { AppToastsConfig } from '@app/components/toasts';
import { Colors } from '@app/constants';

const RNPaperTheme = {
  ...defaultTheme,
  colors: {
    ...defaultTheme.colors,
    primary: Colors.primary,
    secondary: 'yellow',
  },
};

function App(): JSX.Element {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

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
