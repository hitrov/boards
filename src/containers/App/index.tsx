import Boards from '../../components/Boards';
import {connect} from 'react-redux';
import {
  addBoard,
} from '../../actions';
import {RootState} from '../../reducers';

const App = connect((state: RootState) => ({
  boards: state.boards,
}), {
  addBoard,
})(Boards);

export default App;
