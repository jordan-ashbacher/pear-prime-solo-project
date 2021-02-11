const restaurantReducer = (state = [], action) => {
    switch(action.type) {
        case 'SET_FAVORITE_RESTAURANTS':
            return action.payload
        case 'CLEAR_DATA':
            return []
        default:
            return state
    }
}

export default restaurantReducer