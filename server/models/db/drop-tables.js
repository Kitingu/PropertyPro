const { Pool } = require('pg');


const config = require('../../../config')

const DATABASE_URL = config.appConfig.DATABASE_URL
const pool = new Pool({
    connectionString: DATABASE_URL
})

pool.on('connect', () => {
    console.log('connected to the db');
});

const dropTables = async () => {
    const queryText = 'DROP TABLE IF EXISTS users, properties, flags, images  CASCADE';
    await pool.query(queryText);
    await pool.end();
};

dropTables();
