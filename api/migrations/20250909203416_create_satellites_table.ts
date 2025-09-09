import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("satellites", (table) => {
    table.string("tle_line0").notNullable();
    table.string("tle_line1").notNullable();
    table.string("tle_line2").notNullable();
    //foreign keys
    table
      .uuid("id")
      .notNullable()
      .primary()
      .references("id")
      .inTable("scenario_entities")
      .onDelete("CASCADE");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("satellites");
}
