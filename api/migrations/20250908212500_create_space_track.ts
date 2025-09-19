// @ts-nocheck
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("space_track", (table) => {
    table.increments("id");
    table.string("CCSDS_OMM_VERS");
    table.string("COMMENT");
    table.string("CREATION_DATE");
    table.string("ORIGINATOR");
    table.string("OBJECT_NAME");
    table.string("OBJECT_ID");
    table.string("CENTER_NAME");
    table.string("REF_FRAME");
    table.string("TIME_SYSTEM");
    table.string("MEAN_ELEMENT_THEORY");
    table.string("EPOCH");
    table.double("MEAN_MOTION");
    table.double("ECCENTRICITY");
    table.double("INCLINATION");
    table.double("RA_OF_ASC_NODE");
    table.double("ARG_OF_PERICENTER");
    table.double("MEAN_ANOMALY");
    table.integer("EPHEMERIS_TYPE");
    table.string("CLASSIFICATION_TYPE");
    table.string("NORAD_CAT_ID");
    table.integer("ELEMENT_SET_NO");
    table.integer("REV_AT_EPOCH");
    table.double("BSTAR");
    table.double("MEAN_MOTION_DOT");
    table.double("MEAN_MOTION_DDOT");
    table.string("SEMIMAJOR_AXIS");
    table.string("PERIOD");
    table.string("APOAPSIS");
    table.string("PERIAPSIS");
    table.string("OBJECT_TYPE");
    table.string("RCS_SIZE");
    table.string("COUNTRY_CODE");
    table.string("LAUNCH_DATE");
    table.string("SITE");
    table.string("DECAY_DATE");
    table.string("FILE");
    table.string("GP_ID");
    table.string("TLE_LINE0");
    table.string("TLE_LINE1");
    table.string("TLE_LINE2");
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("space_track");
};

// {
//     CCSDS_OMM_VERS: '3.0',
//     COMMENT: 'GENERATED VIA SPACE-TRACK.ORG API',
//     CREATION_DATE: '2025-09-04T10:13:37',
//     ORIGINATOR: '18 SPCS',
//     OBJECT_NAME: 'TBA - TO BE ASSIGNED',
//     OBJECT_ID: 'UNKNOWN',
//     CENTER_NAME: 'EARTH',
//     REF_FRAME: 'TEME',
//     TIME_SYSTEM: 'UTC',
//     MEAN_ELEMENT_THEORY: 'SGP4',
//     EPOCH: '2025-09-04T01:16:25.249728',
//     MEAN_MOTION: '12.95505363',
//     ECCENTRICITY: '0.00330610',
//     INCLINATION: '90.2481',
//     RA_OF_ASC_NODE: '2.8519',
//     ARG_OF_PERICENTER: '198.6985',
//     MEAN_ANOMALY: '161.2923',
//     EPHEMERIS_TYPE: '0',
//     CLASSIFICATION_TYPE: 'U',
//     NORAD_CAT_ID: '270262',
//     ELEMENT_SET_NO: '999',
//     REV_AT_EPOCH: '25922',
//     BSTAR: '0.00062638639000',
//     MEAN_MOTION_DOT: '0.00000185',
//     MEAN_MOTION_DDOT: '0.0000000000000',
//     SEMIMAJOR_AXIS: '7657.888',
//     PERIOD: '111.154',
//     APOAPSIS: '1305.071',
//     PERIAPSIS: '1254.436',
//     OBJECT_TYPE: 'UNKNOWN',
//     RCS_SIZE: null,
//     COUNTRY_CODE: null,
//     LAUNCH_DATE: null,
//     SITE: null,
//     DECAY_DATE: null,
//     FILE: '4821752',
//     GP_ID: '296783903',
//     TLE_LINE0: '0 TBA - TO BE ASSIGNED',
//     TLE_LINE1: '1 T0262U          25247.05307002  .00000185  00000-0  62639-3 0  9990',
//     TLE_LINE2: '2 T0262  90.2481   2.8519 0033061 198.6985 161.2923 12.95505363259223'
//   }
