export const GET_BREEDS = 'GET_BREEDS';
export const SELECT_ANIMAL = 'SELECT_ANIMAL';
export const SELECT_BREED = 'SELECT_BREED';
export const GAME_START = 'GAME_START';
export const GAME_OVER = 'GAME_OVER';

const cat_url = 'https://api.thecatapi.com/v1/';
const dog_url = 'https://dog.ceo/api/';

const initialState = {
  animals: [],
  breeds: {
    cats: [],
    dogs: [],
  },
  animalSelected: 'dog',
  breedSelected: '',
  playing: false,
};

export default (state = initialState, action) => {
  const { payload, type } = action;
  switch (type) {
    case GET_BREEDS:
      return {
        ...state,
        breeds: {
          cats: [...payload.cats],
          dogs: [...payload.dogs],
        },
      };

    case SELECT_ANIMAL:
      return {
        ...state,
        animalSelected: payload
      };

    case SELECT_BREED:
      return {
        ...state,
        breedSelected: payload
      };

    case GAME_START:
      return {
        ...state,
        playing: true,
      };
    
    case GAME_OVER:
      return {
        ...state,
        playing: false,
      };

    default:
      return {
        ...state
      };
  }
};

export const getBreeds = () => async dispatch => {

  const cats = await fetch(cat_url+'breeds')
    .then(res => res.json())
    .then(data => data.map(cat => ({id: cat.id, name: cat.name})));
  
    
  const dogs = await fetch(dog_url+'breeds/list/all')
    .then(res => res.json())
    .then(data => Object.keys(data.message).map(dog => (
      {id: dog, name: dog}))
    );

  return dispatch({
    type: GET_BREEDS,
    payload: {cats, dogs},
  });
}

export const selectAnimal = (animal) => async dispatch => {
  return dispatch({
    type: SELECT_ANIMAL,
    payload: animal,
  });
};

export const selectBreed = (breed) => async dispatch => {
  return dispatch({
    type: SELECT_BREED,
    payload: breed,
  });
};

export const startGame = () => async dispatch => {
  
  return dispatch({
    type: GAME_START,
  });
  
};

export const endGame = () => async dispatch => {
  return dispatch({
    type: GAME_OVER,
  });
};