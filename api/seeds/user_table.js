const bcrypt = require('bcryptjs');
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('user_table').del()

  const hashedPassword1 = await bcrypt.hash('password1',12);
  await knex('user_table').insert([
    { username: 'user1', password: hashedPassword1}
  ]);
};
