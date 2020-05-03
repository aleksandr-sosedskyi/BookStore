import axios from 'axios';

import { GET_GENRES } from './types';
import { API_URL } from '../constants/routes';

// GET GENRES
export const getGenres = () => dispatch => {
    axios
        .get(`${API_URL}/books/genres/`)
        .then(response => {
            dispatch({
                type: GET_GENRES,
                payload: response.data
            })
        })
        .catch(error => console.log(error));
}