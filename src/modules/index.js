import { combineReducers } from 'redux';
import counter from './counter';
import dogs from './dogs';
import cats from './cats';

export default combineReducers({
  counter,
  dogs,
  cats,
});
