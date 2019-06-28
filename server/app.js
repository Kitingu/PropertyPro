require('dotenv')
const express = require('express')
const config = require('../config')
const propertyRoutes = require('./routes/propertyroutes')
const authRoutes = require('./routes/authroutes')

const app = express()
app.use(express.json())
app.use('/api/v1', authRoutes)
app.use('/api/v1', propertyRoutes)
app.use(express.urlencoded({ extended: false }));

const PORT = config.appConfig.port || 3000

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`)
})

module.exports.app = app
