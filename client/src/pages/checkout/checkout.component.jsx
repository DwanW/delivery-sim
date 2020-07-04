import React from 'react';
import { connect } from 'react-redux';

import CheckoutItem from '../../components/checkout-item/checkout-item.component';
import DeliveryInfo from '../../components/delivery-info/delivery-info.component';

import './checkout.styles.scss';
import { useEffect } from 'react';
import { checkUserTokenAsync } from '../../redux/user/user.actions';

export const CheckoutPage = ({ cartItems, cartTotal, token, checkUserToken }) => {
    useEffect(()=> {
        checkUserToken(token);
    }, [checkUserToken, token])
    
    return (
    <div className="checkoutPageContainer">
        <div className='checkoutHeaderContainer'>
            <div className='headerBlock'>
                <span>Order</span>
            </div>
            <div className='headerBlock'>
                <span>Description</span>
            </div>
            <div className='headerBlock'>
                <span>Quantity</span>
            </div>
            <div className='headerBlock'>
                <span>Price</span>
            </div>
            <div className='headerBlock'>
                <span>Remove</span>
            </div>
        </div>
        {
            cartItems.map(cartItem =>
                <CheckoutItem key={cartItem.ItemID} cartItem={cartItem} />
            )
        }
        <div className='totalContainer'>
            <span> TOTAL: ${cartTotal}</span>
        </div>
        <button className='toggleDeliveryContainerButton'>Review&Edit Delivery Address</button>
        <DeliveryInfo cartItems={cartItems} />
    </div>
)};

const mapDispatchToProps = dispatch => ({
    checkUserToken: (token) => dispatch(checkUserTokenAsync(token))
})

const mapStateToProps = state => ({
    token: state.user.token,
    cartItems: state.cart.cartItems,
    cartTotal: state.cart.cartItems.reduce((acc, itemObj) => acc + itemObj.quantity * itemObj.Price, 0).toFixed(2)
});

export default connect(mapStateToProps,mapDispatchToProps)(CheckoutPage);