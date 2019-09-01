import {
  ADD_CARD,
  ADD_COLUMN,
  CHANGE_CARD_DESCRIPTION,
  MOVE_CARD,
  REMOVE_CARD,
  REMOVE_COLUMN,
  RENAME_CARD,
  RENAME_COLUMN,
} from '../constants';

export interface Card {
  id: string
  name: string;
  description: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Column {
  boardId: string;
  id: string
  name: string;
  cards: Card[],
}

export interface IAddColumnAction {
  type: typeof ADD_COLUMN;
  boardId: string;
  id: string;
  name: string;
}

export interface IRenameColumnAction {
  type: typeof RENAME_COLUMN;
  id: string;
  name: string;
}

export interface IRemoveColumnAction {
  type: typeof REMOVE_COLUMN;
  id: string;
}

export interface IAddCardAction {
  type: typeof ADD_CARD;
  id: string;
  columnId: string;
  name: string;
  createdAt: string;
}

export interface IRenameCardAction {
  type: typeof RENAME_CARD;
  columnId: string;
  id: string;
  name: string;
  updatedAt: string;
}

export interface IMoveCardAction {
  type: typeof MOVE_CARD;
  fromColumnId: string;
  toColumnId: string;
  id: string;
  updatedAt: string;
}

export interface IRemoveCardAction {
  type: typeof REMOVE_CARD;
  columnId: string;
  id: string;
}

export interface IChangeCardDescription {
  type: typeof CHANGE_CARD_DESCRIPTION;
  columnId: string;
  id: string;
  description: string;
  updatedAt: string;
}

type ActionTypes = IAddColumnAction | IRenameColumnAction | IRemoveColumnAction |
  IAddCardAction | IRenameCardAction | IRemoveCardAction | IMoveCardAction | IChangeCardDescription;

const columns = (state: Column[] = [], action: ActionTypes): Column[] => {
  switch (action.type) {
    // TODO: validate empty title
    case ADD_COLUMN:
      return [
        ...state,
        {
          boardId: action.boardId,
          id: action.id,
          name: action.name,
          cards: [],
        }
      ];

    // TODO: validate empty title
    // TODO: description
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
              id: action.id,
              name: action.name,
              description: '',
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

    case CHANGE_CARD_DESCRIPTION:
      return state.map(column => {
        if (column.id !== action.columnId) {
          return column;
        }

        return {
          ...column,
          cards: column.cards.map(card => {
            if (card.id !== action.id) {
              return card;
            }

            return {
              ...card,
              description: action.description,
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
