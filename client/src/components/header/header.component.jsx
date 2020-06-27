import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { ReactComponent as Logo } from '../../assets/logo.svg'
import './header.styles.scss';

import {signOut} from '../../redux/user/user.actions'
import CartIcon from '../cart-icon/cart-icon.component';


const Header = ({ currentUser, signOutCurrentUser }) => (
    <div className='headerContainer'>
        <Link className='logoContainer' to='/' >
            <Logo />
        </Link>
        <div className='optionContainer'>
            <Link className='optionLink' to='/'>Home</Link>
            <Link className='optionLink' to='/contact'>Contact</Link>
            {
                currentUser ? <div className='optionLink' onClick={signOutCurrentUser}>Sign Out</div> :
                <Link className='optionLink' to='/signin'>Sign In</Link>
            }
            <CartIcon />
        </div>
    </div >
)

const mapStateToProps = (state) => ({
    currentUser: state.user.currentUser
})

const mapDispatchToProps = (dispatch) => ({
    signOutCurrentUser: () => dispatch(signOut())
})

export default connect(mapStateToProps, mapDispatchToProps)(Header);