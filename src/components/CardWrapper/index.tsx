import React from 'react';
import { Column } from '../../reducers/columns';
import { Card as CardItem } from '../../reducers/columns';
import Card from '../Card';

interface IProps {
  columns: Column[];
  column: Column;
  card: CardItem;
  moveCard(fromColumnId: string, toColumnId: string, id: string): void;
  // renameCard(columnId: number, id: string, name: string): void;
  removeCard(columnId: string, id: string): void;
}

interface IState {
  isModalOpened: boolean;
}

class CardWrapper extends React.PureComponent<IProps, IState> {
  public readonly state: Readonly<IState> = {
    isModalOpened: false,
  };

  toggleModal = () => {
    this.setState(prevState => ({
      isModalOpened: !prevState.isModalOpened,
    }));
  };

  render() {
    return (
      <Card
        isModalOpened={this.state.isModalOpened}
        columns={this.props.columns}
        column={this.props.column}
        card={this.props.card}
        moveCard={this.props.moveCard}
        removeCard={this.props.removeCard}
        toggleModal={this.toggleModal}
      >
        {this.props.children}
      </Card>
    )
  }
}

export default CardWrapper;
