import { combineReducers } from 'redux';
import boards, { Board } from './boards';
import columns, { Column } from './columns';
import errorMessage from './errorMessage';

export interface RootState {
  boards: Board[];
  columns: Column[];
  errorMessage: string;
}

const reducer = combineReducers<RootState>({
  boards,
  columns,
  errorMessage,
});

export default reducer;
