import { ADD_CARD, ADD_COLUMN, REMOVE_CARD, REMOVE_COLUMN, RENAME_CARD, RENAME_COLUMN, } from '../constants';

export interface Card {
  id: string
  name: string;
  description?: string;
}

export interface Column {
  id: number
  name: string;
  cards: Card[],
}

export interface IAddColumnAction {
  type: typeof ADD_COLUMN,
  name: string;
}

export interface IRenameColumnAction {
  type: typeof RENAME_COLUMN,
  id: number;
  name: string;
}

export interface IRemoveColumnAction {
  type: typeof REMOVE_COLUMN,
  id: number;
}

export interface IAddCardAction {
  type: typeof ADD_CARD,
  columnId: number;
  name: string;
}

export interface IRenameCardAction {
  type: typeof RENAME_CARD,
  columnId: number;
  id: string;
  name: string;
}

export interface IRemoveCardAction {
  type: typeof REMOVE_CARD,
  columnId: number;
  id: string;
}

type ActionTypes = IAddColumnAction | IRenameColumnAction | IRemoveColumnAction |
  IAddCardAction | IRenameCardAction | IRemoveCardAction;

const columns = (state: Column[] = [], action: ActionTypes): Column[] => {
  switch (action.type) {
    case ADD_COLUMN:
      return [
        ...state,
        {
          id: state.length + 1,
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
              id: `${c.id}-${c.cards.length+1}`,
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
