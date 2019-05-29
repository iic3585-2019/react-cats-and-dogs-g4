export const GET_CATS = 'cats/GET_CATS';

const initialState = {
  cats: []
};

export default (state = initialState, action) => {
  const { payload, type } = action;
  switch (type) {
    case GET_CATS:
      return {
        ...state,
        cats: [...state.cats, ...payload]
      };

    default:
      return {
        ...state
      };
  }
};

export const fetchCats = () => async dispatch => {
  const url = 'https://api.thecatapi.com/v1/images/search/?limit=18';
  const response = await fetch(url).then(res => res.json());

  const cats = response.map(e => [e.url, e.id]);

  return dispatch({
    type: GET_CATS,
    payload: cats
  });
};
