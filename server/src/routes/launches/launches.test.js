//Used NPM Supertest package to make HTTP requests against our server.
const request = require('supertest')
const app = require('../../app')
const { mongoConnect, mongoDisconnect } = require('../../services/mongo')


describe('Launches API', () => {
    beforeAll(async () => {
       await mongoConnect()
    })

    afterAll(async () => {
        await mongoDisconnect()
     })

    describe('Test GET /launches', () => {
        //must make async function since we are making a http req
        test('It should respond with 200 success', async () => {
            const response = await request(app)
            .get('/v1/launches')
            .expect('Content-type', /json/ )
            .expect(200)
            
        })
    })
    
    describe('Test POST /launches', () => {
        const completeLaunchData = {
            mission: 'USS Enterprise',
            rocket: 'NCC 123',
            target: "Kepler-442 b",
            launchDate: 'January 4, 2028'
            }
    
        const launchDataWithoutDate = {
            mission: 'USS Enterprise',
            rocket: 'NCC 123',
            target: "Kepler-442 b",
            }
    
        const launchDataWithInvalidDate = {
            mission: 'USS Enterprise',
            rocket: 'NCC 123',
            target: "Kepler-442 b",
            launchDate: 'Bad Date'
        }
    
        test('It should respond with 200 success', async () => {
            const response = await request(app)
            .post('/v1/launches')
            .send(completeLaunchData)
            .expect(201) 
    
            const requestDate = new Date(completeLaunchData.launchDate).valueOf()
            const responseDate = new Date(response.body.launchDate).valueOf()
    
            expect(responseDate).toBe(requestDate)
    
            expect(response.body).toMatchObject(launchDataWithoutDate)
        })
    
    
        test('It should catch missing required properties', async () => {
           const response = await request(app)
           .post('/v1/launches')
           .send(launchDataWithoutDate)
           .expect(400) 
    
           expect(response.body).toStrictEqual({
            error: 'Missing required launch property'
           })
        })
    
        test('It should catch invalid dates', async () => {
            const response = await request(app)
            .post('/v1/launches')
            .send(launchDataWithInvalidDate)
            .expect(400) 
    
            expect(response.body).toStrictEqual({
                error: 'Invalid Launch Date'
            })
        })
    })

   
})

