#!/usr/bin/env node
'use strict'


const basicAuth = require('express-basic-auth')
let server = require('./lib/server')
const morgan = require('morgan')

const fs = require('fs')


// load config
const argv = require( 'argv' )
argv.option([{
                name: 'config',
                short: 'c',
                type: 'string',
                description: 'File to load config from. (An absolute path).',
                example: "'server --config=file' or 'server -c file'"
            }]
    )

const args = argv.run()

if (args.options.config && fs.existsSync(args.options.config)) {

    let config = require(args.options.config)
   
    // server.use(basicAuth({users: config.users}))
    server.use(morgan('combined'))

    require('./routes/example')(server)
    require('./routes/metrics')(server)

    server.listen(config.port)
    console.log(`Running server on port ${config.port} and config file ${args.options.config}`)


} else {
    argv.help()
}
