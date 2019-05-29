import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';
import Home from './components/pages/Home';
import Header from './components/layout/Header';
import Game from './components/game/Game';
import MyFavorites from './components/pages/MyFavorites';

const App = () => (
  <Fragment>
    <Header />

    <main>
      <Route exact path="/" component={Home} />
      <Route exact path="/my-favorites" component={MyFavorites} />
      <Route exact path="/game" component={Game} />
    </main>
  </Fragment>
);

export default App;
