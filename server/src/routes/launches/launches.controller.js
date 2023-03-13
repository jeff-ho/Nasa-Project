const { 
    getAllLaunches,
    addNewLaunch, 
    existsLaunchWithId,
    abortLaunchById
} = require('../../models/launches.model')

function httpGetAllLaunches (req, res) {
    return res.status(200).json(getAllLaunches())
}

function httpAddNewLaunch (req, res) {
    const launch  = req.body

    if (!launch.mission || !launch.launchDate || !launch.rocket || !launch.target) {
        return res.status(400).json({
            error: 'Missing required launch property'
        })
    }
    // isNaN for a regular date will convert(isNaN.valueOf) the date first to a UNIX 
    // number then the isNaN method will see if number or not.
    // For invalid dates that are strings, isNaN.valueOf will return true.
    launch.launchDate = new Date(launch.launchDate)
    if (isNaN(launch.launchDate)) {
        return res.status(400).json({
            error: 'Invalid Launch Date'
        })
     }
     console.log('fsafdsfsdafdsfsa', launch)
    addNewLaunch(launch)
    return res.status(201).json(launch)
}


function httpAbortLaunch(req, res) {
    //launchId from params comes in as a json string so we need to convert to number
    //for it to be same type as within the launch model
    const launchId = Number(req.params.id)
  
    if (!existsLaunchWithId(launchId)) {
        return res.status(404).json({
            error: 'Launch not found'
        })
    } 

    const aborted = abortLaunchById(launchId)
    return res.status(200).json(aborted)

}

module.exports = {
    httpGetAllLaunches,
    httpAddNewLaunch,
    httpAbortLaunch
}

