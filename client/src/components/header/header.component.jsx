import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { ReactComponent as Logo } from '../../assets/logo.svg'
import './header.styles.scss';

import {signOut} from '../../redux/user/user.actions'
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';


const Header = ({ currentUser, signOutCurrentUser, hidden }) => (
    <div className='headerContainer'>
        <Link className='logoContainer' to='/' >
            <Logo />
        </Link>
        <div className='optionContainer'>
            <Link className='optionLink' to='/'>Home</Link>
            {
                currentUser ? <Link className='optionLink' to='/myacc'>My Account</Link> : null
            }
            {
                currentUser ? <div className='optionLink' onClick={signOutCurrentUser}>Sign Out</div> :
                <Link className='optionLink' to='/signin'>Sign In</Link>
            }
            <CartIcon />
            {
                hidden ? null: <CartDropdown />
            }
        </div>
    </div >
)

const mapStateToProps = (state) => ({
    currentUser: state.user.currentUser,
    hidden: state.cart.hidden
})

const mapDispatchToProps = (dispatch) => ({
    signOutCurrentUser: () => dispatch(signOut())
})

export default connect(mapStateToProps, mapDispatchToProps)(Header);