import axios from 'axios'
import { put, takeEvery } from 'redux-saga/effects'

function* searchRestaurants(action) {
    try {
        yield put({ type: 'CLEAR_DETAILS'})
        const query = action.payload
        const response = yield axios.get(`/api/search/${query}`)
        console.log(response.data)
        yield put({ type: 'SET_SEARCH_RESULTS', payload: response.data })
    } catch(err) {
        console.log
    }
}

function* searchSaga() {
    yield takeEvery('SEARCH', searchRestaurants)
}

export default searchSaga