const { db } = require('./db');

const migrations = async () => {
  const tables = `
      CREATE TABLE IF NOT EXISTS
      users(
        user_id serial PRIMARY KEY,
        firstname VARCHAR (200) NOT NULL,
        lastname VARCHAR (200) NOT NULL,
        email VARCHAR (255) UNIQUE NOT NULL,
        password VARCHAR (255) NOT NULL,
        phoneNumber VARCHAR (255) NOT NULL,
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
        price FLOAT  NOT NULL,
        address VARCHAR (255) NOT NULL,
        ownerPhoneNumber VARCHAR (255) NOT NULL,
        image_url VARCHAR (255),
        owner VARCHAR REFERENCES users(email) ON DELETE CASCADE,
        created_on TIMESTAMP NOT NULL DEFAULT NOW()
     );


  CREATE TABLE IF NOT EXISTS
    flags(
        flag_id serial PRIMARY KEY,
        user_email VARCHAR REFERENCES users(email) ON DELETE CASCADE,
        property_id INTEGER REFERENCES properties(propertyid) ON DELETE CASCADE,
        reason VARCHAR (50) NOT NULL,
        description VARCHAR (300) NOT NULL,
        created_on TIMESTAMP NOT NULL DEFAULT NOW()
        );

  CREATE TABLE IF NOT EXISTS
    images(
        image_url VARCHAR (255) NOT NULL,
        property_id INTEGER REFERENCES properties(propertyid) ON DELETE CASCADE,
        added_on TIMESTAMP NOT NULL DEFAULT NOW()
          );`;

  try {
    await db.basicQuery(tables);
  } catch (err) {
    console.log(err.stack);
  }
};

(async () => {
  await migrations();
})();
