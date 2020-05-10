import { GET_BOOKS } from "./types";
import axios from "axios";
import { API_URL } from '../constants/routes';

export const getBooks = () => dispatch => {
    axios
        .get(`${API_URL}/books/books/`)
        .then(response => {
            dispatch({
                type: GET_BOOKS,
                payload: response.data
            })
        })
        .catch(errors=> {
            console.log(errors);
        })
}