import React from 'react';
import { connect } from 'react-redux';

import MenuItem from '../menu-item/menu-item.component';

import './directory.styles.scss';

const Directory = ({ collections }) => {
    console.log(collections)
    return (
        <div className="directoryContainer">
            <div className="locationTitle">Popular Restaurant Near <span>{collections.location.title}</span></div>
            {
               collections && collections.best_rated_restaurant.filter((e,idx)=> idx <6).map(({id, ...otherProps}) =>
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