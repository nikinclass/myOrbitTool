import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("satellites", (table) => {
    table.string("OBJECT_NAME").notNullable();
    table.string("TLE_LINE1").notNullable();
    table.string("TLE_LINE2").notNullable();
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
