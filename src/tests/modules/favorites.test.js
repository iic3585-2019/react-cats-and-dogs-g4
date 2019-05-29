import reducer, {
  ADD_FAVORITE,
  REMOVE_FAVORITE
} from '../../modules/favorites';

describe('favorite reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      favorites: []
    });
  });

  it('should add favorite after ADD_FAVORITE', () => {
    expect(
      reducer(
        {
          favorites: []
        },
        {
          type: ADD_FAVORITE,
          payload: {
            url: 'some-url',
            animal: 'dog',
            id: 1
          }
        }
      )
    ).toEqual({
      favorites: [
        {
          url: 'some-url',
          animal: 'dog',
          id: 1
        }
      ]
    });
  });

  it('should remove favorite after REMOVE_FAVORITE', () => {
    expect(
      reducer(
        {
          favorites: [
            {
              url: 'some-url',
              animal: 'dog',
              id: 1
            }
          ]
        },
        {
          type: REMOVE_FAVORITE,
          payload: 1
        }
      )
    ).toEqual({
      favorites: []
    });
  });
});
