import {
  ADD_BOARD_REQUEST,
  ADD_BOARD_SUCCESS,
} from '../constants';
import {put, takeLatest, select} from "redux-saga/effects";
import { IBasicAction, RootState } from '../reducers';
import { IAddBoardAction } from '../reducers/boards';

const onAddBoard = function* () {
  const boards = yield select((state: RootState) => state.boards);

  const id = boards.length + 1;

  yield put<IAddBoardAction>({
    type: ADD_BOARD_SUCCESS,
    id,
    name: `Another board id=${id}`,
  });
};

const watchBoard = function* () {
  yield takeLatest<IBasicAction>(ADD_BOARD_REQUEST, onAddBoard);
};

export {
  watchBoard,
};
