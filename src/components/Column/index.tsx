import React from 'react';
import { Column as ColumnItem } from '../../reducers/columns';
import CardsContainer from '../../containers/CardsContainer';

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
  return (
    <div>
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
