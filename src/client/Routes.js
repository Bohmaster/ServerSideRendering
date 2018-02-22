import React from 'react'
import  { Route } from 'react-router-dom'

import Home from './components/Home'
import UserLists, { loadData } from './components/UserLists'
import App from './App'

export default [
    {
        ...App,
        routes: [
            {
                path: '/',
                component: Home,
                exact: true
            },
            {   path: '/users',
                component: UserLists,
                loadData,
            }
        ]
    }
]