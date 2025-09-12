import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("satellites", (table) => {
    table.string("OBJECT_NAME").notNullable();
    table.string("OBJECT_ID");
    table.string("EPOCH").notNullable();
    table.string("MEAN_MOTION").notNullable();
    table.string("ECCENTRICITY").notNullable();
    table.string("INCLINATION").notNullable();
    table.string("RA_OF_ASC_NODE").notNullable();
    table.string("ARG_OF_PERICENTER").notNullable();
    table.string("MEAN_ANOMALY").notNullable();
    table.string("EPHEMERIS_TYPE").notNullable();
    table.string("CLASSIFICATION_TYPE");
    table.string("NORAD_CAT_ID");
    table.string("ELEMENT_SET_NO");
    table.string("REV_AT_EPOCH").notNullable();
    table.string("BSTAR").notNullable();
    table.string("MEAN_MOTION_DOT").notNullable();
    table.string("MEAN_MOTION_DDOT").notNullable();
    table.string("COLOR").notNullable();
    //foreign keys
    // const omm = {
    //   OBJECT_NAME: "HELIOS 2A",
    //   OBJECT_ID: "2004-049A",
    //   EPOCH: "2025-03-26T05:19:34.116960",
    //   MEAN_MOTION: 15.00555103,
    //   ECCENTRICITY: 0.000583,
    //   INCLINATION: 98.3164,
    //   RA_OF_ASC_NODE: 103.8411,
    //   ARG_OF_PERICENTER: 20.5667,
    //   MEAN_ANOMALY: 339.5789,
    //   EPHEMERIS_TYPE: 0,
    //   CLASSIFICATION_TYPE: "U",
    //   NORAD_CAT_ID: 28492,
    //   ELEMENT_SET_NO: 999,
    //   REV_AT_EPOCH: 8655,
    //   BSTAR: 0.00048021,
    //   MEAN_MOTION_DOT: 0.00005995,
    //   MEAN_MOTION_DDOT: 0,
    // };
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
