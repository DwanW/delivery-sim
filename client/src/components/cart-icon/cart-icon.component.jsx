import React from 'react';
import { connect } from 'react-redux';
import { toggleCartHidden } from '../../redux/cart/cart.actions';

import './cart-icon.styles.scss';
import { ReactComponent as PlateIcon } from '../../assets/cart.svg';

const CartIcon = ({ toggleCart, itemCount }) => (
    <div className='cartIconContainer' onClick={toggleCart}>
        <PlateIcon />
        <div className="itemCount">{itemCount}</div>
    </div>
);

//why do we need this(line 15 ~ 18) ==> refractor later
const mapDispatchToProps = dispatch => ({
    toggleCart: () => dispatch(toggleCartHidden())
});

const mapStateToProps = state => ({
    itemCount: state.cart.cartItems.reduce((acc, cartItem) => acc + cartItem.quantity, 0)
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CartIcon);