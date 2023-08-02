import { expect } from 'chai'
import { wakeflowAccess } from './wakeflowAccess.js'

describe(`wakeflowAccess`,async() => {
  it(`gets sesame sheet`,async() => {
    const response = await wakeflowAccess({
      userId: 123,
      url: `https://sheets.googleapis.com/v4/spreadsheets/12mHA67PPjAmbFlNiJFPuc_f3roB7Il7Y4uxAWtswHr4/values/Sheet1`,
      scopes: [
        `https://www.googleapis.com/auth/spreadsheets`,
        `https://www.googleapis.com/auth/drive`],
    })
    expect(response.data.values[0][0]).to.equal(`sesame`)
  })
})
