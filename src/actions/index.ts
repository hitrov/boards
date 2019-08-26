import {
  ADD_BOARD_REQUEST,
  ADD_COLUMN,
  ADD_CARD,
  MOVE_CARD,
  REMOVE_CARD,
  RENAME_COLUMN,
  REMOVE_COLUMN,
  RENAME_CARD,
} from '../constants';
import {
  IAddCardAction,
  IAddColumnAction,
  IMoveCardAction,
  IRemoveCardAction,
  IRemoveColumnAction,
  IRenameCardAction,
  IRenameColumnAction
} from '../reducers/columns';

const addBoard = () => ({
  type: ADD_BOARD_REQUEST,
});

const addColumn = (name: string) => ({
  type: ADD_COLUMN,
  name,
} as IAddColumnAction);

const renameColumn = (id: number, name: string) => ({
  type: RENAME_COLUMN,
  id,
  name,
} as IRenameColumnAction);

const removeColumn = (id: number) => ({
  type: REMOVE_COLUMN,
  id,
} as IRemoveColumnAction);

const addCard = (columnId: number, name: string) => ({
  type: ADD_CARD,
  name,
  columnId,
} as IAddCardAction);

const moveCard = (fromColumnId: number, toColumnId: number, id: string) => ({
  type: MOVE_CARD,
  fromColumnId,
  toColumnId,
  id,
} as IMoveCardAction);

const renameCard = (columnId: number, id: string, name: string) => ({
  type: RENAME_CARD,
  id,
  name,
  columnId,
} as IRenameCardAction);

const removeCard = (columnId: number, id: string) => ({
  type: REMOVE_CARD,
  columnId,
  id,
} as IRemoveCardAction);

export {
  addBoard,
  addColumn,
  renameColumn,
  removeColumn,
  addCard,
  moveCard,
  renameCard,
  removeCard,
};
