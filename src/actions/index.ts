import {
  ADD_BOARD_REQUEST,
  ADD_CARD,
  ADD_COLUMN,
  CHANGE_CARD_DESCRIPTION,
  MOVE_CARD,
  REMOVE_CARD,
  REMOVE_COLUMN,
  RENAME_CARD,
  RENAME_COLUMN,
} from '../constants';
import {
  IAddCardAction,
  IAddColumnAction,
  IChangeCardDescription,
  IMoveCardAction,
  IRemoveCardAction,
  IRemoveColumnAction,
  IRenameCardAction,
  IRenameColumnAction
} from '../reducers/columns';
import uuidv4 from 'uuid/v4';

const addBoard = () => ({
  type: ADD_BOARD_REQUEST,
});

const addColumn = (name: string, boardId: string) => ({
  type: ADD_COLUMN,
  name,
  boardId,
  id: uuidv4(),
} as IAddColumnAction);

const renameColumn = (id: string, name: string) => ({
  type: RENAME_COLUMN,
  id,
  name,
} as IRenameColumnAction);

const removeColumn = (id: string) => ({
  type: REMOVE_COLUMN,
  id,
} as IRemoveColumnAction);

const addCard = (columnId: string, name: string) => ({
  type: ADD_CARD,
  name,
  columnId,
  id: uuidv4(),
} as IAddCardAction);

const moveCard = (fromColumnId: string, toColumnId: string, id: string) => ({
  type: MOVE_CARD,
  fromColumnId,
  toColumnId,
  id,
} as IMoveCardAction);

const renameCard = (columnId: string, id: string, name: string) => ({
  type: RENAME_CARD,
  id,
  name,
  columnId,
} as IRenameCardAction);

const removeCard = (columnId: string, id: string) => ({
  type: REMOVE_CARD,
  columnId,
  id,
} as IRemoveCardAction);

const changeCardDescription = (columnId: string, id: string, description: string) => ({
  type: CHANGE_CARD_DESCRIPTION,
  columnId,
  id,
  description,
  updatedAt: new Date().toJSON(),
} as IChangeCardDescription);

export {
  addBoard,
  addColumn,
  renameColumn,
  removeColumn,
  addCard,
  moveCard,
  renameCard,
  removeCard,
  changeCardDescription,
};
