import React from 'react';

import './custom-button.styles.scss';

const CustomButton = ({ children, ...props }) => (
    <button className='customButton' {...props}>
        {children}
    </button>
);

export default CustomButton;