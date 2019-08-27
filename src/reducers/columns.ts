import {
  ADD_CARD,
  ADD_COLUMN,
  MOVE_CARD,
  REMOVE_CARD,
  REMOVE_COLUMN,
  RENAME_CARD,
  RENAME_COLUMN,
} from '../constants';
import uuidv4 from 'uuid/v4';

export interface Card {
  id: string
  name: string;
  description?: string;
}

export interface Column {
  id: string
  name: string;
  cards: Card[],
}

export interface IAddColumnAction {
  type: typeof ADD_COLUMN,
  name: string;
}

export interface IRenameColumnAction {
  type: typeof RENAME_COLUMN,
  id: string;
  name: string;
}

export interface IRemoveColumnAction {
  type: typeof REMOVE_COLUMN,
  id: string;
}

export interface IAddCardAction {
  type: typeof ADD_CARD,
  columnId: string;
  name: string;
}

export interface IRenameCardAction {
  type: typeof RENAME_CARD,
  columnId: string;
  id: string;
  name: string;
}

export interface IMoveCardAction {
  type: typeof MOVE_CARD,
  fromColumnId: string;
  toColumnId: string;
  id: string;
}

export interface IRemoveCardAction {
  type: typeof REMOVE_CARD,
  columnId: string;
  id: string;
}

type ActionTypes = IAddColumnAction | IRenameColumnAction | IRemoveColumnAction |
  IAddCardAction | IRenameCardAction | IRemoveCardAction | IMoveCardAction;

const columns = (state: Column[] = [], action: ActionTypes): Column[] => {
  switch (action.type) {
    case ADD_COLUMN:
      return [
        ...state,
        {
          id: uuidv4(),
          name: action.name,
          cards: [],
        }
      ];

    case ADD_CARD:
      return state.map(c => {
        if (c.id !== action.columnId) {
          return c;
        }

        return {
          ...c,
          cards: [
            ...c.cards,
            {
              id: uuidv4(),
              name: action.name,
            }
          ],
        }
      });

    case RENAME_COLUMN:
      return state.map(c => {
        if (c.id !== action.id) {
          return c;
        }

        return {
          ...c,
          name: action.name,
        }
      });

    case REMOVE_COLUMN:
      return state.filter(c => c.id !== action.id);

    case RENAME_CARD:
      return state.map(c => {
        if (c.id !== action.columnId) {
          return c;
        }

        return {
          ...c,
          cards: c.cards.map(c => {
            if (c.id !== action.id) {
              return c;
            }

            return {
              ...c,
              name: action.name,
            };
          }),
        }
      });

    case MOVE_CARD:
      if (action.fromColumnId === action.toColumnId) {
        return state;
      }

      const fromColumn = state.find(c => c.id === action.fromColumnId);
      if (!fromColumn) {
        return state;
      }

      const card = fromColumn.cards.find(c => c.id === action.id);
      if (!card) {
        return state;
      }

      return state.map(c => {
        if (c.id !== action.toColumnId && c.id !== action.fromColumnId) {
          return c;
        }

        if (c.id === action.toColumnId) {
          return {
            ...c,
            cards: [
              ...c.cards,
              card,
            ],
          };
        }

        if (c.id === action.fromColumnId) {
          return {
            ...c,
            cards: c.cards.filter(card => card.id !== action.id)
          }
        }

        return c;
      });

    case REMOVE_CARD:
      return state.map(c => {
        if (c.id !== action.columnId) {
          return c;
        }

        return {
          ...c,
          cards: c.cards.filter(c => c.id !== action.id),
        }
      });

    default:
      return state;
  }
};

export default columns;
