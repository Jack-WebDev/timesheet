/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("timesheets", (t) => {
        t.uuid('id').primary().defaultTo(knex.fn.uuid());
        t.uuid('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE');
        t.date('week_start_date').notNullable();
        t.decimal("total_hours", 5, 2).defaultTo(0.0);
        t.timestamps(true, true);
    })
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists("timesheets")
};
