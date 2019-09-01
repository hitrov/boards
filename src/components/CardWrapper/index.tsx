import React, { SyntheticEvent } from 'react';
import { Column } from '../../reducers/columns';
import { Card as CardItem } from '../../reducers/columns';
import Card from '../Card';
import { RouteComponentProps } from 'react-router';
import { withRouter } from 'react-router-dom';
import { MoveToColumnOption } from '../MoveToCardSelect';

interface RouteParams {
  cardId?: string;
}

interface IProps extends RouteComponentProps<RouteParams> {
  moveToColumnsOptions: MoveToColumnOption[];
  column: Column;
  card: CardItem;

  moveCard(fromColumnId: string, toColumnId: string, id: string): void;

  removeCard(columnId: string, id: string): void;

  changeCardDescription(columnId: string, id: string, description: string): void;

  setErrorMessage(message: string): void;

  renameCard(columnId: string, id: string, name: string): void;
}

interface IState {
  description: string;
  name: string;
  inPlaceRenameInProgress: boolean;
}

class CardWrapper extends React.PureComponent<IProps, IState> {
  public readonly state: Readonly<IState> = {
    description: '',
    name: '',
    inPlaceRenameInProgress: false,
  };

  componentWillMount(): void {
    this.setState({
      description: this.props.card.description,
      name: this.props.card.name,
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

  onNameChange = (e: SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    this.setState({
      name: target.value,
    });
  };

  toggleInPlaceRename = () => {
    this.setState(prevState => ({
      inPlaceRenameInProgress: !prevState.inPlaceRenameInProgress,
    }));
  };

  onSaveDescriptionClick = () => {
    this.props.changeCardDescription(this.props.column.id, this.props.card.id, this.state.description);
  };

  onSaveNameClick = () => {
    this.setState({
      inPlaceRenameInProgress: false,
    }, () => this.props.renameCard(this.props.column.id, this.props.card.id, this.state.name));
  };

  onRemoveCardClick = () => {
    this.props.removeCard(this.props.column.id, this.props.card.id);
  };

  render() {
    return (
      <Card
        isModalOpened={this.props.match.params.cardId === this.props.card.id}
        moveToColumnsOptions={this.props.moveToColumnsOptions}
        column={this.props.column}
        card={this.props.card}
        moveCard={this.props.moveCard}
        onRemoveCardClick={this.onRemoveCardClick}
        onCloseModal={this.onCloseModal}
        onDescriptionChange={this.onDescriptionChange}
        description={this.state.description}
        onSaveDescriptionClick={this.onSaveDescriptionClick}
        renameCard={this.props.renameCard}
        setErrorMessage={this.props.setErrorMessage}
        onNameChange={this.onNameChange}
        onSaveNameClick={this.onSaveNameClick}
        toggleInPlaceRename={this.toggleInPlaceRename}
        inPlaceRenameInProgress={this.state.inPlaceRenameInProgress}
        temporaryName={this.state.name}
      />
    )
  }
}

export default withRouter(CardWrapper);
