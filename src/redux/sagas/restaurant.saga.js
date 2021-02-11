import axios from 'axios'
import { put, takeEvery } from 'redux-saga/effects'

function* fetchRestaurants() {
    try {
        const response = yield axios.get(`/api/restaurant`)
        console.log(response.data)
        yield put({ type: 'SET_FAVORITE_RESTAURANTS', payload: response.data})
    } catch(err) {
        console.log('Error in fetchRestaurant saga', err)
    }
}

function* addRestaurant(action) {
    try {
        const restaurant = action.payload
        yield axios.post(`/api/restaurant/${restaurant.place_id}`)
    } catch(err) {
        console.log('Error in addRestaurant saga', err)
    }
    
}

function* restaurantSaga() {
    yield takeEvery('FETCH_RESTAURANTS', fetchRestaurants)
    yield takeEvery('ADD_RESTAURANT', addRestaurant)
}

export default restaurantSaga