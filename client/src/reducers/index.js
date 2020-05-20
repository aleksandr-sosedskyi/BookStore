import { combineReducers } from 'redux';
import genres from './genres';
import profiles from './profiles';
import auth from './auth';
import books from './books';
import shoppingCart from "./shoppingCart";
import orders from "./orders";

export default combineReducers({
    genres,
    profiles,
    auth,
    books,
    shoppingCart,
    orders
});