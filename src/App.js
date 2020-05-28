import React from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.scss';

import HomePage from './pages/homepage/homepage';

import Header from './components/header/header.component'

const App = () => {
  return (
    <div className="root">
      <Header/>
      <Switch>
        <Route exact path='/' component={HomePage} />
      </Switch>
    </div>
  );
}

export default App;
