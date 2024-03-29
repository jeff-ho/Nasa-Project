const { 
    getAllLaunches, 
    existsLaunchWithId,
    abortLaunchById,
    scheduleNewLaunch
} = require('../../models/launches.model')

const { getPagination } = require('../../services/query')

async function httpGetAllLaunches (req, res) {
    const { skip, limit} = getPagination(req.query)
    const launches = await getAllLaunches(skip, limit)
    return res.status(200).json(launches)
}
 
async function httpAddNewLaunch (req, res) {
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
    await scheduleNewLaunch(launch)
    console.log(launch)
    return res.status(201).json(launch)
}


async function httpAbortLaunch(req, res) {
    //launchId from params comes in as a json string so we need to convert to number
    //for it to be same type as within the launch model
    const launchId = Number(req.params.id)
    
    const existsLaunch = await existsLaunchWithId(launchId)
    if (!existsLaunch) {
        return res.status(404).json({
            error: 'Launch not found'
        })
    } 

    const aborted = await abortLaunchById(launchId)
    if(!aborted) {
        return res.status(400).json({
            error: 'Launch not aborted'
        })
    }
    return res.status(200).json({
        ok: 'true'
    })
}

module.exports = {
    httpGetAllLaunches,
    httpAddNewLaunch,
    httpAbortLaunch
}

