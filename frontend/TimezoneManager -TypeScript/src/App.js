import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import AppContainer from 'src/navigation';
import { PopupMessage } from 'src/components';
import { NavigationService } from 'src/services';
import store, { getPersistor } from './store';

const persistor = getPersistor();

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <View style={styles.container}>
          <PersistGate loading={null} persistor={persistor}>
            <AppContainer ref={ref => NavigationService.setTopLevelNavigator(ref)} />
            <PopupMessage />
          </PersistGate>
        </View>
      </SafeAreaProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});
