import React from 'react';

import './custom-button.styles.scss';

const CustomButton = ({ children, ...props }) => (
    <button {...props}>
        {children}
    </button>
);

export default CustomButton;