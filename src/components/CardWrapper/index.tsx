import React, { SyntheticEvent } from 'react';
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
  changeCardDescription(columnId: string, id: string, description: string): void;
  setErrorMessage(message: string): void;
}

interface IState {
  description: string;
}

class CardWrapper extends React.PureComponent<IProps, IState> {
  public readonly state: Readonly<IState> = {
    description: '',
  };

  componentWillMount(): void {
    this.setState({
      description: this.props.card.description,
    });
  }

  onCloseModal = () => {
    this.props.history.push(`/boards/${this.props.column.boardId}/cards`)
  };

  onDescriptionChange = (e: SyntheticEvent) => {
    const target = e.target as HTMLTextAreaElement;
    this.setState({
      description: target.value,
    });
  };

  onSaveDescriptionClick = () => {
    this.props.changeCardDescription(this.props.column.id, this.props.card.id, this.state.description);
  };

  onRemoveCardClick = () => {
    this.props.removeCard(this.props.column.id, this.props.card.id);
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
        onRemoveCardClick={this.onRemoveCardClick}
        onCloseModal={this.onCloseModal}
        onDescriptionChange={this.onDescriptionChange}
        description={this.state.description}
        onSaveDescriptionClick={this.onSaveDescriptionClick}
      >
        {this.props.children}
      </Card>
    )
  }
}

export default withRouter(CardWrapper);
