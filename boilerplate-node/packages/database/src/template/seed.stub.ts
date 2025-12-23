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
    await knex('table_name').del();

    // Inserts seed entries
    await knex('table_name').insert([
        { id: 1, colName: 'rowValue1' },
        { id: 2, colName: 'rowValue2' },
        { id: 3, colName: 'rowValue3' }
    ]);
}
