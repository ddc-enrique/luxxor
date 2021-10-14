const express = require('express')
const cors = require('cors') 
require('dotenv').config() 
const router = require('./routes/index')
require('./config/database')
require('./config/passport')
const path = require('path')
const app = express()
const jwt = require('jsonwebtoken')
const fileupload = require("express-fileupload")




app.use(express.static('assets'))
app.use(express.static('assets/productsPhoto'))
app.use(cors())
app.use(express.json())
app.use(fileupload())

app.use("/api", router)

app.listen(4000, () => console.log("Hello, the server is listening on port 4000"))