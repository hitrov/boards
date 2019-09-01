import React, { SyntheticEvent } from 'react';
import { Column } from '../../reducers/columns';
import Modal from 'react-responsive-modal';
import { Card as CardItem } from '../../reducers/columns';
import { useDrag } from 'react-dnd';
import './index.scss';
import { ITEM_TYPES } from '../../constants';
import MoveToCardSelect from '../MoveToCardSelect';
import { Link } from 'react-router-dom';

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
}

// TODO: display column title
const Card: React.FunctionComponent<IProps> =
  ({
     columns,
     column,
     card,
     children,
     moveCard,
     onCloseModal,
     isModalOpened,
     onDescriptionChange,
     description,
     onSaveDescriptionClick,
     onRemoveCardClick,
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
    return (
      <div
        className='ah-card'
        ref={drag}
      >
        <Link to={`/boards/${column.boardId}/cards/${card.id}`}>{card.name}</Link>

        <Modal
          open={isModalOpened}
          onClose={onCloseModal}
          center
        >
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

          <button onClick={onRemoveCardClick}>Delete</button>

        </Modal>

        {children}
      </div>
    );
  };

export default Card;
