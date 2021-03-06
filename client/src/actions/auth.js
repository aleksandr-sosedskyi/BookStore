import axios from 'axios';
import { API_URL } from '../constants/routes';
import { tokenConfig } from './config';

import {
    USER_LOADED,
    USER_LOADING, 
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_FAIL,
    REGISTER_SUCCESS
} from './types';


// LOGIN USER
export const login = (email, password) => dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    // Request Body
    const body = JSON.stringify({email, password})

    axios
        .post(`${API_URL}/accounts/login/`, body, config)
        .then(response => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: response.data
            })
        })
        .catch(error => {
            dispatch({
                type: LOGIN_FAIL,
                payload: error.response.data.non_field_errors
            });
        });
};

export const loadUser = () => (dispatch, getState) => {
    // User loading 
    if('Authorization' in tokenConfig(getState)['headers']){
        dispatch({type: USER_LOADING});
        axios
        .get(`${API_URL}/accounts/user`, tokenConfig(getState))
        .then(response => {
            dispatch({
                type: USER_LOADED,
                payload: response.data
            });
        })
        .catch(error => {
            console.log(error) // TODO
        })
    }
}

export const logout = () => (dispatch, getState) => {
    dispatch({
        type: LOGOUT_SUCCESS
    })
}

export const register = (first_name, last_name, phone, email, password ) => (dispatch) => {
    var config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    var body = JSON.stringify({first_name, last_name, phone, email, password})
    axios
        .post(`${API_URL}/accounts/signup/`, body, config)
        .then(response => {
            dispatch({
                type: REGISTER_SUCCESS,
                payload: response.data
            })
        })
        .catch(error => {
            dispatch({
                type: REGISTER_FAIL,
                payload: error.response.data
            })
        })
}

export const changePassword = (
    id, 
    old_password, 
    new_password,
    handleSuccess,
    handleError) => (dispatch, getState) => {

    const body = JSON.stringify({old_password, new_password});

    axios
        .patch(`${API_URL}/accounts/change-password/${id}/`, body, tokenConfig(getState))
        .then(response => {
            handleSuccess();
        })
        .catch(error => {
            handleError();
            console.log(error);
        })
}