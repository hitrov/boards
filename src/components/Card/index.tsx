import React, { SyntheticEvent } from 'react';
import { Column } from '../../reducers/columns';
import Modal from 'react-responsive-modal';
import { Card as CardItem } from '../../reducers/columns';
import { useDrag } from 'react-dnd';
import './index.scss';
import { ITEM_TYPES } from '../../constants';
import MoveToCardSelect, { MoveToColumnOption } from '../MoveToCardSelect';
import { Link } from 'react-router-dom';
import RenameCardInColumn from '../RenameCardInColumn';
import { MdDeleteForever, MdEdit, MdCheck, MdCancel } from 'react-icons/md';

interface IProps {
  moveToColumnsOptions: MoveToColumnOption[];
  column: Column;
  card: CardItem;
  isModalOpened: boolean;
  description: string;
  temporaryName: string;
  inPlaceRenameInProgress: boolean;

  moveCard(fromColumnId: string, toColumnId: string, id: string): void;

  // renameCard(columnId: number, id: string, name: string): void;
  onRemoveCardClick(): void;

  onCloseModal(): void;
  onDescriptionChange(e: SyntheticEvent): void;
  onNameChange(e: SyntheticEvent): void;
  onSaveDescriptionClick(): void;
  onSaveNameClick(): void;
  setErrorMessage(message: string): void;
  renameCard(columnId: string, id: string, name: string): void;
  toggleInPlaceRename(): void;
}

const Card: React.FunctionComponent<IProps> =
  ({
     moveToColumnsOptions,
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
     inPlaceRenameInProgress,
     toggleInPlaceRename,
     onNameChange,
     onSaveNameClick,
     temporaryName,
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
      <span
        onClick={onRemoveCardClick}
        className='ah-remove ah-icon'
      >
        <MdDeleteForever />
      </span>
    );

    return (
      <div
        className='ah-card ah-shape'
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
          classNames={{
            modal: 'ah-modal-container',
          }}
        >
          <h5>Column: {column.name}</h5>

          {!inPlaceRenameInProgress &&
          <>
            {card.name}
            <span onClick={toggleInPlaceRename}>
            <MdEdit />
          </span>
          </>}

          {inPlaceRenameInProgress &&
          <>
            <input type="text" onChange={onNameChange} value={temporaryName} />
            <span onClick={onSaveNameClick}><MdCheck /></span>
            <span onClick={toggleInPlaceRename}><MdCancel /></span>
          </>}

          <div>
            cr: {new Date(card.createdAt).toLocaleString()}
          </div>
          <div>
            upd: {new Date(card.updatedAt).toLocaleString()}
          </div>

          <MoveToCardSelect
            moveToColumnsOptions={moveToColumnsOptions}
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
