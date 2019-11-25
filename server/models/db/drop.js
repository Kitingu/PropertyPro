const { db } = require('./db');

const dropMigrations = async () => {
  const dropTables = `
      DROP TABLE IF EXISTS users CASCADE;
      DROP TABLE IF EXISTS properties CASCADE;
      DROP TABLE IF EXISTS flags CASCADE;
      DROP TABLE IF EXISTS images CASCADE;
     `;

  try {
    await db.basicQuery(dropTables);
  } catch (err) {
    console.log(err.stack);
  }
};

(async () => {
  await dropMigrations();
})();
