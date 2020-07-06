import UserActionTypes from './user.types';

const INITIAL_STATE = {
    currentUser: null,
    isAuthenticating:false,
    token: null,
    error: null,
    invoices: null
}

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case UserActionTypes.SIGN_IN_START:
        case UserActionTypes.SIGN_UP_START:
        case UserActionTypes.FETCH_INVOICE_START:
            return {
                ...state,
                isAuthenticating:true
            }
        case UserActionTypes.SIGN_IN_SUCCESS:
            return {
                ...state,
                currentUser: action.payload.user,
                token: action.payload.token,
                isAuthenticating:false,
                error: null
            }
        case UserActionTypes.FETCH_INVOICE_SUCCESS:
            return {
                ...state,
                isAuthenticating:false,
                invoices: action.payload,
                error: null
            }
        case UserActionTypes.SIGN_IN_FAILURE:
        case UserActionTypes.SIGN_UP_FAILURE:
        case UserActionTypes.FETCH_INVOICE_FAILURE:
            return {
                ...state,
                isAuthenticating:false,
                error: action.payload
            }
        case UserActionTypes.SIGN_OUT:
            return {
                ...state,
                currentUser: null,
                error: null,
                token: null,
                invoices: null,
            }
        default:
            return state;
    }
}

export default userReducer;