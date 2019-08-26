import { IBasicAction } from './index';
import {
  ADD_COLUMN,
} from '../constants';

export interface Column {
  id: number
  name: string;
}

export interface IAddColumnAction extends IBasicAction {
  id: number;
  name: string;
}

const columns = (state: Column[] = [], action: IAddColumnAction) => {
  switch (action.type) {
    case ADD_COLUMN:
      return [
        ...state,
        {
          id: state.length + 1,
          name: action.name,
        }
      ];

    default:
      return state;
  }
};

export default columns;
