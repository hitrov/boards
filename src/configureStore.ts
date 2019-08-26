import {createStore, applyMiddleware, Store, Middleware} from 'redux';
import {createLogger} from 'redux-logger';
import reducer, {RootState} from './reducers/index';
import rootSaga from "./sagas";
import createSagaMiddleware from 'redux-saga';

const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();

  const middlewares: Middleware[] = [sagaMiddleware];

  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(createLogger({
      // diff: true,
    }));
  }

  const persistedState: RootState = {
    boards: [
      {
        id: 1,
        name: 'Default board',
      }
    ],
  };

  const store = createStore(
    reducer,
    persistedState,
    applyMiddleware(...middlewares)
  ) as Store<RootState>;

  sagaMiddleware.run(rootSaga);

  return store;
};

export default configureStore;
