---
marp: true
---

# React

# ![](public/logo.PNG)



### Grupo 4
###### Natalia Barra - Luis Chodiman - Mauricio Ortiz

---

# Puntos principales

- Uso de **Hooks** y componentes como **clases**
- Manejo de estado con **Redux**
- Manejo de router con **React Router**
- Uso de API
- Bonus: **Tests** con enzyme y jest

---

# Componentes en React
### Componente stateless

```
import React, { Fragment } from 'react';
import Favorite from '../layout/Favorite';

const Favorites = () => (
  <Fragment>
    <h1 className="title">My favorites</h1>
    <Favorite />
  </Fragment>
);

export default Favorites;
```
---

# Componentes en React
## Componente de clase

Importaciones necesarias
```
import React from 'react';
import { connect } from 'react-redux';
import { selectAnimal, selectBreed } from '../../modules/game';
// Otros imports...

const mapDispatchToProps = { selectAnimal, selectBreed };
const mapStateToProps = state => state.game;
```

---
# Componentes en React
## Componente de clase

Constructor
```
class SelectAnimal extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selected: "dog" }; // Estado inicial del componente
    this.handleChange = this.handleChange.bind(this);
  }
```
Método de la clase

```
  handleChange(event) {
    this.setState({ selected: event.target.value }); // Cambia estado del componente
    this.props.selectAnimal(event.target.value); 
    this.props.selectBreed('random');
  }
```
---
# Componentes en React
### Componente de clase

Mostrar el componente

```
  render() {
    const { selected } = this.state;
    return (
      <FormControl disabled={this.props.playing} className="form">
        // Componentes del form...
      </FormControl>
    );
  }
```
Export con uso de redux

```
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectAnimal);
```
---

# Manejo de estado con Redux

---
# React Router

App.js

```
import { Route } from 'react-router-dom';
// Import de componentes

const App = () => (
  <Fragment>
    <Header />

    <main>
      <Route exact path="/" component={Home} />
      <Route exact path="/favorites" component={Favorites} />
      <Route exact path="/game" component={Game} />
    </main>
  </Fragment>
);

export default App;
```
---
# React Router

Barra de navegación

```
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className="navbar">
      <div className="link">
        <Link to="/favorites">Favorites</Link>
      </div>
      Otros links...
    </div>
  );
};

export default Header;
```

---

# Uso de API

- Uso de [The Dog API](https://dog.ceo/dog-api/) y [The Cat API](https://thecatapi.com/)
- Obtener imagenes aleatorias, listado de razas e imagen de raza específica


---

# Uso de API

Ejemplo: Obtener imagenes aleatorias de perros
###### modules/dogs.js
```
const response = await fetch(
    'https://dog.ceo/api/breeds/image/random/18'
  ).then(res => res.json());

  const dogs = response.message;
```

Luego se usa la respuesta en la aplicación 
###### components/images/Images.js
```
  const dogImages = dogs.map((dog, index) => {
    return <Image animal="dog" key={index} url={dog} id={index} />;
  });
```

---

# Bonus: Testing

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

# ![](public/logo.PNG)