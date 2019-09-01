import React from 'react';
import Columns from '../Columns';
import { Column } from '../../reducers/columns';
import { RouteComponentProps } from 'react-router';
import {connect} from 'react-redux';
import { RootState } from '../../reducers';
import { addColumn, moveCard, removeColumn, renameColumn, setErrorMessage } from '../../actions';

interface RouteParams {
  boardId: string;
}

interface IProps extends RouteComponentProps<RouteParams> {
  columns: Column[];
  errorMessage: string;

  addColumn(name: string, boardId: string): void;
  renameColumn(id: string, name: string): void;
  removeColumn(id: string): void;
  moveCard(fromColumnId: string, toColumnId: string, id: string): void;
  setErrorMessage(message: string): void;
}

const Board: React.FunctionComponent<IProps> =
  ({
     columns,
     addColumn,
     renameColumn,
     removeColumn,
     moveCard,
     match,
     errorMessage,
     setErrorMessage,
  }) => (
  <Columns
    boardId={match.params.boardId}
    columns={columns.filter(c => c.boardId === match.params.boardId)}
    addColumn={addColumn}
    renameColumn={renameColumn}
    removeColumn={removeColumn}
    moveCard={moveCard}
    errorMessage={errorMessage}
    setErrorMessage={setErrorMessage}
  />
);

export default connect((state: RootState) => ({
  columns: state.columns,
  errorMessage: state.errorMessage,
}), {
  addColumn,
  renameColumn,
  removeColumn,
  moveCard,
  setErrorMessage,
})(Board);
