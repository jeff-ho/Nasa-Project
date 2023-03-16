// Code in here is not express code. Only server code. Express code is in app.js file. 
const http = require('http')

require('dotenv').config()

const  app  = require('./app.js')
const { mongoConnect } = require('./services/mongo')
const {loadPlanetsData} = require('./models/planets.model')
const {loadLaunchData} = require('./models/launches.model')


// app express object acts as a listener for our built in Node http module to any req coming into the server. 
// Any middleware or routehandling applied to app object will be able to go to our 
// server

const PORT = process.env.PORT || 8000;


const server = http.createServer(app)


async function startServer() {
    await mongoConnect();
    await loadPlanetsData();
    await loadLaunchData();

    server.listen(PORT, () => {
        console.log(`Listening on port ${PORT}...`)
    })
}

startServer();





