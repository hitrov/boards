import {createStore, applyMiddleware, Store, Middleware} from 'redux';
import {createLogger} from 'redux-logger';
import reducer, {RootState} from './reducers/index';
import rootSaga from "./sagas";
import createSagaMiddleware from 'redux-saga';

// TODO: localStorage
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
        id: '1',
        name: 'Default board',
      }
    ],
    columns: [
      {
        boardId: '1',
        id: '1',
        name: 'aaa',
        cards: [
          {
            id: '1',
            name: 'a1',
          },
          {
            id: '2',
            name: 'a2',
          },
          {
            id: '3',
            name: 'a3',
          },
        ],
      },
      {
        boardId: '1',
        id: '2',
        name: 'bbb',
        cards: [
          {
            id: '4',
            name: 'b1',
          },
          {
            id: '5',
            name: 'b2',
          },
          {
            id: '6',
            name: 'b3',
          },
        ],
      },
      {
        boardId: '1',
        id: '3',
        name: 'ccc',
        cards: [
          {
            id: '7',
            name: 'c1',
          },
          {
            id: '8',
            name: 'c2',
          },
          {
            id: '9',
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
