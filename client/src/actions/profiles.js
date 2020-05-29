import axios from 'axios';

import { EDIT_PROFILE } from './types';
import { API_URL } from '../constants/routes';
import { tokenConfig } from "./config";


export const editProfile = (
    first_name, 
    last_name, 
    phone, 
    email, 
    pk, 
    handleSuccess, 
    handleErrors) => (dispatch, getState) => {

    const body = JSON.stringify({first_name, last_name, phone, email});

    axios
        .patch(`${API_URL}/accounts/profiles/${pk}/`, body, tokenConfig(getState))
        .then(response => {
            handleSuccess();
            dispatch({
                type: EDIT_PROFILE,
                payload: response.data
            })
        })
        .catch(error => {
            let firstError = Object.keys(error.response.data)[0];
            let errorText = `${firstError} - ${error.response.data[firstError]}`;
            handleErrors(errorText);
        })
}

