import { GET_BOOKS, GET_BOOK, GET_ALL_BOOKS } from "../actions/types";

const initialState = {
    books: [],
    pickedBook: {},
    searchBooks: []
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
        case GET_ALL_BOOKS:
            return {
                ...state,
                searchBooks: action.payload
            }
        default:
            return state;
    }
}
