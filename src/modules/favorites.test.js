import reducer, { ADD_FAVORITE } from './favorites';

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
          favorites: ['already-favorite']
        },
        {
          type: ADD_FAVORITE,
          payload: 'some-dog-or-cat-url'
        }
      )
    ).toEqual({
      favorites: ['already-favorite', 'some-dog-or-cat-url']
    });
  });
});
