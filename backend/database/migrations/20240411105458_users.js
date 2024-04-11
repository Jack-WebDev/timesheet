/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
	return knex.schema.createTable("users", (t) => {
		t.uuid("id").primary().defaultTo(knex.fn.uuid());
		t.string("email").unique().notNullable();
		t.string("name").notNullable();
		t.string("surname").notNullable();
		t.string("password").nullable();
		t.string("role").notNullable().defaultTo("Employee");
		t.timestamp("createdAt").defaultTo(knex.fn.now());
	});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
	return knex.schema.dropTableIfExists("users");
};
