import { app } from '../app.js'
import chai from 'chai'
import { expect } from 'chai'
import chaiHttp from 'chai-http'

chai.use(chaiHttp)
chai.should()

describe(`hello world`,() => {

  it(`says hello world`,async() => {
    const response = await chai.request(app).get(`/hello`)
    const { hello } = response.body
    expect(hello).to.equal(`world`)
  })
})