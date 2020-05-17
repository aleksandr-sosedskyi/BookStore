import { POST_COMMENT } from "../actions/types";

const initialState = {
    comment: {}
}


export default function(state=initialState, action) {
    switch(action.type) {
        case POST_COMMENT:
            return {
                ...state,
                comment: action.payload
            }
        default:
            return{
                ...state
            }
    }
}