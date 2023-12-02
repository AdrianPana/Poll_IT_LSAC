const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

require('dotenv').config()

const app = express()
const port = process.env.PORT
const mongourl = process.env.MONGOURL

const router = require('./router')

app.use(cors())

app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())

app.use('/api', router)

app.listen(port, () => {
    console.log("Peretii au urechi si asculta (e Codrut in ei)")
})

mongoose.connect(mongourl)
.then(() => {
    console.log("Connected to MongoDB")
}).catch(error => {
    console.log(error)
})