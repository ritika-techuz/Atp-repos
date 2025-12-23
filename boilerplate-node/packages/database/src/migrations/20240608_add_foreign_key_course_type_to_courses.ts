import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('courses', table => {
    table
      .integer('course_type')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('course_types')
      .onDelete('RESTRICT')
      .onUpdate('CASCADE');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('courses', table => {
    table.dropForeign(['course_type']);
  });
}
