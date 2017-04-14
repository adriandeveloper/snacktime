exports.up = function(knex, Promise) {
  return knex.schema.createTable('snacks', (t) => {
    t.increments().primary();
    t.string('name').notNullable().defaultTo('');
    t.text('img_url').notNullable().defaultTo('');
    t.string('review_description').notNullable().defaultTo('');
    t.integer('rating').notNullable().defaultTo(0);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('snacks');
};
