import { IBasicAction } from './index';
import {
  ADD_BOARD_SUCCESS,
} from '../constants';

export interface Board {
  id: string
  name: string;
}

export interface IAddBoardAction extends IBasicAction {
  id: string;
  name: string;
}

const boards = (state: Board[] = [], action: IAddBoardAction): Board[] => {
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
