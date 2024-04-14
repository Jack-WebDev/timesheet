/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
	return knex.schema.createTable("users", (t) => {
		t.uuid("id").primary().defaultTo(knex.fn.uuid());
		t.string("Name").notNullable();
		t.string("Surname").notNullable();
		t.string("Email").unique().notNullable();
		t.string("Password").nullable();
		t.string("Department").notNullable();
		t.string("Status").notNullable();
		t.string("Role").notNullable().defaultTo("Employee");
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
