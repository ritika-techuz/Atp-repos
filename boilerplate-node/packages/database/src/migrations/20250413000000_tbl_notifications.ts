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
    return knex.schema.createTable('notifications', table => {
        table.increments('id').primary();
        table.integer('receiver_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE');
        table.enum('receiver_type', ['1', '2', '3']).defaultTo('1').comment('1 -> Admin, 2 -> Sub Admin, 3 -> User');
        table.string('room_id').notNullable();
        table.string('title').notNullable();
        table.text('description').notNullable();
        table.string('redirection_type').nullable();
        table.string('redirection_url').nullable();
        table.string('type').notNullable();
        table.enum('is_read', ['1', '2']).defaultTo('2').comment('1 -> Read, 2 -> Unread');
        table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable();
        table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));

        // Indexes
        table.index(['receiver_type', 'receiver_id']);
        table.index('room_id');
        table.index('is_read');
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
    return knex.schema.dropTable('notifications');
}
