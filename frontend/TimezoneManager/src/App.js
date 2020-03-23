import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppContainer from 'src/navigation';
import { NavigationService } from 'src/services';
import store, { getPersistor } from 'src/store';

const persistor = getPersistor();

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <View style={styles.container}>
          <PersistGate loading={null} persistor={persistor}>
            <AppContainer ref={ref => NavigationService.setTopLevelNavigator(ref)} />
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
