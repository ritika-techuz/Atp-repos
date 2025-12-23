import { Model, RelationMappings, RelationMappingsThunk } from 'objection';
import { BaseModel } from './../../BaseModel';
import Country from './country';

class State extends BaseModel {
    static get tableName() {
        return 'states';
    }

    country_id!: number;
    name!: string;

    country!: Country;

    static relationMappings: RelationMappings | RelationMappingsThunk = () => {
        return {
            country: {
                modelClass: Country,
                relation: Model.BelongsToOneRelation,
                join: { from: 'states.country_id', to: 'countries.id' }
            }
        };
    };
}

export default State;
