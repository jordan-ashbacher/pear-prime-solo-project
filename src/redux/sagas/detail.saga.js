import axios from 'axios'
import { put, takeEvery } from 'redux-saga/effects'

function* fetchDetails(action) {
    try {
        const placeID = action.payload
        console.log(placeID)
        const response = yield axios.get(`/api/detail/${placeID}`)
        yield put({ type: 'SET_DETAILS', payload: response.data })
    } catch(err) {
        console.log(err)
    }
} 

function* detailSaga() {
    yield takeEvery('FETCH_DETAILS', fetchDetails)
}

export default detailSaga