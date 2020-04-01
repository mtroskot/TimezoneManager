import { applyMiddleware, createStore } from 'redux';
import { createMigrate, persistReducer, persistStore } from 'redux-persist';
import createEncryptor from 'redux-persist-transform-encrypt';
import AsyncStorage from '@react-native-community/async-storage';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import rootSaga from 'src/store/rootSaga';
import additionalMiddlewares from 'src/store/middlewares';
import rootReducer from 'src/store/rootReducer';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import migrations from 'src/store/migrations';

// encryption
const encryptor = createEncryptor({
  secretKey: 'mtroskot.t1mezon3Manag3r.3ncrypt',
  onError: function(error) {
    // Handle the error.
    console.log('encryptor error', error);
  }
});

// redux-persist
const persistConfig = {
  key: 'mtroskot.timezoneManager',
  storage: AsyncStorage,
  version: 0,
  migrate: createMigrate(migrations, { debug: true }),
  blacklist: ['ui'], //  will not be persisted,
  transforms: [encryptor],
  stateReconciler: autoMergeLevel2
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

let persistor = null;

export function getPersistor() {
  return persistor;
}

function configureStore() {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [...additionalMiddlewares, sagaMiddleware];
  const store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(...middlewares)));
  persistor = persistStore(store);
  sagaMiddleware.run(rootSaga);
  return store;
}

const store = configureStore();
export default store;
