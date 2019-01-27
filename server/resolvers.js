const Knex = require("knex");
const sha256 = require("js-sha256").sha256;

module.exports = config => {
  const knex = Knex({
    client: config.client,
    port: config.port,
    connection: config.connection
  });

  const getAccountInfoByUserName = params => {
    return knex("accounts")
      .where({ user_id: params.userId })
      .select()
      .then(accounts => {
        return accounts[0] || null;
      });
  };

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
      return getAccountInfoByUserName(request);
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
    },
    NewTransaction: request => {
      const userId = request.userId;
      return getAccountInfoByUserName({ userId })
        .then(accounts => {
          if (accounts === null) {
            return Promise.reject(new Error("Invalid user!"));
          }
          return accounts.acc_num;
        })
        .then(acc_num => {
          console.log("Inserting data for account =>", acc_num);
          return knex("transactions").insert(
            {
              acc_num,
              amount: request.transaction.amount,
              type: request.transaction.type
            },
            ["id", "acc_num", "amount", "type", "executed_at"]
          );
        })
        .then(something => {
          console.log("Transaction Inserted!!");
          return something[0];
        })
        .catch(error => {
          console.log("NewTransaction =>", error.message);
          return null;
        });
    },
    DeleteTransaction: request => {
      const id = request.transactionId;
      return knex("transactions")
        .where({ id })
        .select()
        .then(transactions => {
          if (transactions.length <= 0) {
            return Promise.reject(new Error("Invalid ID!!!"));
          }
          return transactions[0];
        })
        .then(transaction => {
          const promise = knex("transactions")
            .where({ id: transaction.id })
            .del();
          return Promise.all([promise, transaction]);
        })
        .then(deletedRows => {
          const [deleted, transaction] = [...deletedRows];
          console.log("deletedRows==>", deleted, transaction);
          if (deleted <= 0) {
            return Promise.reject(new Error("Row Not Deleted!!"));
          }
          return transaction;
        })
        .catch(error => {
          console.log("DeleteTransaction ==>", error.message);
        });
    }
  };
};
