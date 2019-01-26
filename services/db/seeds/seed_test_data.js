const users = require("./users.json");
const accounts = require("./accounts.json");
const transactions = require("./transactions.json");

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex
    .raw(`TRUNCATE TABLE transactions RESTART IDENTITY CASCADE;
          TRUNCATE TABLE accounts CASCADE;
          ALTER SEQUENCE seq_acc_num RESTART WITH 10000000;
          TRUNCATE TABLE users RESTART IDENTITY CASCADE;`)
    .then(() => {
      return knex("users").insert(users);
    })
    .then(() => {
      return knex("accounts").insert(accounts);
    })
    .then(() => {
      return knex("transactions").insert(transactions);
    });
};
 