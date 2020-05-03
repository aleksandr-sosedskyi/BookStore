import axios from 'axios';
import { API_URL } from '../constants/routes';
import { returnErrors } from './messages';

import {
    USER_LOADED,
    USER_LOADING, 
    AUTH_ERRORS,
    LOGIN_SUCCESS,
    LOGIN_FAIL
} from './types';


// LOGIN USER
export const login = (username, password) => dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    // Request Body
    const body = JSON.stringify({username, password})

    axios
        .post(`${API_URL}/accounts/login/`, body, config)
        .then(response => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: response.data
            })
        })
        .catch(error => {
            dispatch(returnErrors(error.response.data, error.response.status));
            dispatch({
                type: LOGIN_FAIL
            });
        });

};