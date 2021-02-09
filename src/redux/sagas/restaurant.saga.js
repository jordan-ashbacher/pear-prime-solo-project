import axios from 'axios'
import { put, takeEvery } from 'redux-saga/effects'

function* addRestaurant(action) {
    try {
        const restaurant = action.payload
        yield axios.post('/api/restaurant', restaurant)
    } catch(err) {
        console.log('Error in addRestaurant saga', err)
    }
    
}

function* favoriteSaga() {
    yield takeEvery('ADD_RESTAURANT', addRestaurant)
}

export default favoriteSaga