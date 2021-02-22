import {friendReducer, friendSearchReducer} from './friend.reducer'

describe('Testing friend reducer', () => {
    //SET_ALL_USERS in friendSearchReducer
    test('ACTION SET_ALL_USERS', () => {
        const initialState = {}
        const action = {type: 'SET_ALL_USERS', payload: {id: 1, username: 'testUser'}}
        expect(friendSearchReducer(initialState, action)).toEqual({id: 1, username: 'testUser'})
    })

    //SET_USER_SEARCH in friendSearchReducer
    test('ACTION SET_ALL_USERS', () => {
        const initialState = {}
        const action = {type: 'SET_USER_SEARCH', payload: {id: 2, username: 'testUser2'}}
        expect(friendSearchReducer(initialState, action)).toEqual({id: 2, username: 'testUser2'})
    })

    //return default in friendSearchReducer
    test('ACTION SET_ALL_USERS', () => {
        const initialState = {id: 2, username: 'testUser2'}
        const action = {type: 'OTHER'}
        expect(friendSearchReducer(initialState, action)).toEqual(initialState)
    })
})