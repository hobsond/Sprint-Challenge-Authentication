const request  = require('supertest')
const router = require('../auth/auth-router')

describe('Register userRoute',()=>{
    const mockData ={username:'phillgoodtoMe',password:'ipassyou'}
    

    it('if username and password should return status 200', async ()=>{
      const check = await request(router).get('/')
      expect(check.status).toBe(200)
    })
})