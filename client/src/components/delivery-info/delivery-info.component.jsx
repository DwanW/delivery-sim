import React, { useState } from 'react';

import './delivery-info.styles.scss';

import FormInput from '../form-input/form-input';

import { connect } from 'react-redux';

const DeliveryInfo = () => {
    const [deliveryInfo, setDeliveryInfo] = useState({ address: '', schedule: {} });

    const { address, schedule } = deliveryInfo;

    const handleSubmit = async event => {
        event.preventDefault();
        console.log('saved')
    }

    const handleChange = event => {
        const { value, name } = event.target;
        setDeliveryInfo({ ...deliveryInfo, [name]: value })
    }

    return (
        <div className="deliveryInfoContainer">
            <h2 className="deliveryInfoTitle">Review & Edit Delivery Info</h2>
            <span>Schedule your Delivery</span>
            <form onSubmit={handleSubmit}>
                <FormInput name='address' type='address' label='Enter Delivery Address' value={address} handleChange={handleChange} />
                <FormInput
                    name='schedule'
                    type='date'
                    label=''
                    value={schedule}
                    handleChange={handleChange}
                    required
                />
                <div className="deliveryInfoSaveButtons">
                    <button type="submit">Save</button >
                </div>
            </form>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    fetchUser: (e) => e
});

export default connect(null, mapDispatchToProps)(DeliveryInfo);