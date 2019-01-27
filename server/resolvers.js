const Knex = require("knex");

module.exports = config => {
  const knex = Knex({
    client: config.client,
    port: config.port,
    connection: config.connection
  });
  return {
    Users: request => {
      console.log("rqeuest =>", request, "config object ====>", config);
      return knex("users")
        .select()
        .then(users => {
          return users;
        });
    }
  };
};
