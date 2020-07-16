import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import CartItem from '../cart-item/cart-item.component';
import { toggleCartHidden } from '../../redux/cart/cart.actions.js';
import { addSnackBarAlert } from '../../redux/snackbar/snackbar.actions';

import './cart-dropdown.styles.scss';

const CartDropdown = ({ cartItems, history, toggleCart, currentUser, addAlertMessage }) => {
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
                toggleCart();
                if(currentUser){
                    history.push('/checkout');
                }else{
                    history.push('/signin');
                    addAlertMessage('PLEASE SIGN IN')
                };
            }}
        >
            GO TO CHECKOUT
        </button>
    </div>
)};

const mapStateToProps = state => ({
    cartItems: state.cart.cartItems,
    currentUser: state.user.currentUser
});

const mapDispatchToProps = dispatch => ({
    addAlertMessage: (message) => dispatch(addSnackBarAlert(message)),
    toggleCart: () => dispatch(toggleCartHidden())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CartDropdown));