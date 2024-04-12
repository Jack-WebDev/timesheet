/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable("daily_hours", (t) => {
    t.uuid('id').primary().defaultTo(knex.fn.uuid());
    t.uuid('timesheet_id').unsigned().references('id').inTable('timesheets').onDelete('CASCADE');
    t.date('day_of_week').notNullable();
    t.decimal('hours_worked', 5, 2).notNullable();
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists("daily_hours")
};
