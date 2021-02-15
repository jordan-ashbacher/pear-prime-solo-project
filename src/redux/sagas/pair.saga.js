import axios from 'axios'
import { put, takeEvery } from 'redux-saga/effects'

function* findMatches(action) {
    try {
        const friendID = action.payload
        const response = yield axios.get(`/api/pair/${friendID}`)
        console.log('Matching restaurants:', response.data)
        yield put({ type: 'SET_MATCHES', payload: response.data})

    } catch(err) {
        console.log(err)
    }
}

function* pairSaga() {
    yield takeEvery('FIND_MATCHES', findMatches)
}

export default pairSaga