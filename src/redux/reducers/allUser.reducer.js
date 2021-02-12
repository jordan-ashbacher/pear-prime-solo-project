const allUserReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_USER_SEARCH':
        return action.payload
      default:
        return state;
    }
  }

  export default allUserReducer