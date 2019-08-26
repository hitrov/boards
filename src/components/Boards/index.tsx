import React from 'react';
import { Board } from '../../reducers/boards';
import Columns from '../Columns';
import { Column } from '../../reducers/columns';

interface IProps {
  boards: Board[];
  columns: Column[];

  addBoard(): void;
  addColumn(name: string): void;
}

const Boards = ({ boards, columns, addBoard, addColumn }: IProps) => {
  return (
    <div>
      <h1>Boards</h1>

      <Columns columns={columns} addColumn={addColumn} />

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
  );
}

export default Boards;
