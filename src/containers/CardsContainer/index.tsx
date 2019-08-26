import Cards from '../Cards';
import {connect} from 'react-redux';
import {
  addCard,
  moveCard,
  removeCard,
  renameCard,
} from '../../actions';

const CardsContainer = connect(null, {
  addCard,
  moveCard,
  removeCard,
  renameCard,
})(Cards);

export default CardsContainer;
