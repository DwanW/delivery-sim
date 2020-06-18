import React from 'react';

import SpinContainer from './spin-container.component';

import './with-spinner.styles.scss';

const WithSpinner = WrappedComponent => {
  const Spinner = ({ isLoading, ...otherProps }) => {
    return isLoading ? (
      <div className='spinnerOverlay'>
        <SpinContainer />
      </div>
    ) : (
      <WrappedComponent {...otherProps} />
    );
  };
  return Spinner;
};

export default WithSpinner;