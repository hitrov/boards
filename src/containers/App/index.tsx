import React, { Component } from 'react';
import BoardsContainer from '../BoardsContainer';
import './index.scss';
import HTML5Backend from 'react-dnd-html5-backend';
import { Route, Switch } from 'react-router';
import { DndProvider } from 'react-dnd';
import BoardContainer from '../BoardContainer';

class App extends Component {
  render() {
    return (
      <DndProvider backend={HTML5Backend}>
        <Switch>
          <Route exact path="/" component={BoardsContainer}/>
          <Route path="/boards/:boardId/cards/:cardId?" component={BoardContainer}/>
          <Route component={() => <h1>404 Not Found</h1>}/>
        </Switch>
      </DndProvider>
    );
  }
}

export default App;
