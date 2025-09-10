import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("scenarios", (table) => {
    table.increments("id");
    table.string("title");
    table.string("description");
    table.timestamps(true, true);
    //foreign keys
    // table.integer("user_id").notNullable().references("id").inTable("users").onDelete("CASCADE");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("scenarios");
}
