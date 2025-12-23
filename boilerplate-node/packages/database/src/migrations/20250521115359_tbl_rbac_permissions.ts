import type { Knex } from 'knex';

/**
 * Run the migrations.
 *
 * @description This function is used to modify the database schema by applying
 * a set of changes. It is executed when a migration is run.
 *
 * @param knex - The Knex.js instance used to interact with the database.
 * @returns Promise<void> - A promise that resolves when the migration is complete.
 */
export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('role_permissions', table => {
        table.increments('id').primary();
        table.string('module_name').notNullable();
        table.enum('admin', ['1', '2']).defaultTo('2').notNullable().comment('1 -> Granted, 2 -> Not Granted');
        table.enum('user', ['1', '2']).defaultTo('2').notNullable().comment('1 -> Granted, 2 -> Not Granted');
        table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable();
        table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
        table.timestamp('deleted_at').nullable();
    });
}

/**
 * Revert the migrations.
 *
 * @description This function is used to revert the database schema back to
 * how it was before a migration was run. It is executed when a
 * migration is reverted.
 *
 * @param knex - The Knex.js instance used to interact with the database.
 * @returns Promise<void> - A promise that resolves when the migration is reverted.
 */
export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('role_permissions');
}
