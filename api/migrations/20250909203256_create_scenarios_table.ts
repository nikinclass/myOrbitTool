import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("scenarios", (table) => {
    table.increments("id");
    table.string("title");
    table.string("description");
    table.timestamps(true, true);
    //foreign keys
    table
      .integer("owner_id")
      .notNullable()
      .references("id")
      .inTable("user_table")
      .onDelete("CASCADE");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("scenarios");
}
