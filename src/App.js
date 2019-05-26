import React from 'react';
import { Route } from 'react-router-dom';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Header from './components/layout/Header';

const App = () => (
  <div>
    <Header />

    <main>
      <Route exact path="/" component={Home} />
      <Route exact path="/about-us" component={About} />
    </main>
  </div>
);

export default App;
