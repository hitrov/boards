import React from 'react';
import { Column } from '../../reducers/columns';
import Modal from 'react-responsive-modal';
import { Card as CardItem } from '../../reducers/columns';
import { useDrag } from 'react-dnd';
import './index.scss';
import { ITEM_TYPES } from '../../constants';

interface IProps {
  columns: Column[];
  column: Column;
  card: CardItem;
  isModalOpened: boolean;
  moveToCardId: string;
  moveCard(fromColumnId: string, toColumnId: string, id: string): void;
  // renameCard(columnId: number, id: string, name: string): void;
  removeCard(columnId: string, id: string): void;
  toggleModal(): void;
  onMoveToCardChange(e: any): void;
  onMoveCardClick(moveToCardId: string): () => void;
}

const Card: React.FunctionComponent<IProps> =
  ({
    columns,
    column,
    card,
    children,
    isModalOpened,
    moveToCardId,
    toggleModal,
    onMoveToCardChange,
    onMoveCardClick,
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
        <select
          onChange={onMoveToCardChange}
          value={moveToCardId}
        >
          {columns
            .filter(c => c.id !== column.id)
            .map(c =>
              <option key={c.id} value={c.id}>{c.name}</option>
            )
          }
        </select>
        <button
          onClick={onMoveCardClick(card.id)}
        >
          Move card
        </button>
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
