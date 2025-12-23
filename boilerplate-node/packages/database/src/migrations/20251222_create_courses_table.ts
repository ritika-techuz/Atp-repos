import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('courses', table => {
    table.increments('id').unsigned().primary();
    table.string('title', 255).notNullable();
    table.string('slug', 255).notNullable();
    table.integer('course_type').unsigned().notNullable();
    table.string('cover_image', 255).notNullable();
    table.integer('category_id').unsigned().notNullable();
    table.text('introduction');
    table.text('content').notNullable();
    table.string('duration', 255).notNullable();
    table.integer('total_amount').notNullable();
    table.integer('deposit_amount').notNullable();
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    table.timestamp('updated_at').nullable().defaultTo(knex.fn.now());
    table.text('about_course');
    table.text('course_feature');
    table.boolean('is_deleted').defaultTo(false);
    table.timestamp('deleted_at').nullable().defaultTo(null);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('courses');
}
