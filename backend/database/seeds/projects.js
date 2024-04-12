const projects = require("../../data/projectSeed");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
	// Deletes ALL existing entries
	await knex("projects").del();

	await knex("projects").insert([...projects]);
};
