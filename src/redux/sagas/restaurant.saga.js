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
        console.log('ADD RESTAURANT SAGA:', restaurant)
        yield axios.post(`/api/restaurant/${restaurant.place_id}`)
        yield put({ type: 'FETCH_RESTAURANTS'})
    } catch(err) {
        console.log('Error in addRestaurant saga', err)
    }
    
}

function* removeFavorite(action) {
    try{
        const id = action.payload
        yield axios.delete(`/api/restaurant/delete/${id}`)
        yield put({ type: 'FETCH_RESTAURANTS'})
    } catch(err) {
        console.log(err)
    }
}

function* restaurantSaga() {
    yield takeEvery('FETCH_RESTAURANTS', fetchRestaurants)
    yield takeEvery('ADD_RESTAURANT', addRestaurant)
    yield takeEvery('REMOVE_FAVORITE', removeFavorite)
}

export default restaurantSaga