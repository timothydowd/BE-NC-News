
exports.up = function (knex, Promise) {
  console.log('creating comments table');

  return knex.schema.createTable('comments', (commentsTable) => {
    commentsTable.increments('comment_id').primary();
    commentsTable.string('author').references('username').inTable('users');
    commentsTable.integer('article_id').references('article_id').inTable('articles');
    commentsTable.integer('votes').defaultTo(0);
    commentsTable.timestamp('created_at').defaultTo(knex.fn.now());
    commentsTable.string('body', 2000);
  });
};

exports.down = function (knex, Promise) {
  console.log('removing comments table');
  return knex.schema.dropTable('comments');
};
