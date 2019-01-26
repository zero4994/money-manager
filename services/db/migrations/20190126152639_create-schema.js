exports.up = function(knex, Promise) {
  return knex.schema
    .createTable("users", t => {
      t.increments("user_id")
        .index()
        .primary();

      t.string("first_name", 10).notNullable();

      t.string("second_name", 10);

      t.string("sourname", 10);

      t.date("date_of_birth").notNullable();

      t.string("password", 1000).notNullable();
    })
    .createTable("accounts", t => {
      t.increments("acc_num").defaultTo(10000000);

      t.integer("user_id", 8)
        .references("user_id")
        .inTable("users")
        .notNullable();

      t.integer("acc_type", 2).notNullable();

      t.bigInteger("amount_available").notNullable();

      t.bigInteger("max_amount_deposit").notNullable();
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("accounts").dropTable("users");
};
