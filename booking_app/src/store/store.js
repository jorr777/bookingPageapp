
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import authReducer from './reducers/authReducer'
import selectReducer from './reducers/userProductReducer'

const rootReducer = combineReducers({
    authReducer,
})


export const setupStore = () => {
    return configureStore({
        reducer:rootReducer
    })
}