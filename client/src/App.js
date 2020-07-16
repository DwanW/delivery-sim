import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import './App.scss';

import HomePage from './pages/homepage/homepage';
import ShopPage from './pages/shop/shop-page.component';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import CheckoutPage from './pages/checkout/checkout.component';
import InvoicePage from './pages/user-invoice/user-invoice.component';
import SnackBar from './components/snackbar/snackbar.component';

const App = ({currentCollection, currentUser}) => {
  return (
    <div className="root">
      <Header />
      <Switch>
        <Route exact path='/' render={()=> currentCollection? (<Redirect to='/shop' />): <HomePage />} />
        <Route exact path='/signin' render={()=> currentUser? (<Redirect to='/'/> ): <SignInAndSignUpPage />} />
        <Route path='/shop' component={ShopPage} />
        <Route exact path='/checkout' component={CheckoutPage} />
        <Route exact path='/myacc' render={()=> currentUser? <InvoicePage />:(<Redirect to='/signin'/> )} />
      </Switch>
      <SnackBar autoHideDuration={5000} backgroundColor={'#d4d4d4'}/>
    </div>
  );
}

const mapStateToProps =({ shop, user }) => ({
  currentCollection: shop.collections,
  currentUser: user.currentUser
})

export default connect(mapStateToProps)(App);
