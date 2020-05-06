import {
    USER_LOADED,
    USER_LOADING, 
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL
} from '../actions/types';

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    isLoading: false,
    profile: null,
    signInErrors: null
};

export default function(state=initialState, action) {
    switch(action.type){
        case USER_LOADING:
            return {
                ...state,
                isLoading: true,
            }
        case USER_LOADED:
            return {
                ...state,
                isLoading: false,
                isAuthenticated: true,
                profile: action.payload,
                signInErrors: null,
            }
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('token', action.payload.token);
            return {
                ...state, 
                ...action.payload,
                isAuthenticated: true,
                isLoading: false,
                signInErrors: null
            }
        case REGISTER_FAIL:
        case LOGIN_FAIL:
            localStorage.removeItem('token');
            return {
                ...state, 
                token: null,
                isAuthenticated: false,
                isLoading: false,
                profile: null,
                signInErrors: action.payload
            }
        case LOGOUT_SUCCESS:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                isLoading: false,
                profile: null,
                signInErrors: null
            }
        default:
            return state;
    }   
}
