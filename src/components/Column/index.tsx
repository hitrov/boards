import React from 'react';
import { Column as ColumnItem } from '../../reducers/columns';
import CardsContainer from '../../containers/CardsContainer';
import { DropTargetMonitor, useDrop } from 'react-dnd';
import { ITEM_TYPES } from '../../constants';

interface IProps {
  columns: ColumnItem[];
  column: ColumnItem;

  addColumn(name: string): void;
  renameColumn(id: string, name: string): void;
  removeColumn(id: string): void;

  onEditColumnClick(id: string): () => void;
  onRenameColumnChange(id: string): (e: any) => void;
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
     columns,
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

    // console.log('isOver', isOver);
    // console.log('canDrop', canDrop);

  return (
    <div ref={drop}>
      {column.name}

      <button
        onClick={onEditColumnClick(column.id)}
      >
        Edit
      </button>

      {displayEditName(column.id) && <div>
          <input
              onChange={onRenameColumnChange(column.id)}
              value={getTemporaryNameStateValue(column.id)}
          />
          <button
              onClick={onRenameColumnClick(column.id)}
          >
              Rename
          </button>
          <button
              onClick={onCancelRenameColumnClick(column.id)}
          >
              Cancel
          </button>
      </div>}

      <button
        onClick={() => removeColumn(column.id)}
      >
        X
      </button>

      <CardsContainer
        columns={columns}
        column={column}
      />
    </div>
  );
};


export default Column;
