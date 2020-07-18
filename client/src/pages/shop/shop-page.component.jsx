import React, { Suspense, lazy } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'

import Spinner from '../../components/with-spinner/spinner.component';

const Directory = lazy(() => import('../../components/directory/directory.component'));
const FoodCollection = lazy(() => import('../foods/foods.component'));

const ShopPage = ({ currentCollection, match }) => (
    <div className="shopContainer">
        <Suspense fallback={<Spinner />}>
            <Route exact path={`${match.path}`} render={(props) => currentCollection ? <Directory {...props} /> : (<Redirect to='/' />)} />
            <Route path={`${match.path}/:shopId`} render={(props) => currentCollection ? <FoodCollection {...props} /> : (<Redirect to='/' />)} />
        </Suspense>
    </div>
);

const mapStateToProps = ({ shop }) => ({
    currentCollection: shop.collections,
})

export default connect(mapStateToProps)(ShopPage);