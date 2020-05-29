import { combineReducers } from 'redux';
import genres from './genres';
import auth from './auth';
import books from './books';
import shoppingCart from "./shoppingCart";
import orders from "./orders";

export default combineReducers({
    genres,
    auth,
    books,
    shoppingCart,
    orders
});