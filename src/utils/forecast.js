const request = require('request')

const forecast = (latitude, longitude, callback) => {
   const url = 'http://api.weatherstack.com/current?access_key=b175986e1820b764cf206f37c82a85c9&query='+latitude+','+longitude+'&units=f'
    request({url, json: true}, (error, {body}) => {
        if(error) {
            callback('Unable to connect forecast service!')
        } else if(body.error) {
            callback('Unable to find location.')
        } else {
            const {temperature, feelslike} = body.current
            callback(undefined, body.current.weather_descriptions[0]+ '. The current temprature is '+temperature+'. But it feels like '+feelslike+'.')
        }
    })
}

module.exports = forecast