import { appConfig } from '@repo/config';
import knexGenerator from 'knex';
import { Model as ObjectionModel, QueryBuilder } from 'objection';
import dbConfig from './knexfile';
import { logDbQueries } from './logDBQueries';

const knex = knexGenerator({ ...dbConfig[appConfig.nodeEnv] });
const Model = ObjectionModel.knex(knex);

// LOG_DB_QUERIES
if (appConfig.logDbQueries) logDbQueries(knex);

export { knex, Model, QueryBuilder };
