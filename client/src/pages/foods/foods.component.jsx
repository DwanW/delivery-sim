import React from 'react';
import { connect } from 'react-redux';

import { convertListToMap } from '../../data/data.util';

import './foods.styles.scss';

import CollectionItem from '../../components/collection-item/collection-item.component'

export const FoodCollection = ({collections}) => {
    return (
        <div className='foodCollectionPage'>
            <div className="restaurant-title">{collections.name}</div>
            <div>User_Rating: {collections.user_rating.aggregate_rating}, {collections.user_rating.rating_text}</div>
            <div className='foodCollectionContainer'>
            {
                collections && collections.cuisine_menu.menu.map((item) =>
                    <CollectionItem key={item.ItemID} item={item} />
                )
            }
            </div>
        </div>
    )
}

const mapStateToProps = (state, ownProps) => ({
    collections: convertListToMap(state.shop.collections.best_rated_restaurant)[ownProps.match.params.shopId]
})

export default connect(mapStateToProps)(FoodCollection);