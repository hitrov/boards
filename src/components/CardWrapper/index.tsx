import React from 'react';
import { Column } from '../../reducers/columns';
import { Card as CardItem } from '../../reducers/columns';
import Card from '../Card';
import { RouteComponentProps } from 'react-router';
import { withRouter } from 'react-router-dom';

interface RouteParams {
  cardId?: string;
}

interface IProps extends RouteComponentProps<RouteParams> {
  columns: Column[];
  column: Column;
  card: CardItem;
  moveCard(fromColumnId: string, toColumnId: string, id: string): void;
  // renameCard(columnId: number, id: string, name: string): void;
  removeCard(columnId: string, id: string): void;
}

class CardWrapper extends React.PureComponent<IProps> {
  onCloseModal = () => {
    this.props.history.push(`/boards/${this.props.column.boardId}/cards`)
  };

  // TODO: handle not found card
  render() {
    return (
      <Card
        isModalOpened={this.props.match.params.cardId === this.props.card.id}
        columns={this.props.columns}
        column={this.props.column}
        card={this.props.card}
        moveCard={this.props.moveCard}
        removeCard={this.props.removeCard}
        onCloseModal={this.onCloseModal}
      >
        {this.props.children}
      </Card>
    )
  }
}

export default withRouter(CardWrapper);
