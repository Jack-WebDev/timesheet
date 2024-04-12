const departments = require("../../data/departmentSeed");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
	// Deletes ALL existing entries
	await knex("departments").del();

	await knex("departments").insert([...departments]);
};
