import React from 'react';

import './invoice-item.styles.scss';

const InvoiceItem = ({item}) => {
    const {date_issued, invoice_id, items} = item;
    const invoiceDate = new Date(date_issued).toDateString();
    return (
    <div className='invoiceItemContainer'>
      <div className='invoiceHeader'>
        <div className='invoiceTitle'>Invoice ID#: {invoice_id}</div>
        <div className='invoiceDate'>Issued Date :{invoiceDate}</div>
      </div>
      <div className='itemDetailsContainer'>
        <div className='tableContainer'>
          <div className='headerBlock'>
                <span>Product</span>
            </div>
            <div className='headerBlock'>
                <span>Price</span>
            </div>
            <div className='headerBlock'>
                <span>Quantity</span>
            </div>
        </div>
          {
              items.map((item)=>(
              <div className="itemContainer" key={item.item_name}>
                <div className="textContainer">{item.item_name}</div>
                <div className="textContainer">$ {item.item_price}</div>
                <div className="textContainer">{item.quantity}</div>
              </div>
              ))
          }
        <div className='totalContainer'>
          <span>Subtotal:</span>
          <span> $ {items.reduce((acc,item)=> acc + item.item_price * item.quantity, 0)}</span>
        </div>
      </div>
    </div>
  )};
  
  export default React.memo(InvoiceItem);