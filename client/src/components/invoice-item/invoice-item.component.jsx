import React from 'react';

import './invoice-item.styles.scss';

const InvoiceItem = ({item}) => {
    const {date_issued, invoice_id, items} = item;
    const invoiceDate = new Date(date_issued).toDateString();
    return (
    <div className='invoiceItemContainer'>
      <div className='invoiceTitle'>Invoice#: {invoice_id}</div>
      <div className='itemDetailsContainer'>
        <span>{invoiceDate}</span>
        <span>
          {
              items.map((item)=><div key={item.item_name}>{item.item_name},{item.item_price},{item.quantity}</div>)
          }
        </span>
      </div>
    </div>
  )};
  
  export default React.memo(InvoiceItem);