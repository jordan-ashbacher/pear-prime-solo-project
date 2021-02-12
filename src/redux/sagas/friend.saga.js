import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

  function* searchUsers(action) {
    try {
      const searchQuery = action.payload
      const response = yield axios.get(`/api/search/user/${searchQuery}`)
      yield put({ type: 'SET_USER_SEARCH', payload: response.data})
    }catch (err) {
      console.log(err)
    }
  }

  function* fetchUsers() {
    try {
      const response = yield axios.get('/api/friends/all')
    yield put({ type: 'SET_ALL_USERS', payload: response.data})
    } catch(err) {
      console.log(err)
    }
  }

  function* addFriend(action) {
    try {
      const id = action.payload
      yield axios.post(`/api/friends/${id}`)
    } catch(err) {
      console.log(err)
    }
  }

  function* fetchFriends() {
    try {
      const response = yield axios.get(`/api/friends`)
      yield put({ type: 'SET_FRIENDS', payload: response.data})
    } catch(err) {
      console.log(err)
    }
  }
    

function* friendsSaga() {
  yield takeEvery('FETCH_USERS', fetchUsers)
    yield takeEvery('SEARCH_USERS', searchUsers)
    yield takeEvery('ADD_FRIEND', addFriend)
    yield takeEvery('FETCH_FRIENDS', fetchFriends)
}

export default friendsSaga
  