import axios from 'axios'
import { put, takeEvery } from 'redux-saga/effects'

function* updateLocation(action) {
    const city = action.payload
    const response = yield axios.put(`/api/location/${city}`)
}

function* locationSaga() {
    yield takeEvery('UPDATE_LOCATION', updateLocation)
}

export default locationSaga