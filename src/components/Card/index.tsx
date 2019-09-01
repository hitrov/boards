import React, { SyntheticEvent } from 'react';
import { Column } from '../../reducers/columns';
import Modal from 'react-responsive-modal';
import { Card as CardItem } from '../../reducers/columns';
import { DragSource, ConnectDragSource, DragSourceMonitor, DragSourceConnector } from 'react-dnd';
import './index.scss';
import { ITEM_TYPES } from '../../constants';
import MoveToCardSelect, { MoveToColumnOption } from '../MoveToCardSelect';
import { Link } from 'react-router-dom';
import RenameCardInColumn from '../RenameCardInColumn';
import { MdDeleteForever, MdEdit, MdCheck, MdCancel, MdAccessTime, MdUpdate } from 'react-icons/md';

interface IProps {
  moveToColumnsOptions: MoveToColumnOption[];
  column: Column;
  card: CardItem;
  isModalOpened: boolean;
  description: string;
  temporaryName: string;
  inPlaceRenameInProgress: boolean;
  connectDragSource: ConnectDragSource;

  moveCard(fromColumnId: string, toColumnId: string, id: string): void;

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

     // These props are injected by React DnD,
     // as defined by your `collect` function above:
     connectDragSource,
   }) => {

    const DeleteCard = (
      <span
        onClick={onRemoveCardClick}
        className='ah-remove ah-icon'
      >
        <MdDeleteForever/>
      </span>
    );

    return connectDragSource(<div
      className='ah-card ah-shape'
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

        <MoveToCardSelect
          moveToColumnsOptions={moveToColumnsOptions}
          column={column}
          card={card}
          moveCard={moveCard}
        />

        {!inPlaceRenameInProgress &&
        <>
            <h4>
              {card.name}
                <span onClick={toggleInPlaceRename}>
                <MdEdit/>
              </span>
            </h4>
        </>}

        {inPlaceRenameInProgress &&
        <>
            <input className='ah-in-place-rename-input' type="text" onChange={onNameChange} value={temporaryName}/>
            <span className='ah-icon' onClick={onSaveNameClick}><MdCheck/></span>
            <span className='ah-icon' onClick={toggleInPlaceRename}><MdCancel/></span>
        </>}

        <div>
          <textarea className='ah-card-description' onChange={onDescriptionChange} value={description}/>
          <button className='ah-card-save' onClick={onSaveDescriptionClick}>Save</button>
        </div>

        <div className='ah-time'>
          <div>
            <MdAccessTime/>
            {new Date(card.createdAt).toLocaleString()}
          </div>
          <div>
            <MdUpdate/>
            {new Date(card.updatedAt).toLocaleString()}
          </div>
        </div>

        {DeleteCard}

      </Modal>

      {DeleteCard}
    </div>);
  };

/**
 * Specifies the drag source contract.
 * Only `beginDrag` function is required.
 */
const cardSource = {
  beginDrag(props: IProps) {
    // Return the data describing the dragged item
    const {card, column} = props;
    return {
      card,
      column
    };
  },
};

/**
 * Specifies which props to inject into your component.
 */
function collect(connect: DragSourceConnector, monitor: DragSourceMonitor) {
  return {
    // Call this function inside render()
    // to let React DnD handle the drag events:
    connectDragSource: connect.dragSource(),
    // You can ask the monitor about the current drag state:
    isDragging: monitor.isDragging(),
  }
}

export default DragSource(ITEM_TYPES.CARD, cardSource, collect)(Card);
