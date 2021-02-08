import axios from 'axios'
import { put, takeEvery } from 'redux-saga/effects'

function* addFavorite(action) {
    try {
        const restaurant = action.payload
        yield axios.post('/api/favorite', restaurant)
    } catch(err) {
        console.log('Error in addFavorite saga', err)
    }
    
}

function* favoriteSaga() {
    yield takeEvery('ADD_FAVORITE', addFavorite)
}

export default favoriteSaga