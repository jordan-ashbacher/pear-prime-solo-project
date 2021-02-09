import axios from 'axios'
import { put, takeEvery } from 'redux-saga/effects'

function* addRestaurant(action) {
    try {
        const restaurant = action.payload
        yield axios.get(`/api/restaurant/${restaurant.place_id}`)
        // yield axios.post('/api/restaurant', restaurant)
    } catch(err) {
        console.log('Error in addRestaurant saga', err)
    }
    
}

function* restaurantSaga() {
    yield takeEvery('ADD_RESTAURANT', addRestaurant)
}

export default restaurantSaga