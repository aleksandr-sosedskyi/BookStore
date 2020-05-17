import { POST_COMMENT } from './types';
import axios from "axios";
import { tokenConfig } from './config';
import { API_URL } from '../constants/routes';

export const postComment = (text, book, profile) => (dispatch, getState) => {
    if('Authorization' in tokenConfig(getState)['headers']){
        const body = JSON.stringify({text, book, profile});
        axios
            .post(`${API_URL}/books/comments/`, body, tokenConfig(getState))
            .then(response => {
                dispatch({
                    type: POST_COMMENT,
                    payload: response.data
                })
            })
            .catch(error => {
                console.log(error);
            })
    }
}