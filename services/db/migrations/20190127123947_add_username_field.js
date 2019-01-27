exports.up = function(knex, Promise) {
  return knex.raw(`
    ALTER TABLE users ADD COLUMN username varchar(20) NOT NULL;
  `);
};

exports.down = function(knex, Promise) {
  return knex.raw(`
    ALTER TABLE users DROP COLUMN username;
  `);
};
