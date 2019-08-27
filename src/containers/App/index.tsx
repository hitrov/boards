import Boards from '../../components/Boards';
import {connect} from 'react-redux';
import {
  addBoard,
  addColumn,
  renameColumn,
  removeColumn,
  moveCard,
} from '../../actions';
import {RootState} from '../../reducers';

const App = connect((state: RootState) => ({
  boards: state.boards,
  columns: state.columns,
}), {
  addBoard,
  addColumn,
  renameColumn,
  removeColumn,
  moveCard,
})(Boards);

export default App;
