import reducer from './columns';
import expect from 'expect';

const createdAt = new Date(0).toJSON();
const updatedAt = new Date().toJSON();

const mockState2columns = [
  {
    name: 'First column',
    boardId: '1',
    id: '1-1',
    cards: [
      {
        id: '1-1-2',
        name: 'Second card',
        description: '',
        createdAt,
        updatedAt: createdAt,
      },
      {
        id: '1-1-3',
        name: 'Third card',
        description: '',
        createdAt,
        updatedAt: createdAt,
      },
    ],
  },
  {
    name: 'Second column',
    boardId: '1',
    id: '1-2',
    cards: [
      {
        id: '1-1-1',
        name: 'First card',
        description: '',
        createdAt,
        updatedAt: createdAt,
      }
    ],
  },
];

describe('columns reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual([]);
  });

  it('should handle ADD_COLUMN', () => {
    expect(reducer(undefined, {
      type: 'ADD_COLUMN',
      name: 'First column',
      boardId: '1',
      id: '1-1',
    })).toEqual([
      {
        name: 'First column',
        boardId: '1',
        id: '1-1',
        cards: [],
      },
    ]);

    expect(reducer([
      {
        name: 'First column',
        boardId: '1',
        id: '1-1',
        cards: [],
      },
    ], {
      type: 'ADD_COLUMN',
      name: 'Second column',
      boardId: '1',
      id: '1-2',
    })).toEqual([
      {
        name: 'First column',
        boardId: '1',
        id: '1-1',
        cards: [],
      },
      {
        name: 'Second column',
        boardId: '1',
        id: '1-2',
        cards: [],
      }
    ]);
  });

  it('should handle ADD_CARD', () => {
    const state = reducer(undefined, {
      type: 'ADD_COLUMN',
      name: 'First column',
      boardId: '1',
      id: '1-1',
    });

    expect(reducer(state, {
      type: 'ADD_CARD',
      id: '1-1-1',
      columnId: '1-1',
      name: 'First card',
      description: '',
      createdAt,
    })).toEqual([
      {
        name: 'First column',
        boardId: '1',
        id: '1-1',
        cards: [
          {
            id: '1-1-1',
            name: 'First card',
            description: '',
            createdAt: createdAt,
            updatedAt: createdAt,
          }
        ],
      },
    ]);
  });

  it('should handle MOVE_CARD', () => {
    let state = reducer(undefined, {
      type: 'ADD_COLUMN',
      name: 'First column',
      boardId: '1',
      id: '1-1',
    });

    state = reducer(state, {
      type: 'ADD_COLUMN',
      name: 'Second column',
      boardId: '1',
      id: '1-2',
    });

    state = reducer(state, {
      type: 'ADD_CARD',
      id: '1-1-1',
      columnId: '1-1',
      name: 'First card',
      description: '',
      createdAt,
    });

    state = reducer(state, {
      type: 'ADD_CARD',
      id: '1-1-2',
      columnId: '1-1',
      name: 'Second card',
      description: '',
      createdAt,
    });

    state = reducer(state, {
      type: 'ADD_CARD',
      id: '1-1-3',
      columnId: '1-1',
      name: 'Third card',
      description: '',
      createdAt,
    });

    expect(reducer(state, {
      type: 'MOVE_CARD',
      id: '1-1-1',
      fromColumnId: '1-1',
      toColumnId: '1-2',
      updatedAt: createdAt,
    })).toEqual([
      {
        name: 'First column',
        boardId: '1',
        id: '1-1',
        cards: [
          {
            id: '1-1-2',
            name: 'Second card',
            description: '',
            createdAt: createdAt,
            updatedAt: createdAt,
          },
          {
            id: '1-1-3',
            name: 'Third card',
            description: '',
            createdAt: createdAt,
            updatedAt: createdAt,
          }
        ],
      },
      {
        name: 'Second column',
        boardId: '1',
        id: '1-2',
        cards: [
          {
            id: '1-1-1',
            name: 'First card',
            description: '',
            createdAt: createdAt,
            updatedAt: createdAt,
          }
        ],
      },
    ]);
  });

  it('should handle REMOVE_CARD', () => {
    expect(reducer(mockState2columns, {
      type: 'REMOVE_CARD',
      id: '1-1-3',
      columnId: '1-1',
    })).toEqual([
      {
        name: 'First column',
        boardId: '1',
        id: '1-1',
        cards: [
          {
            id: '1-1-2',
            name: 'Second card',
            description: '',
            createdAt,
            updatedAt: createdAt,
          },
        ],
      },
      {
        name: 'Second column',
        boardId: '1',
        id: '1-2',
        cards: [
          {
            id: '1-1-1',
            name: 'First card',
            description: '',
            createdAt,
            updatedAt: createdAt,
          }
        ],
      },
    ]);
  });

  it('should handle REMOVE_COLUMN', () => {
    expect(reducer(mockState2columns, {
      type: 'REMOVE_COLUMN',
      id: '1-2',
    })).toEqual([
      {
        name: 'First column',
        boardId: '1',
        id: '1-1',
        cards: [
          {
            id: '1-1-2',
            name: 'Second card',
            description: '',
            createdAt,
            updatedAt: createdAt,
          },
          {
            id: '1-1-3',
            name: 'Third card',
            description: '',
            createdAt,
            updatedAt: createdAt,
          },
        ],
      },
    ]);
  });

  it('should handle RENAME_CARD', () => {
    expect(reducer(mockState2columns, {
      type: 'RENAME_CARD',
      id: '1-1-3',
      name: 'Renamed third card',
      columnId: '1-1',
      updatedAt,
    })).toEqual([
      {
        name: 'First column',
        boardId: '1',
        id: '1-1',
        cards: [
          {
            id: '1-1-2',
            name: 'Second card',
            description: '',
            createdAt,
            updatedAt: createdAt,
          },
          {
            id: '1-1-3',
            name: 'Renamed third card',
            description: '',
            createdAt,
            updatedAt,
          },
        ],
      },
      {
        name: 'Second column',
        boardId: '1',
        id: '1-2',
        cards: [
          {
            id: '1-1-1',
            name: 'First card',
            description: '',
            createdAt,
            updatedAt: createdAt,
          }
        ],
      },
    ]);
  });

  it('should handle RENAME_COLUMN', () => {
    expect(reducer(mockState2columns, {
      type: 'RENAME_COLUMN',
      id: '1-2',
      name: 'Renamed second column',
    })).toEqual([
      {
        name: 'First column',
        boardId: '1',
        id: '1-1',
        cards: [
          {
            id: '1-1-2',
            name: 'Second card',
            description: '',
            createdAt,
            updatedAt: createdAt,
          },
          {
            id: '1-1-3',
            name: 'Third card',
            description: '',
            createdAt,
            updatedAt: createdAt,
          },
        ],
      },
      {
        name: 'Renamed second column',
        boardId: '1',
        id: '1-2',
        cards: [
          {
            id: '1-1-1',
            name: 'First card',
            description: '',
            createdAt,
            updatedAt: createdAt,
          }
        ],
      },
    ]);
  });

  it('should handle CHANGE_CARD_DESCRIPTION', () => {
    expect(reducer(mockState2columns, {
      type: 'CHANGE_CARD_DESCRIPTION',
      columnId: '1-1',
      id: '1-1-3',
      description: 'Description was added.',
      updatedAt,
    })).toEqual([
      {
        name: 'First column',
        boardId: '1',
        id: '1-1',
        cards: [
          {
            id: '1-1-2',
            name: 'Second card',
            description: '',
            createdAt,
            updatedAt: createdAt,
          },
          {
            id: '1-1-3',
            name: 'Third card',
            description: 'Description was added.',
            createdAt,
            updatedAt,
          },
        ],
      },
      {
        name: 'Second column',
        boardId: '1',
        id: '1-2',
        cards: [
          {
            id: '1-1-1',
            name: 'First card',
            description: '',
            createdAt,
            updatedAt: createdAt,
          }
        ],
      },
    ]);
  });
});
