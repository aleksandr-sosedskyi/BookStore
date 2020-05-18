import {
    GET_SHOPPING_CART,
    ADD_TO_SHOPPING_CART,
    REMOVE_FROM_SHOPPING_CART
} from "./types";
import axios from "axios";
import { tokenConfig } from "./config";
import { API_URL } from "../constants/routes";

export const getShoppingCart = () => (dispatch, getState) => {
    axios
        .get(`${API_URL}/orders/shopping-carts/`, tokenConfig(getState))
        .then(response => {
            dispatch({
                type: GET_SHOPPING_CART,
                payload: response.data
            })
        })
        .catch(error => {
            console.log(error);
        })
}

export const addToShoppingCart = (profile, book, amount, ) => (dispatch, getState) => {
    const body = JSON.stringify({profile, book, amount});
    
    axios
        .post(`${API_URL}/orders/shopping-carts/`, body, tokenConfig(getState))
        .then(response => {
            dispatch({
                type: ADD_TO_SHOPPING_CART,
                payload: response.data
            })
        })
        .catch(error => {
            console.log(error)
        })
}

export const removeFromShoppingCart = (id) => (dispatch, getState) => {
    axios
        .delete(`${API_URL}/orders/shopping-carts/${id}`, tokenConfig(getState))
        .response(response => {
            dispatch({
                type: REMOVE_FROM_SHOPPING_CART,
                payload: response.data
            })
        })
        .catch(error => {
            console.log(error);
        })
}
