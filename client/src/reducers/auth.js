import {
    USER_LOADED,
    USER_LOADING, 
    AUTH_ERRORS,
    LOGIN_SUCCESS,
    LOGIN_FAIL
} from '../actions/types';

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    isLoading: false,
    profile: null
};

export default function(state=initialState, action) {
    switch(action.type){
        case LOGIN_SUCCESS:
            localStorage.setItem('token', action.payload.token);
            return {
                ...state, 
                ...action.payload,
                isAuthenticated: true,
                isLoading: false,
            }
        case LOGIN_FAIL:
            localStorage.removeItem('token');
            return {
                ...state, 
                token: null,
                isAuthenticated: false,
                isLoading: false,
                profile: null,
            }
        default:
            return state;
    }   
}
