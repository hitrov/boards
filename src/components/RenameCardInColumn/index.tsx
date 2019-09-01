import React, { PureComponent, SyntheticEvent } from 'react';
import { Card, Column } from '../../reducers/columns';
import { MdModeEdit, MdCheck, MdCancel } from "react-icons/md";

interface IProps {
  column: Column;
  card: Card;
  renameCard(columnId: string, id: string, name: string): void;
  setErrorMessage(message: string): void;
}

interface IState {
  name: string;
  renamingCards: {
    id: string;
    name: string;
  }[],
}

class RenameCardInColumn extends PureComponent<IProps, IState> {
  public readonly state: Readonly<IState> = {
    name: '',
    renamingCards: [],
  };

  displayEditName = (id: string): boolean => {
    return this.state.renamingCards.find(c => c.id === id) !== undefined;
  };

  onEditCardClick = (id: string) => () => {
    const c = this.props.column.cards.find(c => c.id === id);
    if (!c) {
      return;
    }

    const currentName = c.name;

    this.setState(prevState => ({
      renamingCards: [
        ...prevState.renamingCards.filter(c => c.id !== id),
        {
          id,
          name: currentName,
        },
      ],
    }));
  };

  onRenameCardChange = (id: string) => (e: SyntheticEvent) => {
    const newName = (e.target as HTMLInputElement).value;

    this.setState(prevState => ({
      renamingCards: [
        ...prevState.renamingCards.filter(c => c.id !== id),
        {
          id,
          name: newName,
        },
      ],
    }));
  };

  getTemporaryNameStateValue = (id: string): string => {
    const column = this.state.renamingCards.find(c => c.id === id);
    if (!column) {
      return '';
    }
    return column.name;
  };

  onRenameCardClick = (id: string) => () => {
    const c = this.state.renamingCards.find(c => c.id === id);
    if (!c) {
      return;
    }

    const newName = c.name;

    if (newName === '') {
      this.props.setErrorMessage('Card name is required.');
      return;
    }

    this.setState(prevState => ({
      renamingCards: prevState.renamingCards.filter(c => c.id !== id),
    }), () => this.props.renameCard(this.props.column.id, id, newName));
  };

  onCancelRenameCardClick = (id: string) => () => {
    this.setState(prevState => ({
      renamingCards: prevState.renamingCards.filter(c => c.id !== id),
    }));
  };

  render() {
    const { card } = this.props;

    return (
      <div>
        <span className='ah-icon' onClick={this.onEditCardClick(card.id)}>
          <MdModeEdit />
        </span>

        {this.displayEditName(card.id) && <div>
            <input
              onChange={this.onRenameCardChange(card.id)}
              value={this.getTemporaryNameStateValue(card.id)}
            />
            <span
              onClick={this.onRenameCardClick(card.id)}
              className='ah-icon'
            >
              <MdCheck />
            </span>
            <span
              onClick={this.onCancelRenameCardClick(card.id)}
              className='ah-icon'
            >
              <MdCancel />
            </span>
        </div>}
      </div>
    );
  }
}

export default RenameCardInColumn;
