import Cards from '../../components/Cards';
import {connect} from 'react-redux';
import {
  addCard,
  moveCard,
  removeCard,
  renameCard,
  changeCardDescription,
} from '../../actions';
import { RootState } from '../../reducers';

const CardsContainer = connect((state: RootState) => ({
  columns: state.columns,
}), {
  addCard,
  moveCard,
  removeCard,
  renameCard,
  changeCardDescription,
})(Cards);

export default CardsContainer;
