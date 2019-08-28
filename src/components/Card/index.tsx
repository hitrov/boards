import React from 'react';
import { Column } from '../../reducers/columns';
import Modal from 'react-responsive-modal';
import { Card as CardItem } from '../../reducers/columns';
import { useDrag } from 'react-dnd';
import './index.scss';
import { ITEM_TYPES } from '../../constants';
import MoveToCardSelect from '../MoveToCardSelect';

interface IProps {
  columns: Column[];
  column: Column;
  card: CardItem;
  isModalOpened: boolean;
  moveCard(fromColumnId: string, toColumnId: string, id: string): void;
  // renameCard(columnId: number, id: string, name: string): void;
  removeCard(columnId: string, id: string): void;
  toggleModal(): void;
}

const Card: React.FunctionComponent<IProps> =
  ({
    columns,
    column,
    card,
    children,
    isModalOpened,
    toggleModal,
    moveCard,
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
      <Modal
        open={isModalOpened}
        onClose={toggleModal}
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

      <div
        onClick={toggleModal}
      >
        {card.name}
      </div>

      {children}
    </div>
  );
};

export default Card;
