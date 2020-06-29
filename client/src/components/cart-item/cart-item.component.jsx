import React from 'react';

import './cart-item.styles.scss';

const CartItem = ({ item: { ImgUrl, Price, ItemName, quantity } }) => (
    <div className='cartItemContainer'>
      <span className='img' style={{backgroundImage:`url(${ImgUrl}`}} />
      <div className='itemDetailsContainer'>
        <span>{ItemName}</span>
        <span>
          {quantity} x ${Price}
        </span>
      </div>
    </div>
  );
  
  export default React.memo(CartItem);