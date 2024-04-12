/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
	return knex.schema.createTable("refresh_tokens", (t) => {
		t.uuid("id").primary().defaultTo(knex.fn.uuid());
		t.string("Token").unique().notNullable();
		t.timestamp("ExpiresAT").notNullable();
	});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
	return knex.schema.dropTableIfExists("refresh_tokens");
};
