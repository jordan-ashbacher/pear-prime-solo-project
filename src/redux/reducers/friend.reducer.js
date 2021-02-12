import { combineReducers } from 'redux'

const friendSearchReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_ALL_USERS':
        return action.payload
      case 'SET_USER_SEARCH':
        return action.payload
      default:
        return state;
    }
  }

  const friendReducer = (state = [], action) => {
    switch(action.type) {
      case 'SET_FRIENDS':
        return action.payload
      default:
        return state
    }
  }

  export default combineReducers ({
    friendSearchReducer,
    friendReducer,
  })