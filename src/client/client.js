// Startup point for the client side application
import 'babel-polyfill'
import React from 'react'
import { render, hydrate } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import { Provider } from 'react-redux'
import Routes from './Routes'
import { createStore, applyMiddleware, compose } from 'redux'
import createHistory from 'history/createBrowserHistory'
import { ConnectedRouter, routerMiddleware, push } from 'react-router-redux'
import thunk from 'redux-thunk'
import reducers from '../client/reducers'
import Header from '../client/components/Header'
import { connect } from 'react-redux'
import { Switch, withRouter } from 'react-router'
import { composeWithDevTools } from 'redux-devtools-extension'
import axios from 'axios'

// custom axios instance with default baseURL
const axiosInstance = axios.create({
    baseURL: '/api'
})

// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory()

// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history)

const ConnectedSwitch = connect(state => ({
    location: state.location
}))(Switch)

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

const store = createStore(
    reducers,
    window.__INITIAL_STATE__,
    composeEnhancers(applyMiddleware(
        thunk.withExtraArgument(axiosInstance),
        middleware))
)

const _ConnectedSwitch = withRouter(ConnectedRouter)

history.listen(location => {
    console.log(location)
    // if (location.pathname === '/') {
    //     console.log('Redirecting to Users')
    //     store.dispatch(push('/users'))
    // }
})

// store.subscribe (() => {
//     console.log('Changes', store.getState())
// })

hydrate(
    <Provider store={store}>
        <div>
            <BrowserRouter history={history}>
                <div>
                        {renderRoutes(Routes)}
                </div>
            </BrowserRouter>        
        </div>    
    </Provider>,
    document.querySelector('#root')
)


