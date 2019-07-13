require('dotenv')
const express = require('express')
const config = require('../config')
const { handle404, handle500 } = require('./middlewares/error-handler')
const propertyRoutes = require('./routes/propertyroutes')
const authRoutes = require('./routes/authroutes')
const morgan = require('morgan')
const app = express()
const cors = require('cors')

app.use(morgan('dev'));
app.use(cors)
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use('/api/v1', authRoutes);
app.use('/api/v1', propertyRoutes);

// handle 405
app.use(methodNotAllowed);


// handle 404 error
app.use(handle404);

// handle 500
app.use(handle500);


const PORT = config.appConfig.port || 3000;

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
});

module.exports.app = app;
