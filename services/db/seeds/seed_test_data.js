const users = require("./users.json");
const accounts = require("./accounts.json");

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex
    .raw("TRUNCATE TABLE users, accounts, transactions CASCADE;")
    .then(() => {
      return knex("users").insert(users);
    })
    .then(() => {
      return knex("accounts").insert(accounts);
    });
};
