export const GET_DOGS = 'dogs/GET_DOGS';

const initialState = {
  count: 0,
  loading: true,
  dogs: []
};

export default (state = initialState, action) => {
  const { payload, type } = action;
  switch (type) {
    case GET_DOGS:
      return {
        ...state,
        loading: false,
        dogs: [...state.dogs, ...payload]
      };

    default:
      return {
        ...state
      };
  }
};

export const fetchDogs = () => async dispatch => {
  const response = await fetch(
    'https://dog.ceo/api/breeds/image/random/9'
  ).then(res => res.json());

  const dogs = response.message;

  return dispatch({
    type: GET_DOGS,
    payload: dogs
  });
};
