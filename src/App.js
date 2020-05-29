import React from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.scss';

import HomePage from './pages/homepage/homepage';

import Header from './components/header/header.component'
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';

const App = () => {
  return (
    <div className="root">
      <Header/>
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route exact path='/signin' component={SignInAndSignUpPage} />
      </Switch>
    </div>
  );
}

export default App;
