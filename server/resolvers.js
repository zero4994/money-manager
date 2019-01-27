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
    }
  };
};
