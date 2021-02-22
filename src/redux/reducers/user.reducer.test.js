import userReducer from './user.reducer'

describe('Testing user reducer', () => {
    //SET_USER
    test('ACTION SET_USER', () => {
        const initialState = {}
        const action = {type: 'SET_USER', payload: {username: 'testUser'}}
        expect(userReducer(initialState, action)).toEqual({username: 'testUser'})
    })

    //UNSET_USER
    test('ACTION UNSET_USER', () => {
        const initialState = {username: 'testUser'}
        const action = {type: 'UNSET_USER'}

        expect(userReducer(initialState, action)).toEqual({})
    })
    //OTHER ACTION
    test('ACTION default', () => {
        const initialState = {username: 'testUser'}
        const action = {type: 'FETCH_FRIENDS'}
        expect(userReducer(initialState, action)).toEqual(initialState)
    })
})