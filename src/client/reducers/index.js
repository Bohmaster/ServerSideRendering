import { combineReducers } from 'redux'
import usersReducer from './usersReducer'
import { userInfo } from 'os';
import { routerReducer } from 'react-router-redux'
import authReducer from './authReducer'

export default combineReducers({
    users: usersReducer,
    router: routerReducer,
    auth: authReducer
})