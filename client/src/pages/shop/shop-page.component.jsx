import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'

import Directory from '../../components/directory/directory.component';
import FoodCollection from '../foods/foods.component';

const ShopPage = ({currentCollection, match}) => (
    <div className="shopContainer">
        <Route exact path={`${match.path}`} render={(props)=> currentCollection? <Directory {...props}/> : (<Redirect to='/' />)} />
        <Route path={`${match.path}/:shopId`} render={(props)=> currentCollection? <FoodCollection {...props} /> : (<Redirect to='/' />)} />
    </div>
);

const mapStateToProps = ({shop}) => ({
    currentCollection: shop.collections,
})

export default connect(mapStateToProps)(ShopPage);