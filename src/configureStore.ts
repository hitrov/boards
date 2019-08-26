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
    columns: [
      {
        id: 1,
        name: 'aaa',
        cards: [
          {
            id: '1-1',
            name: 'a1',
          },
          {
            id: '1-2',
            name: 'a2',
          },
          {
            id: '1-3',
            name: 'a3',
          },
        ],
      },
      {
        id: 2,
        name: 'bbb',
        cards: [
          {
            id: '2-1',
            name: 'b1',
          },
          {
            id: '2-2',
            name: 'b2',
          },
          {
            id: '2-3',
            name: 'b3',
          },
        ],
      },
      {
        id: 3,
        name: 'ccc',
        cards: [
          {
            id: '3-1',
            name: 'c1',
          },
          {
            id: '3-2',
            name: 'c2',
          },
          {
            id: '3-3',
            name: 'c3',
          },
        ],
      },
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
