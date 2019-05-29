import { combineReducers } from 'redux';
import dogs from './dogs';
import cats from './cats';
import favorites from './favorites';
import game from './game';

export default combineReducers({
  dogs,
  cats,
  favorites,
  game
});
