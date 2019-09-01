import React, { SyntheticEvent } from 'react';
import { Column } from '../../reducers/columns';
import Modal from 'react-responsive-modal';
import { Card as CardItem } from '../../reducers/columns';
import { useDrag } from 'react-dnd';
import './index.scss';
import { ITEM_TYPES } from '../../constants';
import MoveToCardSelect from '../MoveToCardSelect';
import { Link } from 'react-router-dom';
import RenameCardInColumn from '../RenameCardInColumn';

interface IProps {
  columns: Column[];
  column: Column;
  card: CardItem;
  isModalOpened: boolean;
  description: string;

  moveCard(fromColumnId: string, toColumnId: string, id: string): void;

  // renameCard(columnId: number, id: string, name: string): void;
  onRemoveCardClick(): void;

  onCloseModal(): void;
  onDescriptionChange(e: SyntheticEvent): void;
  onSaveDescriptionClick(): void;
  setErrorMessage(message: string): void;
  renameCard(columnId: string, id: string, name: string): void;
}

const Card: React.FunctionComponent<IProps> =
  ({
     columns,
     column,
     card,
     moveCard,
     onCloseModal,
     isModalOpened,
     onDescriptionChange,
     description,
     onSaveDescriptionClick,
     onRemoveCardClick,
     setErrorMessage,
     renameCard,
   }) => {
    const [{
      isDragging,
    }, drag] = useDrag({
      item: {
        type: ITEM_TYPES.CARD,
        column: column,
        card: card,
      },
      collect: monitor => ({
        isDragging: monitor.isDragging(),
      }),
    });

    const DeleteCard = (
      <button
        onClick={onRemoveCardClick}
      >
        X
      </button>
    );

    return (
      <div
        className='ah-card'
        ref={drag}
      >
        <RenameCardInColumn
          column={column}
          card={card}
          renameCard={renameCard}
          setErrorMessage={setErrorMessage}
        />

        <Link to={`/boards/${column.boardId}/cards/${card.id}`}>{card.name}</Link>

        <Modal
          open={isModalOpened}
          onClose={onCloseModal}
          center
        >
          <h5>Column: {column.name}</h5>
          {card.name}

          <div>
            cr: {new Date(card.createdAt).toLocaleString()}
          </div>
          <div>
            upd: {new Date(card.updatedAt).toLocaleString()}
          </div>

          <MoveToCardSelect
            columns={columns}
            column={column}
            card={card}
            moveCard={moveCard}
          />

          <textarea onChange={onDescriptionChange} value={description} />
          <button onClick={onSaveDescriptionClick}>Save</button>

          {DeleteCard}

        </Modal>

        {DeleteCard}
      </div>
    );
  };

export default Card;
