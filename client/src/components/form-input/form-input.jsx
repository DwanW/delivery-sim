import React from 'react';
import './form-input.styles.scss';

const FormInput = ({handleChange, label, ...props}) => (
    <div className='groupContainer'>
        <input className="formInput" autoComplete="off" onChange={handleChange} {...props}></input>
        {
            label ? (
                <div className={`formInputLabel ${props.value.length? 'shrink':''}`}>{label}</div>
            ) : null
        }

    </div>
);

export default FormInput;