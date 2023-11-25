const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

require('dotenv').config()

const app = express()
const port = process.env.PORT
const pass = process.env.PASS

const router = require('./router')

app.use(cors())

app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())

app.use('/api', router)

app.listen(port, () => {
    console.log("IA-MA IN IT")
})

mongoose.connect('mongodb+srv://admin:' + pass + '@pollitcluster.lu8sanl.mongodb.net/?retryWrites=true&w=majority')
.then(() => {
    console.log("Connected to MongoDB")
}).catch(error => {
    console.log(error)
})