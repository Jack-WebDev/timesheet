const users = require("../../data/seed");
const bcrypt = require("bcryptjs");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
	// Deletes ALL existing entries
	await knex("users").del();

	const userList = [];
	const salt = await bcrypt.genSalt(10);

	for (const user of users) {
		const newUser = {
			...user,
			password: await bcrypt.hash(user.password, salt),
		};
		userList.push(newUser);
	}

	console.log(userList);

	await knex("users").insert([...userList]);
};
