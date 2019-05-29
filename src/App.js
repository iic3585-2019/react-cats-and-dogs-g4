import React from 'react';
import { Route } from 'react-router-dom';
import Home from './components/pages/Home';
import Header from './components/layout/Header';
import Game from './components/game/Game';
import MyFavorites from './components/pages/MyFavorites';

const App = () => (
  <div>
    <Header />

    <main>
      <Route exact path="/" component={Home} />
      <Route exact path="/my-favorites" component={MyFavorites} />
      <Route exact path="/game" component={Game} />
    </main>
  </div>
);

export default App;
