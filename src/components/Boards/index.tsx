import React from 'react';
import { Board as BoardItem } from '../../reducers/boards';
import { Link, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { RootState } from '../../reducers';
import {
  addBoard,
} from '../../actions';

interface IProps {
  boards: BoardItem[];

  addBoard(): void;
}

// TODO: nav list
const Boards = ({boards, addBoard}: IProps) => {
  return (
    <div>
      <h1>Boards</h1>

      <ul>
        {boards.map(b =>
          <li key={b.id}>
            <Link to={`/boards/${b.id}/cards`}>{b.name}</Link>
          </li>)}
      </ul>

      <button
        onClick={addBoard}
      >
        Add test board
      </button>

      <button onClick={() => localStorage.clear()}>localStorage.clear()</button>
    </div>
  );
};

export default connect((state: RootState) => ({
  boards: state.boards,
}), {
  addBoard,
})(Boards);
