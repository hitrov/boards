import React from 'react';
import Columns from '../Columns';
import { Column } from '../../reducers/columns';
import { RouteComponentProps } from 'react-router';
import {connect} from 'react-redux';
import { RootState } from '../../reducers';
import { addColumn, moveCard, removeColumn, renameColumn } from '../../actions';

interface RouteParams {
  boardId: string;
}

interface IProps extends RouteComponentProps<RouteParams> {
  columns: Column[];

  addColumn(name: string, boardId: string): void;
  renameColumn(id: string, name: string): void;
  removeColumn(id: string): void;
  moveCard(fromColumnId: string, toColumnId: string, id: string): void;
}

const Board: React.FunctionComponent<IProps> = ({ columns, addColumn, renameColumn, removeColumn, moveCard, match }) => (
  <Columns
    boardId={match.params.boardId}
    columns={columns.filter(c => c.boardId === match.params.boardId)}
    addColumn={addColumn}
    renameColumn={renameColumn}
    removeColumn={removeColumn}
    moveCard={moveCard}
  />
);

export default connect((state: RootState) => ({
  columns: state.columns,
}), {
  addColumn,
  renameColumn,
  removeColumn,
  moveCard,
})(Board);
