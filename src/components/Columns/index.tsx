import React, { SyntheticEvent } from 'react';
import Column from '../Column';
import { Column as ColumnItem } from '../../reducers/columns';
import { Grid, Row, Col } from 'react-flexbox-grid';
import './index.scss';
import { Redirect } from 'react-router';

interface IProps {
  boardId: string;
  cardId?: string;
  errorMessage: string;
  columns: ColumnItem[];

  addColumn(name: string, boardId: string): void;

  renameColumn(id: string, name: string): void;

  removeColumn(id: string): void;

  moveCard(fromColumnId: string, toColumnId: string, id: string): void;

  setErrorMessage(message: string): void;
}

export interface RenamingColumn {
  id: string;
  name: string;
}

interface IState {
  name: string;
  renamingColumns: RenamingColumn[],
}

class Columns extends React.PureComponent<IProps, IState> {
  public readonly state: Readonly<IState> = {
    name: '',
    renamingColumns: [],
  };

  onAddColumnNameChange = (e: SyntheticEvent) => {
    const name = (e.target as HTMLInputElement).value;

    this.setState({
      name,
    });
  };

  onRenameColumnChange = (id: string) => (e: SyntheticEvent) => {
    const newName = (e.target as HTMLInputElement).value;

    this.setState(prevState => ({
      renamingColumns: [
        ...prevState.renamingColumns.filter(c => c.id !== id),
        {
          id,
          name: newName,
        },
      ],
    }));
  };

  onRenameColumnClick = (id: string) => () => {
    const c = this.state.renamingColumns.find(c => c.id === id);
    if (!c) {
      return;
    }

    const newName = c.name;

    if (newName === '') {
      this.props.setErrorMessage('Column name is required.');
      return;
    }

    this.setState(prevState => ({
      renamingColumns: prevState.renamingColumns.filter(c => c.id !== id),
    }), () => this.props.renameColumn(id, newName));
  };

  onEditColumnClick = (id: string) => () => {
    const c = this.props.columns.find(c => c.id === id);
    if (!c) {
      return;
    }

    const oldName = c.name;

    this.setState(prevState => ({
      renamingColumns: [
        ...prevState.renamingColumns.filter(c => c.id !== id),
        {
          id,
          name: oldName,
        },
      ],
    }));
  };

  onCancelRenameColumnClick = (id: string) => () => {
    this.setState(prevState => ({
      renamingColumns: prevState.renamingColumns.filter(c => c.id !== id),
    }));
  };

  onAddColumn = () => {
    const {name} = this.state;
    if (name === '') {
      this.props.setErrorMessage('Column name is required.');
      return;
    }

    this.props.addColumn(name, this.props.boardId);

    this.setState({
      name: '',
    });
  };

  getTemporaryNameStateValue = (id: string): string => {
    const column = this.state.renamingColumns.find(c => c.id === id);
    if (!column) {
      return '';
    }
    return column.name;
  };

  cardExists = (): boolean => {
    let cardExists = false;
    const { columns, cardId } = this.props;
    if (!cardId) {
      return true;

    }
    columns.forEach(column => {
      const card = column.cards.find(c => c.id === cardId);
      if (card) {
        cardExists = true;
      }
    });

    return cardExists;
  };

  render() {
    if (!this.cardExists()) {
      return <Redirect to={`/boards/${this.props.boardId}/cards`} />
    }

    return (
      <Grid className='ah-columns ah-shape'>
        {!!this.props.errorMessage &&
        <div>
          <span className='ah-error-message'>{this.props.errorMessage}</span>
          <button onClick={() => this.props.setErrorMessage('')}>Dismiss</button>
        </div>}
        <Row center={'xs'} className='add-column-wrapper'>
          <Col>
            <input
              onChange={this.onAddColumnNameChange}
              value={this.state.name}
              placeholder='Name'
            />
            <button
              onClick={this.onAddColumn}
            >
              Add column
            </button>
          </Col>
        </Row>

        <Row>
          {this.props.columns.map(column =>
            <Col key={column.id} xs={12} sm={6} md={4} lg={3}>
              <Column
                column={column}
                addColumn={this.props.addColumn}
                renamingColumns={this.state.renamingColumns}
                getTemporaryNameStateValue={this.getTemporaryNameStateValue}
                onCancelRenameColumnClick={this.onCancelRenameColumnClick}
                onEditColumnClick={this.onEditColumnClick}
                onRenameColumnChange={this.onRenameColumnChange}
                onRenameColumnClick={this.onRenameColumnClick}
                removeColumn={this.props.removeColumn}
                renameColumn={this.props.renameColumn}
                moveCard={this.props.moveCard}
              />
            </Col>)}
        </Row>
      </Grid>
    );
  }
}


export default Columns;
