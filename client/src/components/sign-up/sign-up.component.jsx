import React, { useState } from 'react';

import FormInput from '../form-input/form-input';
import CustomButton from '../custom-button/custom-button.component';
import { signUpStartAsync } from '../../redux/user/user.actions';
import { connect } from 'react-redux';
import { addSnackBarAlert } from '../../redux/snackbar/snackbar.actions';

import './sign-up.styles.scss';

const SignUp = ({signUpThenSignIn, addAlertMessage}) => {
    const [userCredentials, setUserCredentials] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const { username, email, password, confirmPassword } = userCredentials;

    const handleSubmit = async event => {
        event.preventDefault();
        if (password !== confirmPassword) {
            addAlertMessage("PASSWORD DON'T MATCH")
            return;
        }
        signUpThenSignIn( username, email, password );
    }

    const handleChange = event => {
        const { name, value } = event.target;
        setUserCredentials({...userCredentials, [name]: value });
    }

    return (
        <div className="signUpContainer">
            <h2 className="signUpTitle">New to this site? Sign up here</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    type='text'
                    name='username'
                    value={username}
                    onChange={handleChange}
                    label='Display Name'
                    required
                />
                <FormInput
                    type='email'
                    name='email'
                    value={email}
                    onChange={handleChange}
                    label='Email'
                    required
                />
                <FormInput
                    type='password'
                    name='password'
                    value={password}
                    onChange={handleChange}
                    label='Password'
                    required
                />
                <FormInput
                    type='password'
                    name='confirmPassword'
                    value={confirmPassword}
                    onChange={handleChange}
                    label='Confirm Password'
                    required
                />
                <CustomButton type='submit'>SIGN UP</CustomButton>
            </form>
        </div>
    )
}
const mapDispatchToProps = dispatch => ({
    signUpThenSignIn: (username, email, password) => dispatch(signUpStartAsync(username, email, password)),
    addAlertMessage: (message) => dispatch(addSnackBarAlert(message))
});

export default connect(null,mapDispatchToProps)(SignUp);