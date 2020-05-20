import {
    GET_SHOPPING_CART,
    ADD_TO_SHOPPING_CART,
    REMOVE_FROM_SHOPPING_CART,
    CLEAR_SHOPPING_CART
} from "../actions/types";


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
        case REMOVE_FROM_SHOPPING_CART:
            return {
                ...state,
                items: state.items.filter(item=> item.id != action.payload.id)
            }
        case CLEAR_SHOPPING_CART:
            return {
                ...state,
                items: []
            }
        default: 
            return state;
    }
}