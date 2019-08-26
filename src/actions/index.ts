import {
  ADD_BOARD_REQUEST,
  ADD_COLUMN,
} from '../constants';

const addBoard = () => ({
  type: ADD_BOARD_REQUEST,
});

const addColumn = (name: string) => ({
  type: ADD_COLUMN,
  name,
});

export {
  addBoard,
  addColumn,
};
