import { createStore } from "redux"


//This is the initial value of the subscriber 
const initialState = {
    "subscribers" : []
}
//Reducer function
//THis is similar to the one we have seen with useReducer
//Here we do give an initial value so that it's easier 
function subscriberReducer(state = initialState, action) {

    switch (action.type) {
        case "SET_SUBSCRIBERS":
            return { ...state, "subscribers": action.payload }; 
        default:
            return state;         
    }
}

//Exports the store 
export default createStore(subscriberReducer); 