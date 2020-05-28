import React from 'react';
import { Link } from 'react-router-dom';

import { ReactComponent as Logo} from '../../assets/logo.svg'
import './header.styles.scss';

import CartIcon from '../cart-icon/cart-icon.component';


const Header = () => (
    <div className='headerContainer'>
        <Link className='logoContainer' to='/' >
            <Logo />
        </Link>
        <div className='optionContainer'>
            <Link className='optionLink' to='/'>Home</Link>
            <Link className='optionLink' to='/contact'>Contact</Link>
            <Link className='optionLink' to='/signin'>Sign In</Link>
            <CartIcon />
        </div>
    </div >
)

export default Header;