import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers';
import Sagas from './sagas'

const getStore = () => {
  let store 

  if (!store) {
    const sagaMiddleware = createSagaMiddleware();

    store = configureStore({
      reducer: rootReducer,
      middleware: [sagaMiddleware],
    });

    sagaMiddleware.run(Sagas);
  }

  return store;
};

export default getStore
