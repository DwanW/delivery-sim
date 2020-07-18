import React, { lazy, Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import './App.scss';

import Header from './components/header/header.component';
import SnackBar from './components/snackbar/snackbar.component';
import Spinner from './components/with-spinner/spinner.component';
import ErrorBoundary from './components/error-boundary/error-boundary.component';

const HomePage = lazy(() => import('./pages/homepage/homepage'));
const ShopPage = lazy(() => import('./pages/shop/shop-page.component'));
const SignInAndSignUpPage = lazy(() => import('./pages/sign-in-and-sign-up/sign-in-and-sign-up.component'));
const CheckoutPage = lazy(() => import('./pages/checkout/checkout.component'));
const InvoicePage = lazy(() => import('./pages/user-invoice/user-invoice.component'));

const App = ({ currentCollection, currentUser }) => {
  return (
    <div className="root">
      <Header />
      <Switch>
        <ErrorBoundary>
          <Suspense fallback={<Spinner />}>
            <Route exact path='/' render={() => currentCollection ? (<Redirect to='/shop' />) : <HomePage />} />
            <Route exact path='/signin' render={() => currentUser ? (<Redirect to='/' />) : <SignInAndSignUpPage />} />
            <Route path='/shop' component={ShopPage} />
            <Route exact path='/checkout' component={CheckoutPage} />
            <Route exact path='/myacc' render={() => currentUser ? <InvoicePage /> : (<Redirect to='/signin' />)} />
          </Suspense>
        </ErrorBoundary>
      </Switch>
      <SnackBar autoHideDuration={5000} backgroundColor={'#d4d4d4'} />
    </div>
  );
}

const mapStateToProps = ({ shop, user }) => ({
  currentCollection: shop.collections,
  currentUser: user.currentUser
})

export default connect(mapStateToProps)(App);
