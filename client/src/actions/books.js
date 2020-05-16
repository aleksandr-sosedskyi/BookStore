import { GET_BOOKS } from "./types";
import axios from "axios";
import { API_URL } from '../constants/routes';

export const getBooks = (genreId) => dispatch => {
    const URL = genreId == 'all' 
            ? `${API_URL}/books/books/` 
            : `${API_URL}/books/books/?genre=${genreId}`;
    axios
        .get(URL)
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