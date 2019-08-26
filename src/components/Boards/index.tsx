import React from 'react';
import { Board } from '../../reducers/boards';

interface IProps {
  boards: Board[];

  addBoard(): void;
}

const Boards = ({ boards, addBoard }: IProps) => {
  return (
    <div>
      <h1>Boards</h1>

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
