const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURI(address) +'.json?access_token=pk.eyJ1Ijoia2FtbGVzaDEwIiwiYSI6ImNrY2RuYm0xZzAwN2IyeW8wZjhtaXlyMW8ifQ.E81p72OpKs0QLCubIX9akg&limit=1'

    request({url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect geo service!')
        } else if(body.features.length<1){
            callback('Unable to find location, please check and enter valid address.')
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode