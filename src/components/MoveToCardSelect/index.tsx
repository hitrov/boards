import React, { SyntheticEvent } from 'react';
import { Column } from '../../reducers/columns';
import { Card as CardItem } from '../../reducers/columns';

interface IProps {
  columns: Column[];
  column: Column;
  card: CardItem;

  moveCard(fromColumnId: string, toColumnId: string, id: string): void;
}

interface IState {
  moveToCardId: string;
}

class MoveToCardSelect extends React.PureComponent<IProps, IState> {
  public readonly state: Readonly<IState> = {
    moveToCardId: '',
  };

  availableColumns: Column[] = [];

  componentWillMount(): void {
    this.availableColumns = this.props.columns
      .filter(c => c.id !== this.props.column.id);

    if (this.availableColumns.length) {
      this.setState({
        moveToCardId: this.availableColumns[0].id,
      })
    }
  }

  onMoveCardClick = () => {
    this.props.moveCard(this.props.column.id, this.state.moveToCardId, this.props.card.id);
  };

  onMoveToCardChange = (e: SyntheticEvent) => {
    const moveToCardId = (e.target as HTMLSelectElement).value;

    this.setState({
      moveToCardId,
    });
  };

  // TODO: filter by boardId
  render() {
    if (!this.availableColumns.length) {
      return null;
    }

    return (
        <div>
          <select
            onChange={this.onMoveToCardChange}
            value={this.state.moveToCardId}
          >
            {this.availableColumns.map(c =>
              <option key={c.id} value={c.id}>{c.name}</option>
            )}
          </select>
          <button
              onClick={this.onMoveCardClick}
          >
              Move card
          </button>
        </div>
    );
  }
}

export default MoveToCardSelect;
