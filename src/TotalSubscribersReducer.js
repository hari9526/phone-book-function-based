//State refers to the inital state
//Action is for updating the state 

export default function TotalSubscribersReducer(state, action) {
    switch (action.type) {
        case "UPDATE_COUNT":
            const updatedCount = action.payload;
            return { ...state, count: updatedCount }; 
        default:
            return state;         
    }
}