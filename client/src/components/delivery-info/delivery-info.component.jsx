import React from 'react';

import './delivery-info.styles.scss';

import FormInput from '../form-input/form-input';

import { connect } from 'react-redux';

const DeliveryInfo = () => {
    const [deliveryInfo, setDeliveryInfo] = useState({ address:'', schedule:{} });

    const {address, schedule} = deliveryInfo;

    const handleSubmit = async event => {
        event.preventDefault();
        fetchUser(username, password);
    }

    const handleChange = event => {
        const { value, name } = event.target;
        setCredentials({ ...userCredentials, [name]: value })
    }

    return (
        <div className="deliveryInfoContainer">
            <h2 className="deliveryInfoTitle">Review & Edit Delivery Info</h2>
            <span>Sign in with Username and Password</span>
            <form onSubmit={handleSubmit}>
                <FormInput name='address' type='address' label='Enter Delivery Address' value={username} handleChange={handleChange} />
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

export default connect(null,mapDispatchToProps)(DeliveryInfo);