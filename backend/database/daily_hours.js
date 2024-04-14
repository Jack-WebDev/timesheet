/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('daily_hours').del()


  await knex('daily_hours').insert([
    { timesheet_id: "9d9ac3dc-9d01-4768-aa07-c59bdf38da06", day_of_week: '2024-04-08', hours_worked: 8.5 },
    { timesheet_id: "9d9ac3dc-9d01-4768-aa07-c59bdf38da06", day_of_week: '2024-04-09', hours_worked: 7.5 },
    { timesheet_id: "9d9ac3dc-9d01-4768-aa07-c59bdf38da06", day_of_week: '2024-04-10', hours_worked: 8.0 },
    { timesheet_id: "9d9ac3dc-9d01-4768-aa07-c59bdf38da06", day_of_week: '2024-04-15', hours_worked: 8.0 },
    { timesheet_id: "9d9ac3dc-9d01-4768-aa07-c59bdf38da06", day_of_week: '2024-04-16', hours_worked: 7.0 },
  ]);
};
