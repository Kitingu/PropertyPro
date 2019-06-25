require('dotenv/config')
const env = process.env.NODE_ENV  // 'development', 'test','production'

const development = {
    appConfig: {
        port: 3000
    }
};

const test = {
    appConfig: {
        port: 5000
    }
};

const production = {
    appConfig: {
        port: 3000
    }
};

const config = {
    development,
    production,
    test
};

module.exports = config[env];
