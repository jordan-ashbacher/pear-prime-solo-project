import axios from 'axios'
import { put, takeEvery } from 'redux-saga/effects'

function* searchRestaurants(action) {
    try {
        const query = action.payload
        const response = yield axios.get(`/api/search/${query}`)
        console.log(response.data)
        yield put({ type: 'SET_SEARCH_RESULTS', payload: response.data })
    } catch(err) {
        console.log
    }
}

function* fetchImage(action) {
    console.log('in fetchImage')
    const image = action.payload.image
    
    try{
        const response = yield axios.get(`/api/search/image/${image}`)
        const restaurantDetails = {...action.payload, imageURL: response.data}
        console.log(restaurantDetails)
        yield put({ type: 'SET_IMAGE_URL', payload: restaurantDetails})
    } catch(err) {
        console.log('error in fetchImage saga', err)
    }
}

function* searchSaga() {
    yield takeEvery('SEARCH', searchRestaurants)
    yield takeEvery('FETCH_IMAGE', fetchImage)
}

export default searchSaga