const express = require('express')
const helmet = require('helmet')
const bodyParser = require('body-parser')

let app = express().use(helmet())
                   .use(bodyParser.urlencoded({ extended: true }))
                   .use(bodyParser.json())
                   .use(bodyParser.json({ type: 'application/json'}))

module.exports = app


