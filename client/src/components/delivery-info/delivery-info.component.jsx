import React, { useState } from 'react';

import './delivery-info.styles.scss';

import FormInput from '../form-input/form-input';

import { connect } from 'react-redux';

const INITIAL_SCHEDULE = {
    Sunday: [0,0],
    Monday:[0,0],
    Tuesday: [0,0],
    Wednesday: [0,0],
    Thursday: [0,0],
    Friday: [0,0],
    Saturday: [0,0]
};

const DeliveryInfo = () => {
    const [deliveryInfo, setDeliveryInfo] = useState({ address: '', schedule: '' });
    const [defaultDisabled, setDefaultDisabled] = useState(false)

    const { address, schedule } = deliveryInfo;

    const handleSubmit = async event => {
        event.preventDefault();
        console.log('saved')
    }

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
        if(id === 'default'){
            setDeliveryInfo({...deliveryInfo, schedule: ''})
        } else {
            setDeliveryInfo({...deliveryInfo, schedule: INITIAL_SCHEDULE})
        }
    }

    const handleScheduleDate = (event) => {
        const { value, name, checked } = event.target;
        if (checked){
            let tempDay = deliveryInfo.schedule[name];
            tempDay[Number(value)] = 1;
            setDeliveryInfo({...deliveryInfo, schedule: {...schedule, [name]: tempDay}})
        } else {
            let tempDay = deliveryInfo.schedule[name];
            tempDay[Number(value)] = 0;
            setDeliveryInfo({...deliveryInfo, schedule: {...schedule, [name]: tempDay}}) 
        }
    }

    console.log(deliveryInfo.schedule.hasOwnProperty('length'))
    return (
        <div className="deliveryInfoContainer">
            <h2 className="deliveryInfoTitle">Review & Edit Delivery Info</h2>
            <span>Pick Options for delivery</span>
            <form onSubmit={handleSubmit}>
                <FormInput name='address' type='address' label='Enter Delivery Address' value={address} handleChange={handleChange} />
                <label>
                    <input type='radio' name="deliveryOption" className='deliveryOption' id="default" checked={deliveryInfo.schedule.hasOwnProperty('length')} onChange={toggleOption} />
                Default:
                </label>
                <div className='defaultContainer'>
                    <h3>Delivery will be on {getFutureDateFromToday(1).toISOString().split("T")[0]}</h3>
                    <label>
                        <input type='radio' name="schedule" value={0} onChange={handleChange} disabled={defaultDisabled} />
                        Afternoon Delivery
                    </label>

                    <label>
                        <input type='radio' name="schedule" value={1} onChange={handleChange} disabled={defaultDisabled} />
                        Evening Delivery
                    </label>
                </div>
                <label>
                    <input type='radio' name="deliveryOption" className='deliveryOption' id="scheduled" onChange={toggleOption} />
                    Try our Scheduled Delivery to save even more (recommended)
                </label>
                <div className="scheduledContainer">
                    <div className="dayContainer">
                        <h3>Sunday</h3>
                        <div>
                            <input type='checkbox' name="Sunday"  value={0} onChange={handleScheduleDate}/> Afternoon
                            <input type='checkbox' name="Sunday"  value={1} onChange={handleScheduleDate}/> Evening
                        </div>
                    </div>
                    <div className="dayContainer">
                        <h3>Monday</h3>
                        <div>
                            <input type='checkbox' name="Monday"  value={0} onChange={handleScheduleDate}/> Afternoon
                            <input type='checkbox' name="Monday"  value={1} onChange={handleScheduleDate}/> Evening
                        </div>
                    </div>
                    <div className="dayContainer">
                        <h3>Tuesday</h3>
                        <div>
                            <input type='checkbox' name="Tuesday"  value={0} onChange={handleScheduleDate}/> Afternoon
                            <input type='checkbox' name="Tuesday"  value={1} onChange={handleScheduleDate}/> Evening
                        </div>
                    </div>
                    <div className="dayContainer">
                        <h3>Wednesday</h3>
                        <div>
                            <input type='checkbox' name="Wednesday"  value={0} onChange={handleScheduleDate}/> Afternoon
                            <input type='checkbox' name="Wednesday"  value={1} onChange={handleScheduleDate}/> Evening
                        </div>
                    </div>
                    <div className="dayContainer">
                        <h3>Thursday</h3>
                        <div>
                            <input type='checkbox' name="Thursday"  value={0} onChange={handleScheduleDate}/> Afternoon
                            <input type='checkbox' name="Thursday"  value={1} onChange={handleScheduleDate}/> Evening
                        </div>
                    </div>
                    <div className="dayContainer">
                        <h3>Friday</h3>
                        <div>
                            <input type='checkbox' name="Friday"  value={0} onChange={handleScheduleDate}/> Afternoon
                            <input type='checkbox' name="Friday"  value={1} onChange={handleScheduleDate}/> Evening
                        </div>
                    </div>
                    <div className="dayContainer">
                        <h3>Saturday</h3>
                        <div>
                            <input type='checkbox' name="Saturday"  value={0} onChange={handleScheduleDate}/> Afternoon
                            <input type='checkbox' name="Saturday"  value={1} onChange={handleScheduleDate}/> Evening
                        </div>
                    </div>
                </div>
                <div>
                </div>
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