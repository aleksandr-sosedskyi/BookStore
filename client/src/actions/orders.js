import {
    GET_ORDERS,
    CREATE_ORDER,
    DELETE_ORDER
} from "./types";
import axios from 'axios';
import { tokenConfig } from "./config";
import { API_URL } from "../constants/routes";

export const getOrders = () => (dispatch, getState) => {
    axios
        .get(`${API_URL}/orders/orders/`, tokenConfig(getState))
        .then(response => {
            dispatch({
                type: GET_ORDERS,
                payload: response.data
            })
        })
        .catch(error => {
            console.log(error);
        })
}   

export const createOrder = (address, orderSuccess, orderFail) => (dispatch, getState) => {
    const body = JSON.stringify({address});

    axios
        .post(`${API_URL}/orders/orders/`, body, tokenConfig(getState))
        .then(response => {
            orderSuccess();
            dispatch({
                type: CREATE_ORDER,
                payload: response.data
            })
        })
        .catch(error => {
            orderFail(error.response.data['errors'][0])
        })
}

export const deleteOrder = (orderId) => (dispatch, getState) => {
    axios
        .delete(`${API_URL}/orders/orders/${orderId}/`, tokenConfig(getState))
        .then(response => {
            dispatch({
                type: DELETE_ORDER,
                payload: response.data
            })
        })
        .catch(error => {
            console.log(error);
        })
}
