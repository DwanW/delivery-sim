import React from 'react';
import { connect } from 'react-redux';

import {
  clearItemFromCart,
  addItem,
  removeItem
} from '../../redux/cart/cart.actions';

import './checkout-item.styles.scss';

const CheckoutItem = ({ cartItem, clearItem, add, remove }) => {
  const { name, imageUrl, price, quantity } = cartItem;
  return (
    <div className='checkoutItemContainer'>
      <div className='imageContainer'>
        <img src={imageUrl} alt='item' />
      </div>
      <span className='textContainer'>{name}</span>
      <div className="quantityContainer">
        <div onClick={() => remove(cartItem)}>&#10094;</div>
        <span>{quantity}</span>
        <div onClick={() => add(cartItem)}>&#10095;</div>
      </div>
      <span className='textContainer'>{price}</span>
      <div className='removeButtonContainer' onClick={() => clearItem(cartItem)}>
        &#10005;
      </div>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  clearItem: item => dispatch(clearItemFromCart(item)),
  add: item => dispatch(addItem(item)),
  remove: item => dispatch(removeItem(item))
});

export default connect(
  null,
  mapDispatchToProps
)(CheckoutItem);