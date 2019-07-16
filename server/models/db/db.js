const config = require('../../../config');
const DATABASE_URL = config.appConfig.DATABASE_URL
const { Pool } = require('pg');

class Database {
    constructor() {
        this.pool = new Pool({
            connectionString: DATABASE_URL
        });
    }

    async basicQuery(query) {
        const res = await this.pool.query(query);
        return res;
    }

    async queryWithParams(text, params) {
        const res = await this.pool.query(text, params);
        return res;
    }
}

const db = new Database();

db.pool.on('connect', () => {
    console.log('you are now connected to the db');
});

db.pool.on('error', () => {
    console.log('something went wrong with the database');
    process.exit(-1);
});

module.exports.db = db;
