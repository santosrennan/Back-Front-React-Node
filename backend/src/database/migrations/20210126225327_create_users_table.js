exports.up = function(knex) {
    return knex.schema.createTable('funcionario', function (table) {
        table.string('id').primary();
        table.string('name').notNullable();
        table.int('age').notNullable();
        table.string('role').notNullable();
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('funcionario');
  };