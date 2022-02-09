const dotenv = require('dotenv')
dotenv.config()

const express = require('express')
const port = 5000

const app = express()

// Static Files
app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/js', express.static(__dirname + 'public/js'))
app.use('/img', express.static(__dirname + 'public/img'))

// Template Engine
app.set('views', './src/views')
app.set('view engine', 'ejs')

// Routes
const newsRouter = require('./src/routes/news')

app.use('/', newsRouter)

app.listen(port, () => console.log(`Server is running on port ${port}`))