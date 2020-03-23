import React from 'react';
import { StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SafeAreaView from 'react-native-safe-area-view';
import AppContainer from 'src/navigation';
import { NavigationService } from 'src/services';
import store, { getPersistor } from 'src/store';

const persistor = getPersistor();

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <SafeAreaView style={styles.container} forceInset={{ top: 'never' }}>
          <PersistGate loading={null} persistor={persistor}>
            <AppContainer ref={ref => NavigationService.setTopLevelNavigator(ref)} />
          </PersistGate>
        </SafeAreaView>
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
