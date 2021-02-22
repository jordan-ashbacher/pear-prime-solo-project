import { combineReducers } from 'redux'

export const friendSearchReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_ALL_USERS':
        return action.payload
      case 'SET_USER_SEARCH':
        return action.payload
      default:
        return state;
    }
  }

  export const friendReducer = (state = [], action) => {
    switch(action.type) {
      case 'SET_FRIENDS':
        return action.payload
      case 'SET_FRIENDS_SEARCH':
        return action.payload
      default:
        return state
    }
  }

  export default combineReducers ({
    friendSearchReducer,
    friendReducer,
  })