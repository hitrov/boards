import { IBasicAction } from './index';
import {
  ADD_BOARD_SUCCESS,
} from '../constants';

export interface Board {
  id: number
  name: string;
}

export interface IAddBoardAction extends IBasicAction {
  id: number;
  name: string;
}

const boards = (state: Board[] = [], action: IAddBoardAction) => {
  switch (action.type) {
    case ADD_BOARD_SUCCESS:
      return [
        ...state,
        {
          id: action.id,
          name: action.name,
        }
      ];

    default:
      return state;
  }
};

export default boards;
