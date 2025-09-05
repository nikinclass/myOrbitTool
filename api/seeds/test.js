/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.seed = async function (knex) {
  console.log("Seeding...");

  // Deletes ALL existing entries
  await knex("test").del();
  await knex("test").insert([
    { colName: "Payton" },
    { colName: "Josh" },
    { colName: "ChatGPT" },
  ]);
};
