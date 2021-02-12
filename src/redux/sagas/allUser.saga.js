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

function* allUserSaga() {
    yield takeEvery('SEARCH_USERS', searchUsers)
}

export default allUserSaga
  