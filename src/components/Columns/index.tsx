import React from 'react';
import { Column } from '../../reducers/columns';

interface IProps {
  columns: Column[];

  addColumn(name: string): void;
}

interface IState {
  name: string;
}

class Columns extends React.PureComponent<IProps, IState> {
  public readonly state: Readonly<IState> = {
    name: '',
  };

  onAddColumnNameChange = (e: any) => {
    const name = e.target.value;

    this.setState({
      name,
    });
  };

  onAddColumn = () => {
    this.props.addColumn(this.state.name);

    this.setState({
      name: '',
    });
  };

  render() {
    return (
      <div>
        <div>
          Name:
          <input type="text" onChange={this.onAddColumnNameChange} value={this.state.name} />
          <button
            onClick={this.onAddColumn}
          >
            Add column
          </button>
        </div>

        <ul>
          {this.props.columns.map(c =>
            <li key={c.id}>
              {c.name}
            </li>)}
        </ul>
      </div>
    );
  }
}


export default Columns;
