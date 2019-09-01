import React from 'react';
import { Board as BoardItem } from '../../reducers/boards';
import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend';
import { Switch, Route, Link } from 'react-router-dom';
import Board from '../Board';

interface IProps {
  boards: BoardItem[];
  addBoard(): void;
}

const Boards = ({ boards, addBoard }: IProps) => {
  return (
    <DndProvider backend={HTML5Backend}>
      <Switch>
        <Route exact path="/" component={() => (
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
        )} />
        <Route path="/boards/:boardId/cards/:cardId?" component={Board}/>
        <Route component={() => <h1>404 Not Found</h1>}/>
      </Switch>
    </DndProvider>
  );
};

export default Boards;
