import {combineReducers} from 'redux';
import boards, { Board } from './boards';

export interface RootState {
  boards: Board[];
}

export interface IBasicAction {
  type: string;
}

const reducer = combineReducers<RootState>({
  boards,
});

export default reducer;
