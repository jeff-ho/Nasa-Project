// Code in here is not express code. Only server code. Express code is in app.js file. 

const http = require('http')
const mongoose = require('mongoose')
const  app  = require('./app.js')

const {loadPlanetsData} = require('./models/planets.model')

// app express object acts as a listener for our built in Node http module to any req coming into the server. 
// Any middleware or routehandling applied to app object will be able to go to our 
// server

const PORT = 8000;

const MONGO_URL = 'mongodb+srv://nasa-api:oJRzLEc5BCim7oCx@nasa.albqquq.mongodb.net/nasa?retryWrites=true&w=majority'

const server = http.createServer(app)

mongoose.connection.once('open', () => {
    console.log('MongoDB connection ready!')
})

mongoose.connection.on('error', (err) => {
    console.error(err)
})

async function startServer() {
    await mongoose.connect(MONGO_URL)
    await loadPlanetsData();

    server.listen(PORT, () => {
        console.log(`Listening on port ${PORT}...`)
    })
}

startServer();





