import React from 'react';
import { connect } from 'react-redux';

import './user-invoice.styles.scss';
import { useEffect } from 'react';
import { checkUserTokenAsync, fetchUserInvoiceStartAsync } from '../../redux/user/user.actions';

import InvoiceItem from '../../components/invoice-item/invoice-item.component';

export const InvoicePage = ({ token, checkUserToken, fetchUserInvoice, invoices}) => {
    useEffect(()=> {
        checkUserToken(token);
        if(token){
            fetchUserInvoice(token)
        }
    }, [checkUserToken, token])
    
    return (
    <div className="invoicePageContainer">
       <h3> My Invoices </h3>
       <div className="invoiceListContainer">
        { 
           invoices && invoices.map((item,idx) => 
           <InvoiceItem key={idx} item={item}/>
            )
        }
       </div>
    </div>
)};

const mapDispatchToProps = dispatch => ({
    checkUserToken: (token) => dispatch(checkUserTokenAsync(token)),
    fetchUserInvoice: (token) => dispatch(fetchUserInvoiceStartAsync(token))
})

const mapStateToProps = state => ({
    token: state.user.token,
    invoices: state.user.invoices
});

export default connect(mapStateToProps,mapDispatchToProps)(InvoicePage);