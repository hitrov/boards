import { watchBoard } from './boards';
import { fork, all } from 'redux-saga/effects';

export default function* rootSaga() {
  yield all([
    fork(watchBoard),
  ]);
}
