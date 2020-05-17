import { GET_BOOKS, GET_BOOK } from "../actions/types";

const initialState = {
    books: [],
    pickedBook: {}
}


export default function(state=initialState, action) {
    switch(action.type){
        case GET_BOOKS:
            return {
                ...state,
                books: action.payload
            }
        case GET_BOOK:
            return {
                ...state,
                pickedBook: action.payload
            }
        default:
            return state;
    }
}
