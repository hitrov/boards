import React from 'react';
import { Column } from '../../reducers/columns';
import { Card as CardItem } from '../../reducers/columns';
import Card from '../../components/Card';

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

class CardContainer extends React.PureComponent<IProps, IState> {
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

  onMoveCardClick = (id: string) => () => {
    this.props.moveCard(this.props.column.id, this.state.moveToCardId, id);
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
        moveToCardId={this.state.moveToCardId}
        columns={this.props.columns}
        column={this.props.column}
        card={this.props.card}
        moveCard={this.props.moveCard}
        onMoveCardClick={this.onMoveCardClick}
        onMoveToCardChange={this.onMoveToCardChange}
        removeCard={this.props.removeCard}
        toggleModal={this.toggleModal}
      >
        {this.props.children}
      </Card>
    )
  }
}

export default CardContainer;
