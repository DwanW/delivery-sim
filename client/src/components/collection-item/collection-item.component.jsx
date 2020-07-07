import React from 'react';
import { connect } from 'react-redux';
import './collection-item.styles.scss'

import { addItem } from '../../redux/cart/cart.actions';

const CollectionItem = ({ item, addItemToCart }) => {
    const { ItemName, ImgUrl, Price, Description } = item;

    return (
        <div className='collectionItemContainer'>
            <div className='collectionItemDescriptionContainer'>
                <div className='collectionItemName'>{ItemName}</div>
                <div className='collectionItemDescription'>{Description}</div>
                <div className='collectionItemPrice'>$ {Price}</div>
                <div className='addButton' onClick={() => addItemToCart(item)}>
                    Add to Cart
                </div>
            </div>
            <div className='img' style={{ backgroundImage: `url(${ImgUrl})` }}></div>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    addItemToCart: item => dispatch(addItem(item))
});

export default connect(
    null,
    mapDispatchToProps
)(CollectionItem);