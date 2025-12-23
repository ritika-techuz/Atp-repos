import { Knex } from 'knex';

/**
 * Executes the seed function.
 * @description This will delete all existing entries in the table_name table and insert the seed entries.
 *
 * @param {Knex} knex - Knex instance.
 * @returns {Promise<void>} - Resolves if the seed was successful.
 */
export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex('users').del().where('role', 1);

    // Inserts seed entries
    await knex('users').insert([
        {
            id: 1,
            social_id: '24p2of2FT1absi8xNorklUoA9r82',
            first_name: 'Techuz',
            last_name: 'Admin',
            slug: 'techuz-admin',
            email: 'techuz@yopmail.com',
            profile_url: null,
            password: null,
            token: null,
            reset_password_token: null,
            role: 1, // 1 -> Admin
            status: 1 // 1 -> Active
        }
    ]);
}
