const { Pool } = require('pg');
const config = require('../../../config')




const DATABASE_URL = config.appConfig.DATABASE_URL
// create a new connection pool to the database
const pool = new Pool({
    connectionString: DATABASE_URL
});

pool.on('connect', () => {
    console.log('you are now connected to the database');
});

const createTables = async () => {
    const queryText = `
  CREATE TABLE IF NOT EXISTS
    users(
        user_id serial PRIMARY KEY,
        firstname VARCHAR (200) NOT NULL,
        lastname VARCHAR (200) NOT NULL,
        email VARCHAR (255) UNIQUE NOT NULL,
        password VARCHAR (255) NOT NULL,
        isAgent BOOL DEFAULT 'false',
        isAdmin BOOL DEFAULT 'false',
        created_on TIMESTAMP NOT NULL DEFAULT NOW()
    );

  CREATE TABLE IF NOT EXISTS
    properties(
        propertyId serial PRIMARY KEY,
        status VARCHAR (20) NOT NULL,
        state VARCHAR (255)  NOT NULL,
        city VARCHAR (20) NOT NULL,
        type VARCHAR (255) NOT NULL,
        price VARCHAR (255) NOT NULL,
        address VARCHAR (255) NOT NULL,
        image_url VARCHAR (255),
        user_id integer REFERENCES users(user_id) ON DELETE CASCADE,
        created_on TIMESTAMP NOT NULL DEFAULT NOW()
     );


  CREATE TABLE IF NOT EXISTS
    flags(
        flag_id serial PRIMARY KEY,
        user_email integer REFERENCES users(user_id) ON DELETE CASCADE,
        property_id integer REFERENCES properties(propertyId) ON DELETE CASCADE,
        reason VARCHAR (50) UNIQUE NOT NULL,
        description VARCHAR (300) NOT NULL,
        created_on TIMESTAMP NOT NULL DEFAULT NOW()
        );

  CREATE TABLE IF NOT EXISTS
    images(
        image_url integer REFERENCES users(user_id) ON DELETE CASCADE,
        property_id integer REFERENCES properties(propertyId) ON DELETE CASCADE,
        added_on TIMESTAMP NOT NULL DEFAULT NOW()
        );

        `;

    await pool.query(queryText);
    await pool.end();
};

createTables();
