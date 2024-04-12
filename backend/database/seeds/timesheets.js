/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
    // Deletes ALL existing entries
    await knex('timesheets').del()
  
  
    await knex('timesheets').insert([
      { user_id: "a18ce059-132e-4868-8989-8c8daa08c18b", week_start_date: '2024-04-08', total_hours: 40.5 },
  
    ]);
  };
  