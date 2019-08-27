import React from 'react';
import { Board } from '../../reducers/boards';
import Columns from '../../containers/Columns';
import { Column } from '../../reducers/columns';
import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

interface IProps {
  boards: Board[];
  columns: Column[];

  addBoard(): void;

  addColumn(name: string): void;
  renameColumn(id: string, name: string): void;
  removeColumn(id: string): void;
}

const Boards = ({ boards, columns, addBoard, addColumn, renameColumn, removeColumn }: IProps) => {
  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        <h1>Boards</h1>

        <Columns
          columns={columns}
          addColumn={addColumn}
          renameColumn={renameColumn}
          removeColumn={removeColumn}
        />

        <button
          onClick={addBoard}
        >
          Add test board
        </button>

        <ul>
          {boards.map(b =>
            <li key={b.id}>
              {b.name}
            </li>)}
        </ul>
      </div>
    </DndProvider>
  );
}

export default Boards;
