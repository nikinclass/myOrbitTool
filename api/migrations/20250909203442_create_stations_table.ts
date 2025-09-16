import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("stations", (table) => {
    table.string("name").notNullable();
    table.float("latitude").notNullable();
    table.float("longitude").notNullable();
    table.float("altitude").notNullable();

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
  return knex.schema.dropTableIfExists("stations");
}
