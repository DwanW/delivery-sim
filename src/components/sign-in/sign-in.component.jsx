import React, { useState } from 'react';

import './sign-in.styles.scss';
import FormInput from '../form-input/form-input';
import CustomButton from '../custom-button/custom-button.component';

const SignIn = () => {
    const [userCredentials, setCredentials] = useState({ email:'', password:'' });

    const {email, password} = userCredentials;

    const handleSubmit = async event => {
        event.preventDefault();
        console.log(email, password);
    }

    const handleChange = event => {
        const { value, name } = event.target;
        setCredentials({ ...userCredentials, [name]: value })
    }

    return (
        <div className="signInContainer">
            <h2 className="signInTitle">I already have an account</h2>
            <span>Sign in with Email and Password</span>
            <form onSubmit={handleSubmit}>
                <FormInput name='email' type='email' label='Email' value={email} handleChange={handleChange} />
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

export default SignIn;