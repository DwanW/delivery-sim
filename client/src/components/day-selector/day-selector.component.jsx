import React from 'react';

import './day-selector.styles.scss';

const DaySelector = ({handleScheduleDate, scheduleDisabled, day}) => (
        <div className="dayContainer">
            <h3>{day}</h3>
            <div>
                <input type='checkbox' name={day} value={0} onChange={handleScheduleDate} disabled={scheduleDisabled}/> Afternoon
                <input type='checkbox' name={day} value={1} onChange={handleScheduleDate} disabled={scheduleDisabled}/> Evening
            </div>
        </div>
)

export default DaySelector;