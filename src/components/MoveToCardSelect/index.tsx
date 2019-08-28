import React from 'react';
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

  availableColumns: Column[];

  constructor(props: IProps) {
    super(props);

    this.availableColumns = props.columns
      .filter(c => c.id !== props.column.id);
  }

  componentWillMount(): void {
    if (this.availableColumns.length) {
      this.setState({
        moveToCardId: this.availableColumns[0].id,
      })
    }
  }

  onMoveCardClick = () => {
    this.props.moveCard(this.props.column.id, this.state.moveToCardId, this.props.card.id);
  };

  onMoveToCardChange = (e: any) => {
    const moveToCardId = e.target.value;

    this.setState({
      moveToCardId,
    });
  };

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
