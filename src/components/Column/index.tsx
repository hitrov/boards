import React, { SyntheticEvent } from 'react';
import { Column as ColumnItem } from '../../reducers/columns';
import CardsContainer from '../../containers/CardsContainer';
import { DropTargetMonitor, useDrop } from 'react-dnd';
import { ITEM_TYPES } from '../../constants';
import './index.scss';
import { MdModeEdit, MdDeleteForever, MdCheck, MdCancel } from "react-icons/md";

interface IProps {
  column: ColumnItem;

  addColumn(name: string, boardId: string): void;
  renameColumn(id: string, name: string): void;
  removeColumn(id: string): void;

  onEditColumnClick(id: string): () => void;
  onRenameColumnChange(id: string): (e: SyntheticEvent) => void;
  displayEditName(id: string): boolean;
  getTemporaryNameStateValue(id: string): string;
  onRenameColumnClick(id: string): () => void;
  onCancelRenameColumnClick(id: string): () => void;
  moveCard(fromColumnId: string, toColumnId: string, id: string): void;
}

const cd = (item: any, monitor: DropTargetMonitor): boolean => {
  // console.log('item', item);
  // console.log('monitor', monitor);
  return true;
};

const Column: React.FunctionComponent<IProps> =
  ({
     column,
     removeColumn,
     onEditColumnClick,
     onRenameColumnChange,
     displayEditName,
     getTemporaryNameStateValue,
     onRenameColumnClick,
     onCancelRenameColumnClick,
     moveCard,
   }) => {
    const [{
      isOver,
      canDrop,
    }, drop] = useDrop({
      accept: ITEM_TYPES.CARD,
      drop: (item: any, monitor: DropTargetMonitor) => {
        console.log('dropped item:', item);
        // return {
        //   column,
        // }
        moveCard(item.column.id, column.id, item.card.id);
      },
      canDrop: cd,

      collect: monitor => ({
        isOver: monitor.isOver(),
        // getItemType: monitor.getItemType(),
        // getItem: monitor.getItem(),
        canDrop: monitor.canDrop(),
      }),
    });

    // console.log('canDrop', canDrop);

  return (
    <div ref={drop} className={`ah-column ah-shape ${isOver ? 'ah-is-over-column' : ''}`}>
      {!displayEditName(column.id) &&
      <span className='ah-icon' onClick={onEditColumnClick(column.id)}>
        {column.name}
        <MdModeEdit />
      </span>}

      {displayEditName(column.id) && <div>
          <input
            onChange={onRenameColumnChange(column.id)}
            value={getTemporaryNameStateValue(column.id)}
          />
          <span
            onClick={onRenameColumnClick(column.id)}
            className='ah-icon'
          >
            <MdCheck />
          </span>
          <span
            onClick={onCancelRenameColumnClick(column.id)}
            className='ah-icon'
          >
            <MdCancel />
          </span>
      </div>}

      <span
        onClick={() => removeColumn(column.id)}
        className='ah-remove ah-icon'
      >
        <MdDeleteForever />
      </span>

      <CardsContainer
        column={column}
      />
    </div>
  );
};


export default Column;
