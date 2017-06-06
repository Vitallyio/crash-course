
exports.up = function(knex, Promise) {
  return knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .createTable('directors', (table) => {
      table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary().unique().notNullable();
      table.datetime('createdAt').notNullable().index().defaultTo(knex.raw(`current_timestamp`));
      table.text('name').notNullable();
    })
    .createTable('movies', (table) => {
      table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary().unique().notNullable();
      table.datetime('createdAt').notNullable().index().defaultTo(knex.raw(`current_timestamp`));
      table.text('name').notNullable();
      table.uuid('director_id').notNullable();
      table.foreign('director_id').references('directors.id').onDelete('CASCADE').onUpdate('CASCADE');
    });
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTableIfExists('movies')
    .dropTableIfExists('directors');
};
