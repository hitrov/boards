import {createStore, applyMiddleware, Store, Middleware} from 'redux';
import {createLogger} from 'redux-logger';
import reducer, {RootState} from './reducers/index';
import rootSaga from "./sagas";
import createSagaMiddleware from 'redux-saga';
import { loadState, saveState } from './localStorage';
import throttle from 'lodash/throttle';

const mockState: RootState = {
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
          description: 'a1 description goes here',
          createdAt: new Date().toJSON(),
          updatedAt: new Date().toJSON(),
        },
        {
          id: '2',
          name: 'a2',
          description: 'a2 description goes here',
          createdAt: new Date().toJSON(),
          updatedAt: new Date().toJSON(),
        },
        {
          id: '3',
          name: 'a3',
          description: 'a3 description goes here',
          createdAt: new Date().toJSON(),
          updatedAt: new Date().toJSON(),
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
          description: 'b1 description goes here',
          createdAt: new Date().toJSON(),
          updatedAt: new Date().toJSON(),
        },
        {
          id: '5',
          name: 'b2',
          description: 'b2 description goes here',
          createdAt: new Date().toJSON(),
          updatedAt: new Date().toJSON(),
        },
        {
          id: '6',
          name: 'b3',
          description: 'b3 description goes here',
          createdAt: new Date().toJSON(),
          updatedAt: new Date().toJSON(),
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
          description: 'c1 description goes here',
          createdAt: new Date().toJSON(),
          updatedAt: new Date().toJSON(),
        },
        {
          id: '8',
          name: 'c2',
          description: 'c2 description goes here',
          createdAt: new Date().toJSON(),
          updatedAt: new Date().toJSON(),
        },
        {
          id: '9',
          name: 'c3',
          description: 'c3 description goes here',
          createdAt: new Date().toJSON(),
          updatedAt: new Date().toJSON(),
        },
      ],
    },
  ],
  errorMessage: '',
};

const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();

  const middlewares: Middleware[] = [sagaMiddleware];

  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(createLogger({
      // diff: true,
    }));
  }

  let persistedState = loadState();
  if (!persistedState) {
    console.log('mockState');
    persistedState = mockState;
  }

  const store = createStore(
    reducer,
    persistedState,
    applyMiddleware(...middlewares)
  ) as Store<RootState>;

  store.subscribe(throttle(() => {
    saveState(store.getState());
  }));

  sagaMiddleware.run(rootSaga);

  return store;
};

export default configureStore;
