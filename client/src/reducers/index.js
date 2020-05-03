import { combineReducers } from 'redux';
import genres from './genres';
import profiles from './profiles';
import auth from './auth';

export default combineReducers({
    genres,
    profiles,
    auth,
});