import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import { Provider } from 'react-redux'
import Routes from '../client/Routes'
import Header from '../client/components/Header'
import serialize from 'serialize-javascript'
import { Switch } from 'react-router-dom'

export default (req, store) => {
    const context = {}

    const content = renderToString(
        <Provider store={store}>
            <div>            
            <StaticRouter location={req.path} context={context}>
                <div>
                    {renderRoutes(Routes)}
                </div>
            </StaticRouter>
            </div>    
        </Provider>
    )

    const html = `
        <html>
            <head></head>
            <body>
                <div id="root">${content}</div>
                <script>
                    window.__INITIAL_STATE__ = ${serialize(store.getState())}
                </script>
                <script src="bundle.js"></script>
            <body>          
        </html>            
    `

    return html
}