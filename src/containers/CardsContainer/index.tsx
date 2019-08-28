import Cards from '../../components/Cards';
import {connect} from 'react-redux';
import {
  addCard,
  moveCard,
  removeCard,
  renameCard,
} from '../../actions';
import { RootState } from '../../reducers';

const CardsContainer = connect((state: RootState) => ({
  columns: state.columns,
}), {
  addCard,
  moveCard,
  removeCard,
  renameCard,
})(Cards);

export default CardsContainer;
