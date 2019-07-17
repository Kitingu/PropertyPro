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

        try {
            const res = await this.pool.query(query);
            return res;
        } catch (error) {
            console.log(error);

        }
    }

    async queryWithParams(text, params) {

        try {
            const res = await this.pool.query(text, params);
            return res;
        } catch (error) {
            setImmediate(() => { throw error })
        }


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



