require('dotenv');
const express = require('express');
const morgan = require('morgan');
const config = require('../config');
const { handle404, handle500, methodNotAllowed } = require('./middlewares/error-handler').handlers;
const propertyRoutes = require('./routes/propertyroutes');
const authRoutes = require('./routes/authroutes');
const app = express();
const cors = require('cors')
app.use(morgan('dev'));
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use('/api/v2', authRoutes);
app.use('/api/v2', propertyRoutes);



// handle 404 error
app.use(handle404);

// handle 405
app.use(methodNotAllowed);



// handle 500
app.use(handle500);


const PORT = config.appConfig.port || 3000;


app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
});

module.exports.app = app;
