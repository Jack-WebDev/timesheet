/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("timesheets", (t) => {
        t.uuid('id').primary().defaultTo(knex.fn.uuid());
        t.uuid('User_id').unsigned().references('id').inTable('users').onDelete('CASCADE');
        t.uuid('Project_id').unsigned().references('id').inTable('projects').onDelete('CASCADE');
        t.string('Task_perfomed').nullable();
        t.string('Week').notNullable();
        t.string("Monday").nullable()
        t.string("Tuesday").nullable()
        t.string("Wednesday").nullable()
        t.string("Thursday").nullable()
        t.string("Friday").nullable()
        t.decimal("Total_hours", 5, 2).defaultTo(0.0);
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
