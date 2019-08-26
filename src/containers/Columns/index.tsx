import React from 'react';
import { Column } from '../../reducers/columns';
import CardsContainer from '../CardsContainer';

interface IProps {
  columns: Column[];

  addColumn(name: string): void;
  renameColumn(id: string, name: string): void;
  removeColumn(id: string): void;
}

interface IState {
  name: string;
  renamingColumns: {
    id: string;
    name: string;
  }[],
}

class Columns extends React.PureComponent<IProps, IState> {
  public readonly state: Readonly<IState> = {
    name: '',
    renamingColumns: [],
  };

  onAddColumnNameChange = (e: any) => {
    const name = e.target.value;

    this.setState({
      name,
    });
  };

  onRenameColumnChange = (id: string) => (e: any) => {
    const newName = e.target.value;

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
    this.props.addColumn(this.state.name);

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

  displayEditName = (id: string): boolean => {
    return this.state.renamingColumns.find(c => c.id === id) !== undefined;
  };

  render() {
    return (
      <div>
        <div>
          Name:
          <input onChange={this.onAddColumnNameChange} value={this.state.name} />
          <button
            onClick={this.onAddColumn}
          >
            Add column
          </button>
        </div>

        <ul>
          {this.props.columns.map(column =>
            <li key={column.id}>
              {column.name}

              <button
                onClick={this.onEditColumnClick(column.id)}
              >
                Edit
              </button>

              {this.displayEditName(column.id) && <div>
                <input
                  onChange={this.onRenameColumnChange(column.id)}
                  value={this.getTemporaryNameStateValue(column.id)}
                />
                <button
                  onClick={this.onRenameColumnClick(column.id)}
                >
                  Rename
                </button>
                <button
                  onClick={this.onCancelRenameColumnClick(column.id)}
                >
                  Cancel
                </button>
              </div>}

              <button
                onClick={() => this.props.removeColumn(column.id)}
              >
                X
              </button>

              <CardsContainer
                columns={this.props.columns}
                column={column}
              />
            </li>)}
        </ul>
      </div>
    );
  }
}


export default Columns;
