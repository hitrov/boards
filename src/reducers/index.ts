import {combineReducers} from 'redux';
import boards, { Board } from './boards';
import columns, { Column } from './columns';

export interface RootState {
  boards: Board[];
  columns: Column[];
}

export interface IBasicAction {
  type: string;
}

const reducer = combineReducers<RootState>({
  boards,
  columns,
});

export default reducer;
