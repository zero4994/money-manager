exports.up = function(knex, Promise) {
  return knex.schema.createTable("transactions", t => {
    t.increments("id")
      .index()
      .primary();

    t.integer("acc_num", 8)
      .references("acc_num")
      .inTable("accounts")
      .notNullable();

    t.decimal("amount", 14.2).notNullable();

    t.integer("type", 1).notNullable();

    t.timestamp("executed_at").defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("transactions");
};
