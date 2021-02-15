const matchReducer = (state = [], action) => {
    switch(action.type) {
        case 'SET_MATCHES':
            return action.payload
        case 'CLEAR_DATA':
            return []
        default:
            return state
    }
}

export default matchReducer