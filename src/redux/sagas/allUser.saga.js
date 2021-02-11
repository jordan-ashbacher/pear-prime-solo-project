import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

function* fetchAllUsers() {
    console.log('in fetch all users')
    try{
      const response = yield axios.get(`/api/user/all`)
      console.log(response.data)
      yield put({ type: 'SET_ALL_USERS', payload: response.data})
    }catch(err) {
      console.log(err)
    }
  }

function* allUserSaga() {
    yield takeEvery('FETCH_ALL_USERS', fetchAllUsers)
}

export default allUserSaga
  