import {
    GET_SHOPPING_CART,
    ADD_TO_SHOPPING_CART,
    REMOVE_FROM_SHOPPING_CART
} from "./types";


const initialState = {
    items: []
}

export default function(state=initialState, action) {
    switch(action.type){
        case GET_SHOPPING_CART:
            return {
                ...state,
                items: action.payload
            }
        case ADD_TO_SHOPPING_CART:
            return {
                ...state,
                items: [...state.items, action.payload]
            }
        default: 
            return state;
    }
}