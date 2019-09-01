import {
  ADD_CARD,
  ADD_COLUMN,
  CLEAR_ERROR_MESSAGE,
  RENAME_CARD,
  SET_ERROR_MESSAGE,
} from '../constants';

export interface ISetErrorMessageAction {
  type: typeof SET_ERROR_MESSAGE;
  message: string;
}

export interface IClearErrorMessageAction {
  type: typeof CLEAR_ERROR_MESSAGE;
  message: string;
}

type ActionTypes = ISetErrorMessageAction | IClearErrorMessageAction |
  { type: typeof ADD_COLUMN } | { type: typeof ADD_CARD } | { type: typeof RENAME_CARD };

const errorMessage = (state = '', action: ActionTypes): string => {
  switch (action.type) {
    case SET_ERROR_MESSAGE:
      return action.message;

    case CLEAR_ERROR_MESSAGE:
      return '';

    case ADD_COLUMN:
    case ADD_CARD:
    case RENAME_CARD:
      return '';

    default:
      return state;
  }
};

export default errorMessage;
