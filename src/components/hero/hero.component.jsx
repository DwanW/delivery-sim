import React, { useState } from 'react';
import { connect } from 'react-redux';
import './hero.styles.scss'

import SpinContainer from '../with-spinner/spin-container.component';

import {fetchCollectionsStartAsync} from '../../redux/shop/shop.actions';

const Hero = ({isLoading, fetchCollections}) => {
    const [value, setValue] = useState('');

    const handleChange = event => {
        setValue(event.target.value)
    }
    return (
        <div className="hero">
            <div className="main-title">Your Local Delivery</div>
            <div className="main-input">
                <input onChange={handleChange} name="location" type="text" placeholder="Enter Your City Location" autoComplete="off"></input>
                <button onClick={() => fetchCollections(value)}>{isLoading? <SpinContainer />: "Find Local Restaurants".toUpperCase()}</button>
            </div>
        </div>
    )
};

const mapDispatchToProps = dispatch => ({
    fetchCollections: (query) => dispatch(fetchCollectionsStartAsync(query))
});

const mapStateToProps = state => ({
    isLoading: state.shop.isFetching
})

export default connect(mapStateToProps, mapDispatchToProps)(Hero);