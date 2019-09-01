import React, { SyntheticEvent } from 'react';
import { Column as ColumnItem } from '../../reducers/columns';
import CardsContainer from '../../containers/CardsContainer';
import { DropTargetMonitor, DropTarget, ConnectDropTarget, DropTargetConnector } from 'react-dnd';
import { ITEM_TYPES } from '../../constants';
import './index.scss';
import { MdModeEdit, MdDeleteForever, MdCheck, MdCancel } from 'react-icons/md';
import { RenamingColumn } from '../Columns';

interface IProps {
  column: ColumnItem;
  isOver: boolean;
  connectDropTarget: ConnectDropTarget;
  renamingColumns: RenamingColumn[];

  addColumn(name: string, boardId: string): void;

  renameColumn(id: string, name: string): void;

  removeColumn(id: string): void;

  onEditColumnClick(id: string): () => void;

  onRenameColumnChange(id: string): (e: SyntheticEvent) => void;

  getTemporaryNameStateValue(id: string): string;

  onRenameColumnClick(id: string): () => void;

  onCancelRenameColumnClick(id: string): () => void;

  moveCard(fromColumnId: string, toColumnId: string, id: string): void;
}

const Column: React.FunctionComponent<IProps> =
  ({
     column,
     removeColumn,
     onEditColumnClick,
     onRenameColumnChange,
     renamingColumns,
     getTemporaryNameStateValue,
     onRenameColumnClick,
     onCancelRenameColumnClick,
     connectDropTarget,
     isOver,
   }) => {
    const displayEditName = renamingColumns.find(c => c.id === column.id) !== undefined;

    return connectDropTarget(
      <div className={`ah-column ah-shape ${isOver ? 'ah-is-over-column' : ''}`}>
        {!displayEditName &&
        <div className='ah-column-name-wrapper'>
          {column.name}
          <span className='ah-icon' onClick={onEditColumnClick(column.id)}>
            <MdModeEdit/>
          </span>
        </div>}

        {displayEditName &&
        <div className='ah-column-name-wrapper'>
          <input
              onChange={onRenameColumnChange(column.id)}
              value={getTemporaryNameStateValue(column.id)}
          />
          <span
            onClick={onRenameColumnClick(column.id)}
            className='ah-icon'
          >
            <MdCheck/>
          </span>
          <span
              onClick={onCancelRenameColumnClick(column.id)}
              className='ah-icon'
          >
            <MdCancel/>
          </span>
        </div>}

        <span
          onClick={() => removeColumn(column.id)}
          className='ah-remove ah-icon'
        >
          <MdDeleteForever/>
        </span>

        <CardsContainer
          column={column}
        />
      </div>
    );
  };

/**
 * Specifies the drop target contract.
 * All methods are optional.
 */
const target = {
  drop(props: IProps, monitor: DropTargetMonitor) {
    // Obtain the dragged item
    const item = monitor.getItem();

    props.moveCard(item.column.id, props.column.id, item.card.id);
  },
};

/**
 * Specifies which props to inject into your component.
 */
function collect(connect: DropTargetConnector, monitor: DropTargetMonitor) {
  return {
    // Call this function inside render()
    // to let React DnD handle the drag events:
    connectDropTarget: connect.dropTarget(),
    // You can ask the monitor about the current drag state:
    isOver: monitor.isOver(),
  }
}

export default DropTarget(ITEM_TYPES.CARD, target, collect)(Column);
