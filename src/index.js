import 'babel-polyfill'
import express from 'express'
import renderer from './helpers/renderer'
import createStore from './helpers/createStore'
import { matchRoutes} from 'react-router-config'
import proxy from 'express-http-proxy'
import Routes from './client/Routes'

const app = express()

// proxy
app.use('/api',
         proxy('http://react-ssr-api.herokuapp.com',
               {
                   proxyReqOptDecorator(opts) {
                       opts.headers['x-forwarded-host'] = 'localhost:3000'
                       return otps
                   }
               }))

// Serve static
app.use(express.static('public'))

// Server side render React handler
app.get('*', (req, res) => {
    console.log('PATH: ', req.path) 
    
    const store = createStore(req)

    // Some logic to initialize
    // and load state
    const promises = matchRoutes(Routes, req.path).map(
        ({ route }) => {
            return route.loadData ?
                route.loadData(store) :
                null
        }
    )

    Promise.all(promises)
        .then((data) => {
            console.log('All fetched')
            res.send(renderer(req, store))
        })
    
})

app.listen(3000, ()=> {
    console.log('Listen on port 3000')
})