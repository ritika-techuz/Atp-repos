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
    await knex.schema.createTable('user_subscriptions', table => {
        table.increments('id').primary();
        table.integer('user_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE');
        table.integer('plan_id').unsigned().notNullable().references('id').inTable('plans').onDelete('CASCADE');
        table.string('price_id').notNullable().comment('Price id from the provider');
        table.string('subscription_id').notNullable().comment('Subscription id from the provider');
        table.string('subscription_item_id').nullable();
        table.string('invoice_url').nullable();
        table.string('invoice_number').nullable().defaultTo(null);
        table.decimal('price', 10, 2).notNullable();
        table.decimal('discount_amount', 10, 2).notNullable().defaultTo(0.0);
        table.decimal('tax_percentage', 5, 2).notNullable().defaultTo(0.0);
        table.decimal('tax_amount', 10, 2).notNullable();
        table.decimal('sub_total', 10, 2).notNullable();
        table.decimal('grand_total', 10, 2).notNullable();
        table.datetime('start_date').notNullable();
        table.datetime('expiry_date').notNullable();
        table.boolean('is_switch').defaultTo(false).comment('In case of upgrade or downgrade plan');
        table.boolean('is_cancelled').defaultTo(false).comment('In case of cancel and non renewal');
        table.boolean('is_added_by_cron').defaultTo(false).comment('In case of auto renew');
        table.json('provider_response').nullable();
        table.enum('provider', ['1', '2']).notNullable().defaultTo('1').comment('1 -> Stripe, 2 -> Razorpay');
        table.enum('payment_status', ['1', '2', '3']).notNullable().defaultTo('3').comment('1 -> Paid, 2 -> Failed, 3 -> Pending');
        table.enum('status', ['1', '2', '3']).notNullable().defaultTo('2').comment('1-> Active, 2-> Inactive, 3-> Upcoming');
        table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable();
        table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
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
    await knex.schema.dropTableIfExists('user_subscriptions');
}
