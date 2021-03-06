/* eslint-disable */

exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('users', function(table) {
    table.increments('id').primary();
    table.string('first_name');
    table.string('last_name');
    table.string('email');
    table.string('phone_number');

    table.timestamps(true, true)
  }),
    knex.schema.createTable('texts', function(table) {
      table.increments('id').primary();
      table.string('body');
      table.string('from');
      table.string('to');
      table.string('smsId');
      table.integer('user_id').unsigned()
      table.foreign('user_id')
        .references('users.id');

      table.timestamps(true, true);
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('texts'),
    knex.schema.dropTable('users')
  ]);
};
