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
      t.integer("acc_num", 8);

      t.integer("user_id", 8)
        .references("user_id")
        .inTable("users")
        .notNullable();

      t.integer("acc_type", 2).notNullable();

      t.decimal("amount_available", 14.2).notNullable();

      t.decimal("max_amount_deposit", 14.2).notNullable();
    }).raw(`
      CREATE SEQUENCE seq_acc_num;
      ALTER SEQUENCE seq_acc_num RESTART WITH 10000000;
      ALTER TABLE accounts ALTER COLUMN acc_num SET DEFAULT nextval('seq_acc_num');
      ALTER TABLE accounts ADD PRIMARY KEY (acc_num);
      `);
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTable("accounts")
    .dropTable("users")
    .raw("DROP SEQUENCE seq_acc_num;");
};
