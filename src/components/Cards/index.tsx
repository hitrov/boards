import React, { SyntheticEvent } from 'react';
import { Column } from '../../reducers/columns';
import CardWrapper from '../CardWrapper';
import { MoveToColumnOption } from '../MoveToCardSelect';
import './index.scss';
import { MdNoteAdd } from 'react-icons/md';

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

// TODO: escape/enter onkeyup
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

  getMoveToColumnsOptions = () => {
    return this.props.columns
      .filter(c => c.id !== this.props.column.id && c.boardId === this.props.column.boardId)
      .map(c => ({
        id: c.id,
        name: c.name,
      } as MoveToColumnOption))
  };

  render() {
    return (
      <div>
        {this.props.column.cards.map(card =>
          <CardWrapper
            key={card.id}
            card={card}
            moveToColumnsOptions={this.getMoveToColumnsOptions()}
            column={this.props.column}
            moveCard={this.props.moveCard}
            removeCard={this.props.removeCard}
            changeCardDescription={this.props.changeCardDescription}
            setErrorMessage={this.props.setErrorMessage}
            renameCard={this.props.renameCard}
          />)}

        <div className='ah-add-card-wrapper'>
          <input
            onChange={this.onAddCardNameChange}
            value={this.state.name}
            placeholder='New card name'
          />
          <span
            onClick={this.onAddCardClick}
            className='ah-icon'
          >
            <MdNoteAdd/>
          </span>
        </div>

      </div>
    );
  }
}


export default Cards;
