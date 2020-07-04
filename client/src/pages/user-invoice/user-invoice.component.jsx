import React from 'react';
import { connect } from 'react-redux';

import './user-invoice.styles.scss';
import { useEffect } from 'react';
import { checkUserTokenAsync } from '../../redux/user/user.actions';

export const InvoicePage = ({ token, checkUserToken }) => {
    useEffect(()=> {
        checkUserToken(token);
        console.log(token);
    }, [checkUserToken, token])
    
    return (
    <div className="invoicePageContainer">
       <h3> View Invoices </h3>
    </div>
)};

const mapDispatchToProps = dispatch => ({
    checkUserToken: (token) => dispatch(checkUserTokenAsync(token))
})

const mapStateToProps = state => ({
    token: state.user.token,
});

export default connect(mapStateToProps,mapDispatchToProps)(InvoicePage);