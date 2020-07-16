import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { clearSnackBarAlert } from '../../redux/snackbar/snackbar.actions';

import './snackbar.styles.scss';

const SnackBar = ({ message, isOpen, autoHideDuration, handleClose, backgroundColor }) => {
    useEffect(() => {
        if(isOpen){
            const timer = setTimeout(() =>handleClose(), autoHideDuration);
            return () => clearTimeout(timer);
        }
    }, [isOpen,handleClose,autoHideDuration])

    return (
        isOpen && <div className='snackbarContainer' style={{ backgroundColor: backgroundColor }}>
            {message}
            <span onClick={handleClose}>X</span>
        </div>
    )   
}

const mapStateToProps = state => ({
    isOpen: state.snackbar.isOpen,
    message: state.snackbar.message
})

const mapDispatchToProps = dispatch => ({
    handleClose: () => dispatch(clearSnackBarAlert())
})

export default connect(mapStateToProps, mapDispatchToProps)(SnackBar);