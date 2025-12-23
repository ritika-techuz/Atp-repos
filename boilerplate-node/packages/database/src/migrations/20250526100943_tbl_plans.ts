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
    await knex.schema.createTable('plans', table => {
        table.increments('id').primary();
        table.string('name', 100).notNullable();
        table.string('price_id').nullable().comment('Price id from provider');
        table.decimal('price', 14, 2).notNullable();
        table.decimal('tax_percentage', 5, 2).notNullable().defaultTo(0.0);
        table.json('features').nullable();
        table.enum('type', ['1', '2']).notNullable().comment('1 -> Basic, 2 -> Pro');
        table.enum('provider', ['1', '2']).notNullable().defaultTo('1').comment('1 -> Stripe, 2 -> Razorpay');
        table.enum('currency', ['1', '2']).defaultTo('2').notNullable().comment('1 -> INR, 2 -> USD');
        table.enum('interval', ['1', '2', '3', '4']).defaultTo('3').notNullable().comment('1 -> Daily, 2 -> Weekly, 3 -> Monthly, 4 -> Yearly');
        table
            .integer('interval_count')
            .unsigned()
            .defaultTo(1)
            .notNullable()
            .comment('Number of intervals. Maps from billing frequency in provider - e.g. 1 for monthly.');
        table.enum('status', ['1', '2']).notNullable().defaultTo('1').comment('1-> Active, 2-> Inactive');
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
    await knex.schema.dropTableIfExists('plans');
}
