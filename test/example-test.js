process.env.NODE_ENV = 'test'

//let assert = require('assert')
const express = require('express')
const chai = require('chai')
const chaiHttp = require('chai-http')
const should = chai.should()

chai.use(chaiHttp)

const expect = chai.expect
let request = chai.request

const querystring = require('querystring')

describe('/example', () => {

  let server
  let q
  
  
  beforeEach ( () => {
    server = require('../lib/server')
    require('../routes/example')(server)
  })

  afterEach ( () => {
    server = null
  })

  describe('GET', () => {
    it('should return hey!', done => {
        chai.request(server)
            .get('/example')
            .end((err, res) => {
                res.should.have.status(200)
                res.should.be.text
                res.text.should.be.eql('hey!\n')
                done()
            })
    })

    it('should return hey! (other style)', async () => {
        const response = await request(server).get('/example')

        expect(response).to.have.status(200)
        expect(response).to.be.text
        expect(response.text).to.be.eql('hey!\n')
    })
  })

  describe('POST', () => {

    let payload = { 'tittle': 'test123' }
    let query = { arg1: '123' }

    it('should return my post body and query', done => {
        chai.request(server)
            .post('/example' + '?' + querystring.stringify(query))
            .set({"content-type": "application/json"})
            .send(payload)
            .end((err, res) => {
                res.should.have.status(200)
                res.should.be.json
                res.body.query.should.be.eql(query)
                res.body.payload.should.be.eql(payload)
                
                done()
            })
    })

    it('should return my post body and query (other style)', async () => {
        const response = await request(server).post('/example' +  '?' + querystring.stringify(query))
                                              .set({"Content-Type": "application/json"})
                                              .send(payload)
        expect(response).to.have.status(200)
        expect(response).to.be.json
        expect(response.body.query).to.be.eql(query)
        expect(response.body.payload).to.be.eql(payload)
    })
  })


})


