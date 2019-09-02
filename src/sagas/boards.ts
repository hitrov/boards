import {
  ADD_BOARD_REQUEST,
  ADD_BOARD_SUCCESS,
} from '../constants';
import { put, takeLatest } from 'redux-saga/effects';
import { IAddBoardAction } from '../reducers/boards';
import uuidv4 from 'uuid/v4';

// Actually there're no reasons for using Redux Saga:
// there're no async actions here
// made during preparing the boilerplate,
// decided to leave :)
const onAddBoard = function* () {
  const id = uuidv4();

  yield put<IAddBoardAction>({
    type: ADD_BOARD_SUCCESS,
    id,
    name: id,
  });
};

const watchBoard = function* () {
  yield takeLatest<IAddBoardAction>(ADD_BOARD_REQUEST, onAddBoard);
};

export {
  watchBoard,
};
