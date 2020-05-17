import { combineReducers } from 'redux';
import genres from './genres';
import profiles from './profiles';
import auth from './auth';
import books from './books';
import comments from './comments';

export default combineReducers({
    genres,
    profiles,
    auth,
    books,
    comments
});