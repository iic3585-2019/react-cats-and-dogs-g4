export const ADD_FAVORITE = 'ADD_FAVORITE';
export const REMOVE_FAVORITE = 'REMOVE_FAVORITE';

const initialState = {
  favorites: []
};

export default (state = initialState, action) => {
  const { payload, type } = action;
  switch (type) {
    case ADD_FAVORITE:
      return {
        ...state,
        favorites: [...state.favorites, payload]
      };

    case REMOVE_FAVORITE:
      const favs = [...state.favorites];
      const filtered_favs = favs.filter(f => f.id !== payload);
      return {
        ...state,
        favorites: [...filtered_favs]
      };

    default:
      return {
        ...state
      };
  }
};

export const addFavorite = (url, animal, id) => async dispatch => {
  return dispatch({
    type: ADD_FAVORITE,
    payload: {url, animal, id},
  });
};

export const removeFavorite = (id) => async dispatch => {
  return dispatch({
    type: REMOVE_FAVORITE,
    payload: id,
  });
}