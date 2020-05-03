import { GET_PROFILE } from '../actions/types';

const initialState = {
    profiles: []
}

export default function(state = initialState, action) {
    switch(action.type){
        case GET_PROFILE:
            return {
                ...state,
                profiles: action.payload
            }
        default:
            return state;
    }
}
