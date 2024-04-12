const users = require("../../data/userSeed");
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
			Password: await bcrypt.hash(user.Password, salt),
		};
		userList.push(newUser);
	}

	console.log(userList);

	await knex("users").insert([...userList]);
};
