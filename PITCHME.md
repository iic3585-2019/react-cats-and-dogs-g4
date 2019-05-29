---
marp: true
---

# React: Furterest

# ![](images/marp.png)

##### Grupo 4

---

# Puntos principales

- Uso de **Hooks** y componentes como **clases**
- **Tests** con enzyme y jest
- Manejo de estado con **Redux**
- Manejo de router con **React Router**

---

# Tests en Redux

Importaciones necesarias:

```javascript
import reducer, {
  ADD_FAVORITE,
  REMOVE_FAVORITE
} from '../../modules/favorites';
```

Y a testear!

```javascript
describe('favorite reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      favorites: []
    });
  });
```

---

```javascript
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
```

---

## ¿Así de fácil?

### Sí!

- `Reducers` son funciones **puras**
- Son síncronas
- Los `input` y `output` están bien definidos

---

# Test de componentes

### Requerimientos:

```bash
yarn add enzyme enzyme-adapter-react-16 react-test-renderer
```

### ¿Para qué?

Simular `render` de componentes de `React`.

Más info: [Enzyme](https://airbnb.io/enzyme/)

---

Un poco de configuración inicial de `Enzyme`

```javascript
import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { Favorite } from '../../components/layout/Favorite';
import Image from '../../components/images/Image';

configure({ adapter: new Adapter() });

describe('<Favorite />', () => {
```

---

Conveniente `beforeEach` para no repetir configuración inicial.

```javascript
let wrapper;
let favorites = [];

beforeEach(() => {
  wrapper = shallow(<Favorite favorites={favorites} />);
});
```

---

Ahora sí, vienen los tests!

```javascript
it('should render three Image components if there are three favorites', () => {
  favorites = [
    {
      id: 1,
      animal: 'dog',
      url: 'some-url'
    },
    {
      id: 2,
      animal: 'cat',
      url: 'some-url'
    },
    {
      id: 3,
      animal: 'dog',
      url: 'some-url'
    }
  ];

  wrapper.setProps({
    favorites
  });

  expect(wrapper.find(Image)).toHaveLength(3);
});
```

---

# Pero, _wait_... ¿Cómo corro los tests?

El clásico:

```
yarn test
```

---
