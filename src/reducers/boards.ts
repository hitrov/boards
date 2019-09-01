import {
  ADD_BOARD_SUCCESS,
} from '../constants';

export interface Board {
  id: string
  name: string;
}

export interface IAddBoardAction {
  type: typeof ADD_BOARD_SUCCESS,
  id: string;
  name: string;
}

// TODO: alias
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
