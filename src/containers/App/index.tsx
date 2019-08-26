import Boards from '../../components/Boards';
import {connect} from 'react-redux';
import {
  addBoard,
  addColumn,
} from '../../actions';
import {RootState} from '../../reducers';

const App = connect((state: RootState) => ({
  boards: state.boards,
  columns: state.columns,
}), {
  addBoard,
  addColumn,
})(Boards);

export default App;
