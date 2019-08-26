import React from 'react';
import { Column } from '../../reducers/columns';
import Card from '../Card';

interface IProps {
  columns: Column[];
  column: Column;
  addCard(columnId: string, name: string): void;
  moveCard(fromColumnId: string, toColumnId: string, id: string): void;
  renameCard(columnId: string, id: string, name: string): void;
  removeCard(columnId: string, id: string): void;
}

interface IState {
  name: string;
  renamingCards: {
    id: string;
    name: string;
  }[],
}

class Cards extends React.PureComponent<IProps, IState> {
  public readonly state: Readonly<IState> = {
    name: '',
    renamingCards: [],
  };

  onAddCardNameChange = (e: any) => {
    const name = e.target.value;

    this.setState({
      name,
    });
  };

  onRenameCardChange = (id: string) => (e: any) => {
    const newName = e.target.value;

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

  onRenameCardClick = (id: string) => () => {
    const c = this.state.renamingCards.find(c => c.id === id);
    if (!c) {
      return;
    }

    const newName = c.name;

    this.setState(prevState => ({
      renamingCards: prevState.renamingCards.filter(c => c.id !== id),
    }), () => this.props.renameCard(this.props.column.id, id, newName));
  };

  onEditCardClick = (id: string) => () => {
    const c = this.props.column.cards.find(c => c.id === id);
    if (!c) {
      return;
    }

    const oldName = c.name;

    this.setState(prevState => ({
      renamingCards: [
        ...prevState.renamingCards.filter(c => c.id !== id),
        {
          id,
          name: oldName,
        },
      ],
    }));
  };

  onCancelRenameCardClick = (id: string) => () => {
    this.setState(prevState => ({
      renamingCards: prevState.renamingCards.filter(c => c.id !== id),
    }));
  };

  onAddColumn = () => {
    this.props.addCard(this.props.column.id, this.state.name);

    this.setState({
      name: '',
    });
  };

  getTemporaryNameStateValue = (id: string): string => {
    const column = this.state.renamingCards.find(c => c.id === id);
    if (!column) {
      return '';
    }
    return column.name;
  };

  displayEditName = (id: string): boolean => {
    return this.state.renamingCards.find(c => c.id === id) !== undefined;
  };

  render() {
    return (
      <div>
        <div>
          Name:
          <input onChange={this.onAddCardNameChange} value={this.state.name} />
          <button
            onClick={this.onAddColumn}
          >
            Add card
          </button>
        </div>

        <div>
          {this.props.column.cards.map(card =>
            <Card
              key={card.id}
              card={card}
              columns={this.props.columns}
              column={this.props.column}
              moveCard={this.props.moveCard}
              removeCard={this.props.removeCard}
            >
              <button
                onClick={this.onEditCardClick(card.id)}
              >
                Edit card
              </button>

              {this.displayEditName(card.id) && <div>
                <input
                  onChange={this.onRenameCardChange(card.id)}
                  value={this.getTemporaryNameStateValue(card.id)}
                />
                <button
                  onClick={this.onRenameCardClick(card.id)}
                >
                  Rename card
                </button>
                <button
                  onClick={this.onCancelRenameCardClick(card.id)}
                >
                  Cancel rename card
                </button>
              </div>}

              <button
                onClick={() => this.props.removeCard(this.props.column.id, card.id)}
              >
                X
              </button>
            </Card>)}
        </div>
      </div>
    );
  }
}


export default Cards;
