require('dotenv/config')
const env = process.env.NODE_ENV  // 'development', 'test','production'

const development = {
    appConfig: {
        port: 3000,
        DATABASE_URL: process.env.DATABASE_URL
    }
};

const test = {
    appConfig: {
        port: 5000,
        DATABASE_URL: process.env.TEST_DATABASE
    }
};

const production = {
    appConfig: {
        port: process.env.PORT,
        DATABASE_URL: process.env.DATABASE_URL
    }
};

const config = {
    development,
    production,
    test
};

module.exports = config[env];
