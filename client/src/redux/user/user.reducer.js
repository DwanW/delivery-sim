import UserActionTypes from './user.types';

const INITIAL_STATE = {
    currentUser: null,
    isAuthenticating:false,
    token: null,
    error: null
}

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case UserActionTypes.SIGN_IN_START:
        case UserActionTypes.SIGN_UP_START:
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
        case UserActionTypes.SIGN_IN_FAILURE:
        case UserActionTypes.SIGN_UP_FAILURE:
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
                token: null
            }
        default:
            return state;
    }
}

export default userReducer;