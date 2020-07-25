const path = require('path')
const express = require('express')
const fetch = require('node-fetch')

const app = express()
var dirPath = path.join(__dirname,'public')

app.use(express.static(dirPath))




app.listen(3000,()=>{
    console.log('server is up on localhost 3000')
})

