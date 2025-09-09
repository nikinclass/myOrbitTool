import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("scenario_entities", (table) => {
    table.uuid("id").notNullable().primary().defaultTo(knex.fn.uuid());
    //foreign keys
    table
      .integer("scenario_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("scenarios")
      .onDelete("CASCADE");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("scenario_entities");
}
