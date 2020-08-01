const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define path for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewpath = path.join(__dirname, '../templates/views')
const partialViewpath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewpath)
hbs.registerPartials(partialViewpath)

// setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'weather',
        name: 'Kamlesh Mishra'
    })
   
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Kamlesh Mishra'
    })
   
})


app.get('/help', (req, res) => {
    res.render('help', {
        title:'How can I help you.',
        name: 'Kamlesh Mishra'
    })
})


app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    } 
        geocode(req.query.address,(error, {latitude,longitude,location} = {}) => {
            if(error) {
               return res.send({
                error
               })
            }
            forecast(latitude,longitude,(error, forecast) => {
                if(error) {
                      return  res.send({
                            error
                        })
                }else {
                    res.send({
                        location: location,
                        forecast: forecast,
                        address: req.query.address


                    })
                }

            })
        })


    
    
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        errorMessage:'No help article found.',
        name: 'Kamlesh Mishra',
        title: 'error'
      })
})

app.get('*', (req, res) => {
  res.render('error', {
    errorMessage:'404 Page not found',
    name: 'Kamlesh Mishra',
    title: 'error'
  })
})

app.listen(port, () => {
    console.log('Server is up on port '+ port)
})