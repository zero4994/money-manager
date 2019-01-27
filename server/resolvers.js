const Knex = require("knex");
const sha256 = require("js-sha256").sha256;

module.exports = config => {
  const knex = Knex({
    client: config.client,
    port: config.port,
    connection: config.connection
  });
  return {
    Users: request => {
      return knex("users")
        .select()
        .then(users => {
          return users;
        });
    },
    LoginUser: request => {
      const password = sha256(request.password);
      console.log("request===>", request, "pass===>", password);
      return knex("users")
        .where({ username: request.username })
        .andWhere({ password })
        .select()
        .then(users => {
          return users[0] || null;
        });
    },
    AccountInfo: request => {
      return knex("accounts")
        .where({ user_id: request.userId })
        .select()
        .then(accounts => {
          return accounts[0] || null;
        });
    },
    TransactionsByUser: request => {
      const userId = request.userId;
      return knex("accounts")
        .where({ user_id: userId })
        .select()
        .then(account => {
          if (account.length < 1) {
            return Promise.reject(new Error("Invalid user"));
          }
          return account[0].acc_num;
        })
        .then(acc_num => {
          return knex("transactions")
            .where({ acc_num: acc_num })
            .orderBy("executed_at", "desc")
            .select();
        })
        .then(transactions => {
          return transactions;
        })
        .catch(err => {
          console.log("Error==>", err.message);
          return null;
        });
    }
  };
};
