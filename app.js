const DehashAPI = require('./dehash')

const asyncApiCall = async () => {
    const response = await DehashAPI

    console.log(response, "api call worked")
   
}

asyncApiCall()