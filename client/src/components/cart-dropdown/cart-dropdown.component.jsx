import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import CartItem from '../cart-item/cart-item.component';
import { toggleCartHidden } from '../../redux/cart/cart.actions.js';

import './cart-dropdown.styles.scss';

const CartDropdown = ({ cartItems, history, dispatch }) => {
    return(
    <div className="cartDropdownContainer">
        <div className='cartItemsContainer'>
            {
                cartItems.length ? (
                    cartItems.map(cartItem => (
                        <CartItem key={cartItem.ItemID} item={cartItem} />
                    ))
                ) : (
                        <div className="emptyMessage">Your cart is empty</div>
                    )
            }
        </div>
        <button className='cartDropdownButton'
            onClick={() => {
                history.push('/checkout');
                dispatch(toggleCartHidden());
            }}
        >
            GO TO CHECKOUT
    </button>
    </div>
)};

const mapStateToProps = state => ({
    cartItems: state.cart.cartItems
});

export default withRouter(connect(mapStateToProps)(CartDropdown));