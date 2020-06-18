import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import './App.scss';

import HomePage from './pages/homepage/homepage';
import ShopPage from './pages/shop/shop-page.component';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';

const App = ({currentCollection}) => {
  return (
    <div className="root">
      <Header />
      <Switch>
        <Route exact path='/' render={()=> currentCollection? (<Redirect to='/shop' />): <HomePage />} />
        <Route exact path='/signin' component={SignInAndSignUpPage} />
        <Route exact path='/shop' component={ShopPage} />
      </Switch>
    </div>
  );
}

const mapStateToProps =({ shop }) => ({
  currentCollection: shop.collections
})

export default connect(mapStateToProps)(App);
