const restaurantReducer = (state = [], action) => {
    switch(action.type) {
        case 'SET_FAVORITE_RESTAURANTS':
            return action.payload
        default:
            return state
    }
}

export default restaurantReducer