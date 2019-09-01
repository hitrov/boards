import React, { SyntheticEvent } from 'react';
import { Column } from '../../reducers/columns';
import CardWrapper from '../CardWrapper';
import './index.scss';

interface IProps {
  columns: Column[];
  column: Column;
  addCard(columnId: string, name: string): void;
  moveCard(fromColumnId: string, toColumnId: string, id: string): void;
  renameCard(columnId: string, id: string, name: string): void;
  removeCard(columnId: string, id: string): void;
  changeCardDescription(columnId: string, id: string, description: string): void;
  setErrorMessage(message: string): void;
}

interface IState {
  name: string;
}

// TODO: rename card separate component
class Cards extends React.PureComponent<IProps> {
  public readonly state: Readonly<IState> = {
    name: '',
  };

  onAddCardNameChange = (e: SyntheticEvent) => {
    const name = (e.target as HTMLInputElement).value;

    this.setState({
      name,
    });
  };

  onAddCardClick = () => {
    const newName = this.state.name;

    if (newName === '') {
      this.props.setErrorMessage('Card name is required.');
      return;
    }

    this.props.addCard(this.props.column.id, newName);

    this.setState({
      name: '',
    });
  };

  render() {
    return (
      <div className='ah-column'>
        {this.props.column.cards.map(card =>
          <CardWrapper
            key={card.id}
            card={card}
            moveToColumnsOptions={this.props.columns.filter(c => c.id !== this.props.column.id)}
            column={this.props.column}
            moveCard={this.props.moveCard}
            removeCard={this.props.removeCard}
            changeCardDescription={this.props.changeCardDescription}
            setErrorMessage={this.props.setErrorMessage}
            renameCard={this.props.renameCard}
          />)}

        <div>
          <input
            onChange={this.onAddCardNameChange}
            value={this.state.name}
            placeholder='Name'
          />
          <button
            onClick={this.onAddCardClick}
          >
            Add card
          </button>
        </div>

      </div>
    );
  }
}


export default Cards;
