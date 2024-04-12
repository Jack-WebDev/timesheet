/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
	return knex.schema.createTable("projects", (t) => {
		t.uuid("id").primary().defaultTo(knex.fn.uuid());
		t.string("Project_Name").unique().notNullable();
		t.uuid("Department_Id")
			.references("id")
			.inTable("departments")
			.onDelete("SET NULL");
	});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
	return knex.schema.dropSchemaIfExists("projects");
};
