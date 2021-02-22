import matchReducer from './match.reducer'

describe('Testing matchReducer', () => {
    //Test SET_MATCHES
    test('ACTION SET_MATCHES', () => {
        const initialState = []
        const action = {type: 'SET_MATCHES', payload: [{id: 1, name: 'restaurantOne'}, {id: 2, name: 'restaurant2'}]}

        expect(matchReducer(initialState, action)).toEqual([{id: 1, name: 'restaurantOne'}, {id: 2, name: 'restaurant2'}])
    })
    //Test CLEAR_DATA
    test('ACTION CLEAR_DATA', () => {
        const initialState = [{id: 1, name: 'restaurantOne'}, {id: 2, name: 'restaurant2'}]
        const action = {type: 'CLEAR_DATA'}

        expect(matchReducer(initialState, action)).toEqual([])
    })

    //Test default
    test('ACTION CLEAR_DATA', () => {
        const initialState = [{id: 1, name: 'restaurantOne'}, {id: 2, name: 'restaurant2'}]
        const action = {type: 'OTHER'}

        expect(matchReducer(initialState, action)).toEqual(initialState)
    })

})