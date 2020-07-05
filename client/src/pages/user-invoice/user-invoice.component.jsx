import React from 'react';
import { connect } from 'react-redux';

import './user-invoice.styles.scss';
import { useEffect } from 'react';
import { checkUserTokenAsync, fetchUserInvoiceStartAsync } from '../../redux/user/user.actions';

export const InvoicePage = ({ token, checkUserToken, fetchUserInvoice }) => {
    useEffect(()=> {
        checkUserToken(token);
    }, [checkUserToken, token])
    
    return (
    <div className="invoicePageContainer">
       <h3> View Invoices </h3>
       <button onClick={()=>fetchUserInvoice(token)}>DO IT</button>
    </div>
)};

const mapDispatchToProps = dispatch => ({
    checkUserToken: (token) => dispatch(checkUserTokenAsync(token)),
    fetchUserInvoice: (token) => dispatch(fetchUserInvoiceStartAsync(token))
})

const mapStateToProps = state => ({
    token: state.user.token,
});

export default connect(mapStateToProps,mapDispatchToProps)(InvoicePage);