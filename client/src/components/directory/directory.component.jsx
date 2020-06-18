import React from 'react';
import { connect } from 'react-redux';

import MenuItem from '../menu-item/menu-item.component';

import './directory.styles.scss';

const Directory = ({ collections }) => {
    return (
        <div className="directoryContainer">
            {
               collections && collections.best_rated_restaurant.map(({restaurant: {id, ...otherProps}}) => 
                <MenuItem key={id} id={id} {...otherProps}/>
                )
            }
        </div>
    )
}

const mapStateToProps = state => ({
    collections: state.shop.collections
})

export default connect(mapStateToProps)(Directory);