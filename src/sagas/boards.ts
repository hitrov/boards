import {
  ADD_BOARD_REQUEST,
  ADD_BOARD_SUCCESS,
} from '../constants';
import {put, takeLatest} from "redux-saga/effects";
import { IAddBoardAction } from '../reducers/boards';
import uuidv4 from 'uuid/v4';

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
