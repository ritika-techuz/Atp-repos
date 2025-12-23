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
    return knex.schema.createTable('messages', table => {
        table.increments('id').primary();
        table.integer('sender_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE');
        table.integer('receiver_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE');
        table.string('room_id').notNullable();
        table.text('message').notNullable();
        table.string('attachment_url').nullable();
        table.timestamp('read_at').nullable();
        table.enum('status', ['1', '2', '3']).defaultTo('1').comment('1 -> sent, 2 -> delivered, 3 -> read');
        table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable();
        table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));

        // Indexes for better query performance
        table.index(['sender_id', 'receiver_id']);
        table.index(['room_id']);
        table.index(['status']);
        table.index(['created_at']);
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
    return knex.schema.dropTable('messages');
}
