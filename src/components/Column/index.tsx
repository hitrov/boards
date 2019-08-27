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
}

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
   }) => {
    const [{
      isOver,
      canDrop: canD,
    }, drop] = useDrop({
      accept: ITEM_TYPES.CARD,
      drop: console.log,
      canDrop: (item: any, monitor: DropTargetMonitor) => {
        console.log('item', item);
        // console.log('monitor', monitor);
        return true;
      },

      collect: monitor => ({
        isOver: monitor.isOver(),
        // getItemType: monitor.getItemType(),
        // getItem: monitor.getItem(),
        canDrop: monitor.canDrop(),
      }),
    });

    console.log('isOver', isOver);
    console.log('canD', canD);

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
