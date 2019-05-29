import reducer, { GET_DOGS } from '../../modules/dogs';

describe('dogs reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      count: 0,
      dogs: []
    });
  });

  it('should load dogs on GET_DOGS', () => {
    expect(
      reducer(
        {
          count: 0,
          dogs: []
        },
        {
          type: GET_DOGS,
          payload: ['some-dog-url', 'another-dog-url']
        }
      )
    ).toEqual({
      count: 0,
      dogs: ['some-dog-url', 'another-dog-url']
    });
  });
});
