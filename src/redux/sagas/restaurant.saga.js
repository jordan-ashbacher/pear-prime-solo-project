import axios from 'axios'
import { put, takeEvery } from 'redux-saga/effects'

// Fetches and sets favorite restaurant reducer for current user
function* fetchRestaurants() {
    try {
        const response = yield axios.get(`/api/restaurant`)
        console.log(response.data)
        yield put({ type: 'SET_FAVORITE_RESTAURANTS', payload: response.data})
    } catch(err) {
        console.log('Error in fetchRestaurant saga', err)
    }
}

//Post for new favorite restaurant and dispatch to fetch updated favorites list
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

//Route to remove restaurant from current users favorites
function* removeFavorite(action) {
    try{
        const id = action.payload
        yield axios.delete(`/api/restaurant/delete/${id}`)
        yield put({ type: 'FETCH_RESTAURANTS'})
    } catch(err) {
        console.log(err)
    }
}

function* updateNote(action) {
    try {
        console.log(action.payload)
        const newNote = action.payload
        yield axios.put(`/api/restaurant/note`, newNote)
        yield put({ type: 'FETCH_RESTAURANTS' })
    } catch(err) {
        console.log(err)
    }
}

function* restaurantSaga() {
    yield takeEvery('FETCH_RESTAURANTS', fetchRestaurants)
    yield takeEvery('ADD_RESTAURANT', addRestaurant)
    yield takeEvery('REMOVE_FAVORITE', removeFavorite)
    yield takeEvery('EDIT_NOTE', updateNote)
}

export default restaurantSaga