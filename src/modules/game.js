export const GET_BREEDS = 'GET_BREEDS';
export const SELECT_ANIMAL = 'SELECT_ANIMAL';
export const SELECT_BREED = 'SELECT_BREED';
export const FETCH_BREED_IMAGE = 'FETCH_BREED_IMAGE';
export const ADD_ANIMAL = 'ADD_ANIMAL';
export const GAME_START = 'GAME_START';
export const GAME_OVER = 'GAME_OVER';
export const SELECT_IMAGE = 'SELECT_IMAGE';
export const RESET_ANIMALS = 'RESET_ANIMALS';

const cat_url = 'https://api.thecatapi.com/v1/';
const dog_url = 'https://dog.ceo/api/';

const initialState = {
  animals: [],
  selections: [],
  breeds: {
    cats: [],
    dogs: [],
  },
  breedsLoaded: false,
  animalSelected: 'dog',
  breedSelected: 'random',
  playing: false,
  check: false,
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
        breedsLoaded: true,
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

    case ADD_ANIMAL:
      if( state.animals.length === 0 || Math.random() < 1/(state.animals.length)){
        return {
          ...state,
          animals: [...state.animals, payload],
          selections: [...state.selections, false],
        };
      } else {
        return {
          ...state,
          animals: [payload, ...state.animals],
          selections: [...state.selections, false],
        };
      }
    case SELECT_IMAGE:
      let newSelections = [...state.selections];
      newSelections[payload.id] = payload.value;
      return {
        ...state,
        selections: [...newSelections],
      }
    
    case GAME_START:
      return {
        ...state,
        playing: true,
        check: false,
      };
    
    case GAME_OVER:
      return {
        ...state,
        playing: false,
        check: true,
      };
    
    case RESET_ANIMALS:
      return {
        ...state,
        animals: [],
        selections: [],
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

export const addAnimal = (animal) => async dispatch => {
  return dispatch({
    type: ADD_ANIMAL,
    payload: animal,
  });
}

export const startGame = () => async dispatch => {
  return dispatch({
    type: GAME_START,
  });
};

export const resetAnimals = () => async dispatch => {
  return dispatch({
    type: RESET_ANIMALS,
  });
};

export const endGame = () => async dispatch => {
  return dispatch({
    type: GAME_OVER,
  });
};

export const fetchBreedImage = (animal, breedId) => async dispatch => {
  let selected;
  if(animal === "cat"){
    selected = await fetch('https://api.thecatapi.com/v1/images/search?breed_id='+breedId, {mode: 'cors'} )
      .then(res => res.json())
      .then(cat => ({breed: breedId, url: cat[0].url}));
  } else {
    selected = await fetch('https://dog.ceo/api/breed/'+breedId+'/images/random', {mode: 'cors'})
      .then(res => res.json())
      .then(dog => ({breed: breedId, url: dog.message}));
  }

  return dispatch({
    type: ADD_ANIMAL,
    payload: selected,
  });

};


export const selectImage = (id, value) => async dispatch => {
  return dispatch({
    type: SELECT_IMAGE,
    payload: {
      id,
      value,
    }
  });
};
