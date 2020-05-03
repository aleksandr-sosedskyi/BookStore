import axios from 'axios';

import { GET_PROFILE } from './types';
import { API_URL } from '../constants/routes';

const getProfile = () => dispatch => {
    axios
        .get(`${API_URL}/accounts/profiles/`)
        .then(response => {
            dispatch({
                type: GET_PROFILE,
                payload: response.data
            })
        })
        .catch(error => console.log(`asdasd ${error}`))
}   

export default getProfile;
