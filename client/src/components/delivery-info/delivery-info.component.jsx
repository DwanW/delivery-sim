import React, { useState } from 'react';

import './delivery-info.styles.scss';

import { connect } from 'react-redux';
import { clearCart } from '../../redux/cart/cart.actions';

import CustomButton from '../custom-button/custom-button.component';
import DaySelector from '../day-selector/day-selector.component';

const INITIAL_SCHEDULE = {
    Sunday: [0, 0],
    Monday: [0, 0],
    Tuesday: [0, 0],
    Wednesday: [0, 0],
    Thursday: [0, 0],
    Friday: [0, 0],
    Saturday: [0, 0]
};

const DeliveryInfo = ({ cartItems, token, clearOnCheckout }) => {
    const [deliveryInfo, setDeliveryInfo] = useState({ address: '', schedule: '' });

    const { address, schedule } = deliveryInfo;

    const scheduleDisabled = deliveryInfo.schedule.hasOwnProperty('length');

    const handleChange = event => {
        const { value, name } = event.target;
        setDeliveryInfo({ ...deliveryInfo, [name]: value })
    }

    const getFutureDateFromToday = (dayDiff) => {
        let tmr = new Date();
        tmr.setDate(new Date().getDate() + dayDiff);
        return tmr;
    }

    const toggleOption = (event) => {
        const { id } = event.target;
        if (id === 'default') {
            setDeliveryInfo({ ...deliveryInfo, schedule: '' })
        } else {
            setDeliveryInfo({ ...deliveryInfo, schedule: INITIAL_SCHEDULE })
        }
    }

    const handleScheduleDate = (event) => {
        const { value, name, checked } = event.target;
        if (checked) {
            let tempDay = deliveryInfo.schedule[name];
            tempDay[Number(value)] = 1;
            setDeliveryInfo({ ...deliveryInfo, schedule: { ...schedule, [name]: tempDay } })
        } else {
            let tempDay = deliveryInfo.schedule[name];
            tempDay[Number(value)] = 0;
            setDeliveryInfo({ ...deliveryInfo, schedule: { ...schedule, [name]: tempDay } })
        }
    }

    const handleCheckout = async () => {
        let checkoutInfo = { cartItems: cartItems, deliveryInfo: deliveryInfo, }
        let { schedule } = deliveryInfo;

        // to do: cannot let user submit empty schedule;
        // if (schedule === "" || schedule)

        let requestOptions = {
            method: 'POST',
            headers: { 'x-access-token': token, 'Content-Type': 'application/json' },
            redirect: 'follow',
            body: JSON.stringify(checkoutInfo)
        };

        try {
            const response = await fetch("http://127.0.0.1:5000/checkout", requestOptions);
            response.json().then(data => console.log(data))
            clearOnCheckout()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="deliveryInfoContainer">
            <div className="deliveryInfoTitle">Review & Edit Delivery Info</div>
            <div className='addressSection'>
                <div>Address:</div>
                <input name='address' type='text' placeholder='Enter Delivery Address' value={address} onChange={handleChange} autoComplete="off" />
            </div>
            <div className='scheduleSection'>
                <div className='scheduleTitle'>Pick Options for delivery</div>
                <div className='defaultContainer'>
                    <div className="customRadio">
                        <input type='radio' name="deliveryOption" className='deliveryOption' id="default" checked={scheduleDisabled} onChange={toggleOption} />
                        <label htmlFor="default">Default: - Delivery will be on {getFutureDateFromToday(1).toISOString().split("T")[0]}</label>
                    </div>
                    <div className="optionBox">
                        <div className="radioContainer">
                            <input type='radio' name="schedule" value={0} onChange={handleChange} disabled={!scheduleDisabled} />
                        Afternoon Delivery
                        </div>

                        <div className="radioContainer">
                            <input type='radio' name="schedule" value={1} onChange={handleChange} disabled={!scheduleDisabled} />
                        Evening Delivery
                        </div>
                    </div>
                </div>
                <div className="scheduledContainer">
                    <div className="customRadio">
                        <input type='radio' name="deliveryOption" className='deliveryOption' id="scheduled" onChange={toggleOption} />
                        <label htmlFor="scheduled">Try our Scheduled Delivery to save even more (recommended)</label>
                    </div>
                    <div className="optionBox">
                        <DaySelector day='Sunday' handleScheduleDate={handleScheduleDate} scheduleDisabled={scheduleDisabled} />
                        <DaySelector day='Monday' handleScheduleDate={handleScheduleDate} scheduleDisabled={scheduleDisabled} />
                        <DaySelector day='Tuesday' handleScheduleDate={handleScheduleDate} scheduleDisabled={scheduleDisabled} />
                        <DaySelector day='Wednesday' handleScheduleDate={handleScheduleDate} scheduleDisabled={scheduleDisabled} />
                        <DaySelector day='Thursday' handleScheduleDate={handleScheduleDate} scheduleDisabled={scheduleDisabled} />
                        <DaySelector day='Friday' handleScheduleDate={handleScheduleDate} scheduleDisabled={scheduleDisabled} />
                        <DaySelector day='Saturday' handleScheduleDate={handleScheduleDate} scheduleDisabled={scheduleDisabled} />
                    </div>
                </div>
            </div>
            <CustomButton onClick={handleCheckout}>CHECK OUT</CustomButton>
        </div>
    )
}

const mapStateToProps = state => ({
    token: state.user.token
})

const mapDispatchToProps = dispatch => ({
    clearOnCheckout: () => dispatch(clearCart())
})

export default connect(mapStateToProps, mapDispatchToProps)(DeliveryInfo);