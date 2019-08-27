import React from 'react';
import { Column } from '../../reducers/columns';
import Modal from 'react-responsive-modal';
import { Card as CardItem } from '../../reducers/columns';
import './index.scss';

interface IProps {
  columns: Column[];
  column: Column;
  card: CardItem;
  moveCard(fromColumnId: string, toColumnId: string, id: string): void;
  // renameCard(columnId: number, id: string, name: string): void;
  removeCard(columnId: string, id: string): void;
}

interface IState {
  moveToCardId: string;
  isModalOpened: boolean;
}

class Card extends React.PureComponent<IProps, IState> {
  public readonly state: Readonly<IState> = {
    moveToCardId: '',
    isModalOpened: false,
  };

  onMoveToCardChange = (e: any) => {
    const moveToCardId = e.target.value;

    this.setState({
      moveToCardId,
    });
  };

  onMoveCardClick = (toColumnId: string, id: string) => () => {
    this.props.moveCard(this.props.column.id, toColumnId, id);
  };

  toggleModal = () => {
    this.setState(prevState => ({
      isModalOpened: !prevState.isModalOpened,
    }));
  };

  onCardNameClick = (id: string) => () => {
    this.toggleModal();
  };

  render() {
    return (
      <div className='ah-card'>
        <Modal
          open={this.state.isModalOpened}
          onClose={this.toggleModal}
          center
        >
          {this.props.card.name}
          <select
            onChange={this.onMoveToCardChange}
            value={this.state.moveToCardId}
          >
            {this.props.columns
              .filter(c => c.id !== this.props.column.id)
              .map(c =>
                <option key={c.id} value={c.id}>{c.name}</option>
              )
            }
          </select>
          <button
            onClick={this.onMoveCardClick(this.state.moveToCardId, this.props.card.id)}
          >
            Move card
          </button>
        </Modal>
        
        <div
          onClick={this.onCardNameClick(this.props.card.id)}
        >
          {this.props.card.name}
        </div>

        {this.props.children}
      </div>
    )
  }
}

export default Card;
