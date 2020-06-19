const request  = require('supertest')
const router = require('../auth/auth-router')
const mockData ={username:'phillgoodtoMe',password:'ipassyou'}


describe('Register userRoute',()=>{
    

    it('if username and password is valid', async ()=>{
      const check = await request(router).post('/').send(mockData)
      expect(check.status).toBe(200)
      expect(check.body).toHaveProperty('token')
    })

    it('if username is not valid ', async ()=>{
        const badData = mockData.username
        const check = await request(router).post('/').send(mockData)

        expect(check.status).toBeEqualTo(400)
        expect(check.body).toBe({message:'please enter a username and password'})

        })
})

describe('Login Route',()=>{
    it('test to see if proper login gives you a token ',async ()=>{
        const name = 'ryans' + Math.random() 
        mockData.username = name
        const response = await request(router).post('/').send(mockData)

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('token')
        
    })

})