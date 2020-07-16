import SnackBarActionTypes from './snackbar.types';

export const addSnackBarAlert = (message) => ({
    type: SnackBarActionTypes.ADD_SNACKBAR_ALERT,
    payload: message
})

export const clearSnackBarAlert = () => ({
    type: SnackBarActionTypes.CLEAR_SNACKBAR_ALERT
})