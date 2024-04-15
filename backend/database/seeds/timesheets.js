const timesheets = require("../../data/timesheetSeed");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
	// Deletes ALL existing entries
	await knex("timesheets").del();

	await knex("timesheets").insert([...timesheets]);
};
