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
    await knex.schema.createTable('users', table => {
        table.increments('id').primary();
        table.string('stripe_customer_id').nullable();
        table.string('social_id').notNullable();
        table.string('first_name', 75).notNullable();
        table.string('last_name', 75).nullable();
        table.string('slug').notNullable().unique();
        table.string('email').nullable();
        table.string('mobile_number', 20).nullable();
        table.string('profile_url').nullable();
        table.string('password').nullable();
        table.text('token').nullable();
        table.string('reset_password_token').nullable();
        table.enum('auth_type', ['1', '2', '3', '4', '5']).notNullable().comment('1-> Email, 2-> Phone, 3-> Google, 4-> Facebook, 5-> Apple');
        table.enum('role', ['1', '2']).defaultTo('2').notNullable().comment('1-> Admin, 2-> User');
        table.enum('status', ['1', '2']).defaultTo('2').notNullable().comment('1-> Active, 2-> Inactive');
        table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable();
        table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
        table.timestamp('deleted_at').nullable();

        table.unique(['email', 'mobile_number']);
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
    await knex.schema.dropTableIfExists('users');
}
