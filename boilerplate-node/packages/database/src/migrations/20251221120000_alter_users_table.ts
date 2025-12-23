import type { Knex } from 'knex';

/**
 * Migration to alter the users table to match the new schema.
 * Adds/removes/renames columns as per the updated requirements.
 */
export async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable('users', table => {
        // Add new columns
        table.string('full_name', 255).nullable();
        table.string('avtar', 255).nullable();
        table.string('phone_number', 20).nullable();
        table.json('social_data').nullable();
        table.boolean('has_seen_welcome').defaultTo(false);

        // Change types/enums for role and status
        table.enu('role', ['1', '2']).notNullable().defaultTo('1').comment('1-> admin, 2-> user').alter();
        table.enu('status', ['0', '1']).notNullable().defaultTo('0').comment('0-> email is not verified,1-> email is verified').alter();

        // Remove old columns if they exist
        table.dropColumn('first_name');
        table.dropColumn('last_name');
        table.dropColumn('profile_url');
        table.dropColumn('mobile_number');
        table.dropColumn('stripe_customer_id');
        table.dropColumn('slug');
        table.dropColumn('token');
        table.dropColumn('reset_password_token');
        table.dropColumn('auth_type');
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.alterTable('users', table => {
        // Remove new columns
        table.dropColumn('full_name');
        table.dropColumn('avtar');
        table.dropColumn('phone_number');
        table.dropColumn('social_data');
        table.dropColumn('has_seen_welcome');
        // Cannot restore dropped columns without data loss, so just note here
        // You may want to manually re-add old columns if rolling back
    });
}
