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
    await knex.schema.createTable('promo_codes', table => {
        table.increments('id').primary();
        table.string('coupon_id').notNullable();
        table.string('promo_code', 75).notNullable();
        table.decimal('discount_value', 10, 2).notNullable();
        table.dateTime('start_date').notNullable();
        table.dateTime('expiry_date').notNullable();
        table.enum('type', ['1', '2']).notNullable().defaultTo('2').comment('1-> Fixed, 2-> Percentage');
        table.enum('status', ['1', '2', '3']).notNullable().defaultTo('1').comment('1-> Active, 2-> Inactive, 3-> Expired');
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
    await knex.schema.dropTableIfExists('promo_codes');
}
