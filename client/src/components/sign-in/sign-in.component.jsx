import React, { useState } from 'react';

import './sign-in.styles.scss';
import FormInput from '../form-input/form-input';
import CustomButton from '../custom-button/custom-button.component';
import { signInStartAsync } from '../../redux/user/user.actions';

import { connect } from 'react-redux';

const SignIn = ({fetchUser}) => {
    const [userCredentials, setCredentials] = useState({ username:'', password:'' });

    const {username, password} = userCredentials;

    const handleSubmit = async event => {
        event.preventDefault();
        fetchUser(username, password);
        setCredentials({ username:'', password:'' })
    }

    const handleChange = event => {
        const { value, name } = event.target;
        setCredentials({ ...userCredentials, [name]: value })
    }

    return (
        <div className="signInContainer">
            <h2 className="signInTitle">I already have an account</h2>
            <span>Sign in with Username and Password</span>
            <form onSubmit={handleSubmit}>
                <FormInput name='username' type='username' label='Username' value={username} handleChange={handleChange} />
                <FormInput
                    name='password'
                    type='password'
                    label='Password'
                    value={password}
                    handleChange={handleChange}
                    required
                />
                <div className="signInButtons">
                    <CustomButton type="submit">Sign In</CustomButton >
                </div>
            </form>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    fetchUser: (username,password) => dispatch(signInStartAsync(username,password))
});

export default connect(null,mapDispatchToProps)(SignIn);