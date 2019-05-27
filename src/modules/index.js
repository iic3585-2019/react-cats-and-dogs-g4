import { combineReducers } from 'redux';
import counter from './counter';
import dogs from './dogs';
import cats from './cats';
import favorites from './favorites';
import game from './game';

export default combineReducers({
  counter,
  dogs,
  cats,
  favorites,
  game,
});
