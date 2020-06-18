import React from 'react';

import './cart-icon.styles.scss';
import { ReactComponent as PlateIcon} from '../../assets/cart.svg';

const CartIcon = () => (
    <div className='cartIconContainer'>
        <PlateIcon />
        <div className="itemCount">15</div>
    </div>
);

export default CartIcon;