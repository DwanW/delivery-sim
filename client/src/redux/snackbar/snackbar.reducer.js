import SnackBarActionTypes from './snackbar.types';

const INITIAL_STATE = {
    isOpen: false,
    message: null
}

const snackBarReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SnackBarActionTypes.ADD_SNACKBAR_ALERT:
            return {
                ...state,
                isOpen: true,
                message: action.payload
            }
        case SnackBarActionTypes.CLEAR_SNACKBAR_ALERT:
            return {
                ...state,
                isOpen:false,
                message:null
            }
        default:
            return state;
    }
}

export default snackBarReducer;