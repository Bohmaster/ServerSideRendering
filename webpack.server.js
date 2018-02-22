const path = require('path') 
const merge = require('webpack-merge')
const base_config = require('./webpack.base.js')
const webpack_node_externals = require('webpack-node-externals')

const config = {
    // Inform webpack that we're building a bundle
    // for NodeJS; rather tan for the browser
    target: 'node',

    // Tell webpack the root file of our
    // server application
    entry: './src/index.js',

    // Tell webpack where to put the outpu file
    // that is generated
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'build')
    },

    // Don't bundle libraries if exists in node_modules
    externals: [
        webpack_node_externals()
    ]
}

module.exports = merge(base_config, config)