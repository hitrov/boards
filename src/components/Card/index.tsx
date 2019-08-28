import React from 'react';
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

  moveCard(fromColumnId: string, toColumnId: string, id: string): void;

  // renameCard(columnId: number, id: string, name: string): void;
  removeCard(columnId: string, id: string): void;

  onCloseModal(): void;
}

const Card: React.FunctionComponent<IProps> =
  ({
     columns,
     column,
     card,
     children,
     moveCard,
     onCloseModal,
     isModalOpened,
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

          <MoveToCardSelect
            columns={columns}
            column={column}
            card={card}
            moveCard={moveCard}
          />

        </Modal>

        {children}
      </div>
    );
  };

export default Card;
