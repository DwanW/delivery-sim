import React, { useState } from 'react';

import './delivery-info.styles.scss';

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

const DeliveryInfo = ({cartItems}) => {
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

    const handleCheckout = () => {
        console.log(cartItems, deliveryInfo)
    }

    return (
        <div className="deliveryInfoContainer">
            <h2 className="deliveryInfoTitle">Review & Edit Delivery Info</h2>
            <span>Pick Options for delivery</span>
            <div>
                Address:
                <input name='address' type='address' placeholder='Enter Delivery Address' value={address} onChange={handleChange} />
            </div>

            <div className='defaultContainer'>
                <input type='radio' name="deliveryOption" className='deliveryOption' id="default" checked={scheduleDisabled} onChange={toggleOption} />
                Default:
                <h3>Delivery will be on {getFutureDateFromToday(1).toISOString().split("T")[0]}</h3>
                <div>
                    <input type='radio' name="schedule" value={0} onChange={handleChange} disabled={!scheduleDisabled} />
                        Afternoon Delivery
                    </div>

                <div>
                    <input type='radio' name="schedule" value={1} onChange={handleChange} disabled={!scheduleDisabled} />
                        Evening Delivery
                    </div>
            </div>
            <div className="scheduledContainer">
                <input type='radio' name="deliveryOption" className='deliveryOption' id="scheduled" onChange={toggleOption} />
                Try our Scheduled Delivery to save even more (recommended)
                <DaySelector day='Sunday' handleScheduleDate={handleScheduleDate} scheduleDisabled={scheduleDisabled} />
                <DaySelector day='Monday' handleScheduleDate={handleScheduleDate} scheduleDisabled={scheduleDisabled} />
                <DaySelector day='Tuesday' handleScheduleDate={handleScheduleDate} scheduleDisabled={scheduleDisabled} />
                <DaySelector day='Wednesday' handleScheduleDate={handleScheduleDate} scheduleDisabled={scheduleDisabled} />
                <DaySelector day='Thursday' handleScheduleDate={handleScheduleDate} scheduleDisabled={scheduleDisabled} />
                <DaySelector day='Friday' handleScheduleDate={handleScheduleDate} scheduleDisabled={scheduleDisabled} />
                <DaySelector day='Saturday' handleScheduleDate={handleScheduleDate} scheduleDisabled={scheduleDisabled} />
            </div>

            <button onClick={handleCheckout}>CHECK OUT</button>
        </div>
    )
}

export default DeliveryInfo;