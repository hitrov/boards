import React, { SyntheticEvent } from 'react';
import { Column } from '../../reducers/columns';
import { Card as CardItem } from '../../reducers/columns';

export interface MoveToColumnOption {
  id: string;
  name: string;
}

interface IProps {
  moveToColumnsOptions: MoveToColumnOption[];
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

  componentWillMount(): void {
    if (this.props.moveToColumnsOptions.length) {
      this.setState({
        moveToCardId: this.props.moveToColumnsOptions[0].id,
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
    if (!this.props.moveToColumnsOptions.length) {
      return null;
    }

    return (
        <div>
          <select
            onChange={this.onMoveToCardChange}
            value={this.state.moveToCardId}
          >
            {this.props.moveToColumnsOptions.map(c =>
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
